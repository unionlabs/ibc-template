export const pingPongAbi = <const>[
  {
    type: 'constructor',
    inputs: [
      {
        name: '_ibcHandler',
        type: 'address',
        internalType: 'contract IIBCPacketHandler'
      },
      {
        name: '_timeout',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'initiate',
    inputs: [
      {
        name: 'packet',
        type: 'tuple',
        internalType: 'struct PingPongPacket',
        components: [
          {
            name: 'ping',
            type: 'bool',
            internalType: 'bool'
          },
          {
            name: 'counterpartyTimeout',
            type: 'uint64',
            internalType: 'uint64'
          }
        ]
      },
      {
        name: 'localTimeout',
        type: 'uint64',
        internalType: 'uint64'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onAcknowledgementPacket',
    inputs: [
      {
        name: 'packet',
        type: 'tuple',
        internalType: 'struct IbcCoreChannelV1Packet.Data',
        components: [
          {
            name: 'sequence',
            type: 'uint64',
            internalType: 'uint64'
          },
          {
            name: 'source_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'source_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes'
          },
          {
            name: 'timeout_height',
            type: 'tuple',
            internalType: 'struct IbcCoreClientV1Height.Data',
            components: [
              {
                name: 'revision_number',
                type: 'uint64',
                internalType: 'uint64'
              },
              {
                name: 'revision_height',
                type: 'uint64',
                internalType: 'uint64'
              }
            ]
          },
          {
            name: 'timeout_timestamp',
            type: 'uint64',
            internalType: 'uint64'
          }
        ]
      },
      {
        name: 'acknowledgement',
        type: 'bytes',
        internalType: 'bytes'
      },
      {
        name: 'relayer',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanCloseConfirm',
    inputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanCloseInit',
    inputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanOpenAck',
    inputs: [
      {
        name: '_portId',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '_channelId',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: 'counterpartyVersion',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanOpenConfirm',
    inputs: [
      {
        name: '_portId',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '_channelId',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanOpenInit',
    inputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'enum IbcCoreChannelV1GlobalEnums.Order'
      },
      {
        name: '',
        type: 'string[]',
        internalType: 'string[]'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IbcCoreChannelV1Counterparty.Data',
        components: [
          {
            name: 'port_id',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'channel_id',
            type: 'string',
            internalType: 'string'
          }
        ]
      },
      {
        name: 'version',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onChanOpenTry',
    inputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'enum IbcCoreChannelV1GlobalEnums.Order'
      },
      {
        name: '',
        type: 'string[]',
        internalType: 'string[]'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IbcCoreChannelV1Counterparty.Data',
        components: [
          {
            name: 'port_id',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'channel_id',
            type: 'string',
            internalType: 'string'
          }
        ]
      },
      {
        name: '',
        type: 'string',
        internalType: 'string'
      },
      {
        name: 'version',
        type: 'string',
        internalType: 'string'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onRecvPacket',
    inputs: [
      {
        name: 'packet',
        type: 'tuple',
        internalType: 'struct IbcCoreChannelV1Packet.Data',
        components: [
          {
            name: 'sequence',
            type: 'uint64',
            internalType: 'uint64'
          },
          {
            name: 'source_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'source_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes'
          },
          {
            name: 'timeout_height',
            type: 'tuple',
            internalType: 'struct IbcCoreClientV1Height.Data',
            components: [
              {
                name: 'revision_number',
                type: 'uint64',
                internalType: 'uint64'
              },
              {
                name: 'revision_height',
                type: 'uint64',
                internalType: 'uint64'
              }
            ]
          },
          {
            name: 'timeout_timestamp',
            type: 'uint64',
            internalType: 'uint64'
          }
        ]
      },
      {
        name: 'relayer',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [
      {
        name: 'acknowledgement',
        type: 'bytes',
        internalType: 'bytes'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'onTimeoutPacket',
    inputs: [
      {
        name: 'packet',
        type: 'tuple',
        internalType: 'struct IbcCoreChannelV1Packet.Data',
        components: [
          {
            name: 'sequence',
            type: 'uint64',
            internalType: 'uint64'
          },
          {
            name: 'source_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'source_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_port',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'destination_channel',
            type: 'string',
            internalType: 'string'
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes'
          },
          {
            name: 'timeout_height',
            type: 'tuple',
            internalType: 'struct IbcCoreClientV1Height.Data',
            components: [
              {
                name: 'revision_number',
                type: 'uint64',
                internalType: 'uint64'
              },
              {
                name: 'revision_height',
                type: 'uint64',
                internalType: 'uint64'
              }
            ]
          },
          {
            name: 'timeout_timestamp',
            type: 'uint64',
            internalType: 'uint64'
          }
        ]
      },
      {
        name: 'relayer',
        type: 'address',
        internalType: 'address'
      }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'Acknowledged',
    inputs: [],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Ring',
    inputs: [
      {
        name: 'ping',
        type: 'bool',
        indexed: false,
        internalType: 'bool'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TimedOut',
    inputs: [],
    anonymous: false
  },
  {
    type: 'error',
    name: 'ErrInfiniteGame',
    inputs: []
  },
  {
    type: 'error',
    name: 'ErrInvalidAck',
    inputs: []
  },
  {
    type: 'error',
    name: 'ErrInvalidVersion',
    inputs: []
  },
  {
    type: 'error',
    name: 'ErrNoChannel',
    inputs: []
  },
  {
    type: 'error',
    name: 'ErrNotIBC',
    inputs: []
  },
  {
    type: 'error',
    name: 'ErrOnlyOneChannel',
    inputs: []
  }
]

