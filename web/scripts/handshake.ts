#!/usr/bin/env tsx
import { sepolia } from 'viem/chains'
import { raise } from '$/lib/utilities'
import { privateKeyToAccount } from 'viem/accounts'
import { pingPongAbi } from '$/lib/abi/ping-pong.ts'
import { simulateContract, writeContract } from 'viem/actions'
import { createWalletClient, http, isAddress, isHex } from 'viem'

const MAX_BIG_INTEGER = BigInt(Number.MAX_SAFE_INTEGER)

const PRIVATE_KEY = isHex(process.env.PRIVATE_KEY)
  ? process.env.PRIVATE_KEY
  : raise('set PRIVATE_KEY in `web/.env` or export it as an environment variable')

const SEPOLIA_CONTRACT_ADDRESS = isAddress(process.env.SEPOLIA_CONTRACT_ADDRESS)
  ? process.env.SEPOLIA_CONTRACT_ADDRESS
  : raise('set SEPOLIA_CONTRACT_ADDRESS in `web/.env` or export it as an environment variable')

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

export const client = createWalletClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL),
  account: privateKeyToAccount(PRIVATE_KEY)
})

handshake()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

async function handshake() {
  const { request } = await simulateContract(client, {
    account: client.account,
    abi: pingPongAbi,
    address: SEPOLIA_CONTRACT_ADDRESS,
    functionName: 'initiate',
    args: [{ ping: true, counterpartyTimeout: MAX_BIG_INTEGER }, MAX_BIG_INTEGER]
  })
  const hash = await writeContract(client, request)

  console.log({ hash })
  return hash
}
