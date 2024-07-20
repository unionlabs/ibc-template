pragma solidity ^0.8.24;

import "./IBCTypes.sol";

struct MsgChannelOpenInit {
    string portId;
    IbcCoreChannelV1Channel channel;
    address relayer;
}

interface IIBCChannelHandler {
    function channelOpenInit(MsgChannelOpenInit calldata message) external returns (string memory);
}
