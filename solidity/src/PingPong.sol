pragma solidity ^0.8.24;

import "./IIBCModule.sol";
import "./IIBCPacketHandler.sol";

// Protocol specific packet
struct PingPongPacket {
    bool ping;
    uint64 counterpartyTimeout;
}

library PingPongLib {
    bytes32 public constant PROTOCOL_VERSION = keccak256("ucs00-pingpong-1");
    bytes1 public constant ACK_SUCCESS = 0x01;
    bytes1 public constant ACK_FAILURE = 0x00;

    error ErrInvalidVersion();
    error ErrNotIBC();
    error ErrOnlyOneChannel();
    error ErrInvalidAck();
    error ErrNoChannel();
    error ErrInfiniteGame();

    event Ring(bool ping);
    event TimedOut();
    event Acknowledged();

    function encode(PingPongPacket memory packet) internal pure returns (bytes memory) {
        return abi.encode(packet.ping, packet.counterpartyTimeout);
    }

    function decode(bytes memory packet) internal pure returns (PingPongPacket memory) {
        (bool ping, uint64 counterpartyTimeout) = abi.decode(packet, (bool, uint64));
        return PingPongPacket({ping: ping, counterpartyTimeout: counterpartyTimeout});
    }
}

contract PingPong is IIBCModule {
    using PingPongLib for *;

    IIBCPacketHandler public ibcHandler;
    string public channelId;
    uint64 public timeout;

    constructor(IIBCPacketHandler _ibcHandler, uint64 _timeout) {
        ibcHandler = _ibcHandler;
        timeout = _timeout;
    }

    function initiate(PingPongPacket memory packet, uint64 localTimeout) public {
        if (bytes(channelId).length == 0) {
            revert PingPongLib.ErrNoChannel();
        }
        ibcHandler.sendPacket(
            channelId,
            // No height timeout
            IbcCoreClientV1Height.Data({revision_number: 0, revision_height: 0}),
            // Timestamp timeout
            localTimeout,
            // Raw protocol packet
            packet.encode()
        );
    }

    function onRecvPacketProcessing(IbcCoreChannelV1Packet.Data calldata packet, address relayer)
        public
    {
        require(msg.sender == address(this), "unauthorized");

        PingPongPacket memory pp = PingPongLib.decode(packet.data);

        emit PingPongLib.Ring(pp.ping);

        uint64 localTimeout = pp.counterpartyTimeout;

        pp.ping = !pp.ping;
        pp.counterpartyTimeout = uint64(block.timestamp * 1e9) + timeout;

        // Send back the packet after having reversed the bool and set the counterparty timeout
        initiate(pp, localTimeout);
    }

    function onRecvPacket(IbcCoreChannelV1Packet.Data calldata packet, address relayer)
        external
        virtual
        override
        onlyIBC
        returns (bytes memory acknowledgement)
    {
        // We wrap in a sub-transaction to avoid reverting the call, returning a failure ack instead.
        // If we were to revert in this call the packet would never be able to be acked back (timeout would occur later).
        (bool success, bytes memory _res) =
            address(this).call(abi.encodeWithSelector(this.onRecvPacketProcessing.selector, packet, relayer));
        if (success) {
            return abi.encodePacked(PingPongLib.ACK_SUCCESS);
        } else {
            return abi.encodePacked(PingPongLib.ACK_FAILURE);
        }
    }

    function onAcknowledgementPacket(
        IbcCoreChannelV1Packet.Data calldata packet,
        bytes calldata acknowledgement,
        address relayer
    ) external virtual override onlyIBC {
        /*
            In practice, a more sophisticated protocol would check
            and execute code depending on the counterparty outcome (refund etc...).
            In our case, the acknowledgement will always be ACK_SUCCESS
        */
        if (keccak256(acknowledgement) != keccak256(abi.encodePacked(PingPongLib.ACK_SUCCESS))) {
            revert PingPongLib.ErrInvalidAck();
        }
        emit PingPongLib.Acknowledged();
    }

    function onTimeoutPacket(IbcCoreChannelV1Packet.Data calldata packet, address relayer)
        external
        virtual
        override
        onlyIBC
    {
        /*
            Similarly to the onAcknowledgementPacket function, this indicates a failure to deliver the packet in expected time.
            A sophisticated protocol would revert the action done before sending this packet.
        */
        emit PingPongLib.TimedOut();
    }

    function onChanOpenInit(
        IbcCoreChannelV1GlobalEnums.Order,
        string[] calldata,
        string calldata,
        string calldata,
        IbcCoreChannelV1Counterparty.Data calldata,
        string calldata version
    ) external virtual override onlyIBC {
        // This protocol is only accepting a single counterparty.
        if (bytes(channelId).length != 0) {
            revert PingPongLib.ErrOnlyOneChannel();
        }
        if (keccak256(bytes(version)) != PingPongLib.PROTOCOL_VERSION) {
            revert PingPongLib.ErrInvalidVersion();
        }
    }

    function onChanOpenTry(
        IbcCoreChannelV1GlobalEnums.Order,
        string[] calldata,
        string calldata,
        string calldata,
        IbcCoreChannelV1Counterparty.Data calldata,
        string calldata,
        string calldata version
    ) external virtual override onlyIBC {
        // Symmetric to onChanOpenInit
        if (bytes(channelId).length != 0) {
            revert PingPongLib.ErrOnlyOneChannel();
        }
        if (keccak256(bytes(version)) != PingPongLib.PROTOCOL_VERSION) {
            revert PingPongLib.ErrInvalidVersion();
        }
    }

    function onChanOpenAck(
        string calldata _portId,
        string calldata _channelId,
        string calldata,
        string calldata counterpartyVersion
    ) external virtual override onlyIBC {
        if (keccak256(bytes(counterpartyVersion)) != PingPongLib.PROTOCOL_VERSION) {
            revert PingPongLib.ErrInvalidVersion();
        }
        // Store the port/channel needed to send packets.
        channelId = _channelId;
    }

    function onChanOpenConfirm(string calldata _portId, string calldata _channelId) external virtual override onlyIBC {
        // Symmetric to onChanOpenAck
        channelId = _channelId;
    }

    function onChanCloseInit(string calldata, string calldata) external virtual override onlyIBC {
        // The ping-pong is infinite, closing the channel is disallowed.
        revert PingPongLib.ErrInfiniteGame();
    }

    function onChanCloseConfirm(string calldata, string calldata) external virtual override onlyIBC {
        // Symmetric to onChanCloseInit
        revert PingPongLib.ErrInfiniteGame();
    }

    /**
     * @dev Throws if called by any account other than the IBC contract.
     */
    modifier onlyIBC() {
        _checkIBC();
        _;
    }

    /**
     * @dev Throws if the sender is not the IBC contract.
     */
    function _checkIBC() internal view virtual {
        if (address(ibcHandler) != msg.sender) {
            revert PingPongLib.ErrNotIBC();
        }
    }
}
