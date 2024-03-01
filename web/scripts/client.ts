import 'dotenv/config'
import { sepolia } from 'viem/chains'
import { raise } from '$/lib/utilities'
import { privateKeyToAccount } from 'viem/accounts'
import { createWalletClient, http, isHex } from 'viem'

const PRIVATE_KEY = isHex(process.env.PRIVATE_KEY)
  ? process.env.PRIVATE_KEY
  : raise('set PRIVATE_KEY in `web/.env` or export it as an environment variable')

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

export const sepoliaClient = createWalletClient({
  chain: sepolia,
  transport: http(SEPOLIA_RPC_URL),
  account: privateKeyToAccount(PRIVATE_KEY)
})
