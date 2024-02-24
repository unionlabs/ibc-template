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

library IbcCoreChannelV1Counterparty {
    //struct definition
    struct Data {
        string port_id;
        string channel_id;
    }
}

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

library IbcCoreChannelV1PacketState {
    //struct definition
    struct Data {
        string port_id;
        string channel_id;
        uint64 sequence;
        bytes data;
    }
}

library IbcCoreChannelV1PacketId {
    //struct definition
    struct Data {
        string port_id;
        string channel_id;
        uint64 sequence;
    }
}


library IbcCoreChannelV1Acknowledgement {
    //struct definition
    struct Data {
        bytes result;
        string error;
    }
}

library IbcCoreChannelV1GlobalEnums {
    //enum definition
    enum State {
        STATE_UNINITIALIZED_UNSPECIFIED,
        STATE_INIT,
        STATE_TRYOPEN,
        STATE_OPEN,
        STATE_CLOSED
    }
    enum Order {
        ORDER_NONE_UNSPECIFIED,
        ORDER_UNORDERED,
        ORDER_ORDERED
    }
}

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
