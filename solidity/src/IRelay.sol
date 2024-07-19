pragma solidity ^0.8.24;

import "./IBCTypes.sol";

struct LocalToken {
    address denom;
    uint128 amount;
}

interface IRelay {
    function send(
        string calldata sourceChannel,
        bytes calldata receiver,
        LocalToken[] calldata tokens,
        string calldata extension,
        IbcCoreClientV1Height.Data calldata timeoutHeight,
        uint64 timeoutTimestamp
    ) external;
}
