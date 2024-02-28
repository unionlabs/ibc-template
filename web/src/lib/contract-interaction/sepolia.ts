import { writable } from 'svelte/store'
import { config } from '$/lib/wallet/evm.ts'
import { pingPongAbi } from '$/lib/abi/ping-pong.ts'
import { type Hash, getAddress, type Hex } from 'viem'
import { simulateContract, writeContract } from '@wagmi/core'

export const sepoliaTransactions = writable<Array<Hex>>([])

export async function pingSepolia(): Promise<Hash> {
  const { request } = await simulateContract(config, {
    abi: pingPongAbi,
    functionName: 'initiate',
    address: getAddress('0x630c8453358a1D219f19012a3c883c675929BD0F'),
    args: [
      { ping: true, counterpartyTimeout: BigInt(Number.MAX_SAFE_INTEGER) },
      BigInt(Number.MAX_SAFE_INTEGER)
    ]
  })
  const response = await writeContract(config, request)

  sepoliaTransactions.update(transactions => [...transactions, response])
  return response
}
