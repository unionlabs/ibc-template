// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {}
  interface Window {
    EventEmitter: typeof EventEmitter
  }
  // Vite environment variables types
  interface ImportMetaEnv {
    readonly COSMWASM_CONTRACT_ADDRESS: string
    readonly SEPOLIA_CONTRACT_ADDRESS: string
    readonly SEPOLIA_RPC_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
