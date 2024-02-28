import {
  http,
  fallback,
  reconnect,
  getAccount,
  createConfig,
  watchAccount,
  unstable_connector,
  connect as _connect,
  disconnect as _disconnect,
  switchChain as _switchChain,
  type GetAccountReturnType
} from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { mainnet, sepolia } from '@wagmi/core/chains'
import { writable, type Writable } from 'svelte/store'

export const chains = [sepolia, mainnet] as const
export type ConfiguredChainId = (typeof chains)[number]['id']

export type Wallet = GetAccountReturnType
export type ConnectorType = 'injected'

export const config = createConfig({
  chains: [mainnet, sepolia],
  syncConnectedChain: true,
  multiInjectedProviderDiscovery: true,
  connectors: [injected({ shimDisconnect: true, unstable_shimAsyncInject: 2500 })],
  transports: {
    [mainnet.id]: fallback([http(), unstable_connector(injected)]),
    [sepolia.id]: fallback([http(), unstable_connector(injected)])
  }
})

const accountStore = writable(getAccount(config)) satisfies Writable<Wallet>
watchAccount(config, { onChange: accountStore.set })
reconnect(config)

export const wallet = { subscribe: accountStore.subscribe }

export async function connect(type: ConnectorType, chainId: ConfiguredChainId | undefined) {
  const connectors = config.connectors.filter(c => c.type === type)
  const connector = connectors[0] ?? connectors[1]

  if (connector) return _connect(config, { connector, chainId })
}

export const disconnect = () => _disconnect(config)

export const switchChain = (chainId: ConfiguredChainId) => _switchChain(config, { chainId })
