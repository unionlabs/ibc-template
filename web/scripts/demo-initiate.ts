#!/usr/bin/env bun
import 'dotenv/config'
import { isAddress } from 'viem'
import { raise } from '$/lib/utilities'
import { sepoliaClient } from './client.ts'
import { pingPongAbi } from '$/lib/abi/ping-pong.ts'
import { simulateContract, writeContract } from 'viem/actions'

/**
 * Run this with:
 * `node --import=tsx --env-file='./.env' ./scripts/demo-initiate.ts`
 * Make sure to set environment variables in `.env`.
 */
const MAX_BIG_INTEGER = BigInt(Number.MAX_SAFE_INTEGER)

const SEPOLIA_CONTRACT_ADDRESS = isAddress(process.env.SEPOLIA_CONTRACT_ADDRESS)
  ? process.env.SEPOLIA_CONTRACT_ADDRESS
  : raise('set SEPOLIA_CONTRACT_ADDRESS in `web/.env` or export it as an environment variable')

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

handshake()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

async function handshake() {
  const { request } = await simulateContract(sepoliaClient, {
    account: sepoliaClient.account,
    abi: pingPongAbi,
    address: SEPOLIA_CONTRACT_ADDRESS,
    functionName: 'initiate',
      args: [{ ping: true, counterpartyTimeout: 18446744073709551615n }, 18446744073709551615n]
  })
  const hash = await writeContract(sepoliaClient, request)

  console.log({ hash })
  return hash
}
