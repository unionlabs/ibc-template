import type { EventEmitter } from 'events'

// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {}
  interface Window {
    EventEmitter: typeof EventEmitter
  }
  // Vite environment variables types
  interface ImportMetaEnv extends EnvironmentVariables {}
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  // Node.js environment variables types
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

interface EnvironmentVariables {
  readonly COSMWASM_CONTRACT_ADDRESS: string
  readonly SEPOLIA_CONTRACT_ADDRESS: `0x${string}`
  readonly IBC_HANDLER_CONTRACT_ADDRESS: `0x${string}`
  readonly PRIVATE_KEY: `0x${string}`
  readonly SEPOLIA_RPC_URL: string
  readonly UNION_RPC_URL: string
}

export {}
