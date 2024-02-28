import { CHAIN, URLS, UNO, CONTRACT } from '$/lib/constants'
import { wallet } from '$/lib/wallet/evm'
import { snapConnected, snapChainInitialized } from '$/lib/wallet/union'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { Tendermint37Client } from '@cosmjs/tendermint-rpc'
import { CosmjsOfflineSigner } from '@leapwallet/cosmos-snap-provider'
import { writable, get } from 'svelte/store'

export const unionTransactions = writable<Array<string>>([])
export async function sendAssetFromUnionToEthereum({ amount }: { amount: bigint }) {
  if (!get(snapConnected)) return
  if (!get(snapChainInitialized)) return
  const ethereumAddress = get(wallet).address

  if (!ethereumAddress) {
    console.error('[sendSnapTransaction] missing data. Initialize the client and signer first.')
    return
  }

  const offlineSigner = new CosmjsOfflineSigner(CHAIN.UNION.ID)
  const tendermintClient = await Tendermint37Client.connect(URLS.UNION.RPC)

  const signingCosmWasmClient = await SigningCosmWasmClient.createWithSigner(
    tendermintClient,
    offlineSigner,
    { gasPrice: GasPrice.fromString(`0.001${UNO.NATIVE_DENOM}`) }
  )

  const [{ address: unionAddress }] = await offlineSigner.getAccounts()
  const result = await signingCosmWasmClient.execute(
    unionAddress,
    CONTRACT.UNION.ADDRESS,
    {
      transfer: {
        channel: CONTRACT.UNION.SOURCE_CHANNEL,
        receiver: ethereumAddress.slice(2),
        timeout: null,
        memo: 'random more than four characters I am transferring.'
      }
    },
    'auto',
    undefined,
    [{ denom: UNO.NATIVE_DENOM, amount: amount.toString() }]
  )

  unionTransactions.update(transactions => [...transactions, result.transactionHash])
}
