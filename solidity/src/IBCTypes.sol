pragma solidity ^0.8.24;

library IbcCoreClientV1Height {
    //struct definition
    struct Data {
        uint64 revision_number;
        uint64 revision_height;
    }
}

library IbcCoreChannelV1Channel {
    //struct definition
    struct Data {
        IbcCoreChannelV1GlobalEnums.State state;
        IbcCoreChannelV1GlobalEnums.Order ordering;
        IbcCoreChannelV1Counterparty.Data counterparty;
        string[] connection_hops;
        string version;
    }
}

library IbcCoreChannelV1IdentifiedChannel {
    //struct definition
    struct Data {
        IbcCoreChannelV1GlobalEnums.State state;
        IbcCoreChannelV1GlobalEnums.Order ordering;
        IbcCoreChannelV1Counterparty.Data counterparty;
        string[] connection_hops;
        string version;
        string port_id;
        string channel_id;
    }
}

//library IbcCoreChannelV1Counterparty

library IbcCoreChannelV1Packet {
    //struct definition
    struct Data {
        uint64 sequence;
        string source_port;
        string source_channel;
        string destination_port;
        string destination_channel;
        bytes data;
        IbcCoreClientV1Height.Data timeout_height;
        uint64 timeout_timestamp;
    }
}

//library IbcCoreChannelV1Packet

library IbcCoreChannelV1PacketState {
    //struct definition
    struct Data {
        string port_id;
        string channel_id;
        uint64 sequence;
        bytes data;
    }
}

//library IbcCoreChannelV1PacketState

library IbcCoreChannelV1PacketId {
    //struct definition
    struct Data {
        string port_id;
        string channel_id;
        uint64 sequence;
    }
}

//library IbcCoreChannelV1PacketId

library IbcCoreChannelV1Acknowledgement {
    //struct definition
    struct Data {
        bytes result;
        string error;
    }
}

//library IbcCoreChannelV1Acknowledgement

library IbcCoreChannelV1GlobalEnums {
    //enum definition
    // Solidity enum definitions
    enum State {
        STATE_UNINITIALIZED_UNSPECIFIED,
        STATE_INIT,
        STATE_TRYOPEN,
        STATE_OPEN,
        STATE_CLOSED
    }
}
//library IbcCoreChannelV1GlobalEnums

struct MsgPacketRecv {
    IbcCoreChannelV1Packet.Data packet;
    bytes proof;
    IbcCoreClientV1Height.Data proofHeight;
}

struct MsgPacketAcknowledgement {
    IbcCoreChannelV1Packet.Data packet;
    bytes acknowledgement;
    bytes proof;
    IbcCoreClientV1Height.Data proofHeight;
}

struct MsgPacketTimeout {
    IbcCoreChannelV1Packet.Data packet;
    bytes proof;
    IbcCoreClientV1Height.Data proofHeight;
    uint64 nextSequenceRecv;
}
