pragma solidity ^0.8.24;

import "./IBCTypes.sol";

interface IIBCPacketHandler {
    function sendPacket(
        string calldata sourcePort,
        string calldata sourceChannel,
        IbcCoreClientV1Height.Data calldata timeoutHeight,
        uint64 timeoutTimestamp,
        bytes calldata data
    ) external returns (uint64);

    function recvPacket(MsgPacketRecv calldata msg_) external;

    function writeAcknowledgement(
        string calldata destinationPortId,
        string calldata destinationChannel,
        uint64 sequence,
        bytes calldata acknowledgement
    ) external;

    function acknowledgePacket(MsgPacketAcknowledgement calldata msg_) external;

    function timeoutPacket(MsgPacketTimeout calldata msg_) external;
}
