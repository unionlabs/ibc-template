pragma solidity ^0.8.24;

import "./IBCTypes.sol";

interface IIBCPacketHandler {
    function sendPacket(
        string calldata sourceChannel,
        IbcCoreClientV1Height.Data calldata timeoutHeight,
        uint64 timeoutTimestamp,
        bytes calldata data
    ) external returns (uint64);
}
