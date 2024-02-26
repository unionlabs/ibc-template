# EVM Supercharged; seamless interactions between Solidity and Cosmwasm through IBC

This repository is a template that you can fork to build a cross-chain protocol on the Union testnet, connecting to Sepolia.

The template demonstrates a simple [ping-pong](https://union.build/docs/demos/pingpong/) as an example protocol, with implementatinos in both rust ([Cosmwasm](https://cosmwasm.com/)) and Solidity.

## Development environment

We use [nix](https://nixos.org/) to set up our development environment. We recommend using the [Determinate Systems nix installer](https://zero-to-nix.com/start/install). If you don't want to install nix, you can analyze the Makefile for the required tools.

After installing nix, run `nix develop` from the repository root to enter a shell with all of the required tools (cargo, foundry, etc).

## Building and uploading

We provide a Makefile to build the contracts and upload them on chain.

### Cosmwasm

FILL THIS IN @HUSSEIN

https://testnet.bonlulu.uno/

### Solidity

FILL THIS IN @HUSSEIN

https://sepolia.etherscan.io/

## Calling the contracts

FILL THIS IN WITH INFO FROM OMAR

## Helpful links

- Cosmwasm docs: https://book.cosmwasm.com/
- Solidity docs: https://docs.soliditylang.org/en/v0.8.24/
- Foundry docs: https://book.getfoundry.sh/

