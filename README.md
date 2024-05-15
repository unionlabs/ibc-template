# EVM-IBC; Supercharged

This repository is a template that you can fork to build a cross-chain protocol on the Union testnet, connecting to Sepolia.

The template demonstrates a simple [ping-pong](https://union.build/docs/demos/pingpong/) as an example protocol, with implementatinos in both rust ([Cosmwasm](https://cosmwasm.com/)) and Solidity.

## Development environment

We use [nix](https://nixos.org/) to set up our development environment. We recommend using the [Determinate Systems nix installer](https://zero-to-nix.com/start/install). After installing nix, run `nix develop` from the repository root to enter a shell with all of the required tools.

If you don't want to install nix, here are the required tools:

- make (GNU Make 4.4.1)
- jq (jq-1.7.1)
- forge (0.2.0 (2cb8757 2024-02-03T00:16:46.961268899Z))
- rustup (see ./rust-toolchain)
- binaryen (wasm-opt version 116)
- docker (24.0.5)

## Hacking the protocol

The protocol is a simple ping pong implementation. Implementing a different protocol from this base should be straightforward.

## Building and uploading

We provide a Makefile to build the contracts and upload them on chain. You will first need to deploy the Cosmwasm contract to deploy the Solidity contract as the IBC channel will be opened from Sepolia (OpenInit). Voyager will automatically pickup channel opening and ensure the handshake is fully executed. It will also ensure packets relaying between the two contracts.

Make sure to have:

- a Union account funded with enough UNO tokens (we name it `UNION_HEX_PRIVATE_KEY`)
- a Sepolia account funded with enough ETH tokens (we name it `SEPOLIA_HEX_PRIVATE_KEY`)

### Cosmwasm

Run the following command and make sure to save the resulting value (we name it `COSMWASM_CONTRACT_ADDRESS`) to then deploy the solidity contracts: `PRIVATE_KEY=<UNION_HEX_PRIVATE_KEY> make deploy-union`

https://testnet.union.explorers.guru

### Solidity

Make sure you have the cosmwasm address by deploying it first, then run: `COSMWASM_CONTRACT_ADDRESS=<ADDR> PRIVATE_KEY=<SEPOLIA_HEX_PRIVATE_KEY> make deploy-evm`

The command will yield two outputs something like this:
```
0x368c040e9b719f198d3a5983a2cc3e1652125cc2
0x30e4bd8df72312464d3228bad542786c50d98143287096a4d66ecd1656c3a97c
```

The former is the freshly deployed contract address and the later is the channel open init tx hash.
You need to wait for the handshake to complete in order to send packets over the channel. Sepolia finality is around 6 minutes (union is 6 seconds); which means the handshake will complete in approximately 12 to 18 minutes.

You can track the state of your channel using `CONTRACT_ADDRESS="<EVM_CONTRACT_ADDRESS>" make check-channel`:
```json
{
  "state": "STATE_OPEN",
  "ordering": "ORDER_UNORDERED",
  "counterparty": {
    "port_id": "0x368c040e9b719f198d3a5983a2cc3e1652125cc2",
    "channel_id": "channel-7"
  },
  "connection_hops": [
    "connection-14"
  ],
  "version": "ucs00-pingpong-1",
  "port_id": "wasm.union1saqnfplyg9qmts2ynunet8vgrjfqxzwts3vx65uydpfe0q7akwvsg9xaw9",
  "channel_id": "channel-15"
}
```

Once the channel is in the `STATE_OPEN`, you can start interacting.

## Initiating the ping pong from sepolia

### Using Forge

Execute the following command: `PRIVATE_KEY=<SEPOLIA_HEX_PRIVATE_KEY> CONTRACT_ADDRESS=<EVM_CONTRACT_ADDRESS> make initiate-evm`

After the transaction is sent, you'll be able to see packets going back and forth between your contracts.

### Using Javascript

Copy the relevant ABI:

```sh
cat solidity/out/PingPong.sol/PingPong.json | jq '.abi'
```

Grab Union chain info from [`cosmos/chain-registry`](https://github.com/cosmos/chain-registry/blob/master/testnets/uniontestnet/chain.json)

```sh
curl https://raw.githubusercontent.com/cosmos/chain-registry/master/testnets/uniontestnet/chain.json >> web/chain.json
```

See this Stackblitz example that showcases how to use the Sepolia contract address you created and the generated ABI: [Stackblitz link](https://stackblitz.com/edit/github-28ywre?file=index.ts&view=editor)


## IBC Stack

Client connetion: `connection-0`

### Contract Addresses

#### Testnet 8
- IBCHandler: [0xa390514f803a3b318b93bf6cd4beeb9f8299a0eb](https://sepolia.etherscan.io/address/0xa390514f803a3b318b93bf6cd4beeb9f8299a0eb)
- CometblsClient: [0x96979ed96ae00d724109b5ad859568e1239c0837](https://sepolia.etherscan.io/address/0x96979ed96ae00d724109b5ad859568e1239c0837)
- UCS01: [0xd0081080ae8493cf7340458eaf4412030df5feeb](https://sepolia.etherscan.io/address/0xd0081080ae8493cf7340458eaf4412030df5feeb)
- UCS02: [0x9153952f174a1bcd7a9b3818ff21ecf918d4dca9](https://sepolia.etherscan.io/address/0x9153952f174a1bcd7a9b3818ff21ecf918d4dca9)

## Helpful links

- Cosmwasm docs: https://book.cosmwasm.com/
- Solidity docs: https://docs.soliditylang.org/en/v0.8.24/
- Foundry docs: https://book.getfoundry.sh/
