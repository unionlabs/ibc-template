<script lang="ts">
  import clsx from 'clsx'
  import type { Address } from 'viem'
  import { sepolia } from 'viem/chains'
  import { fade, slide } from 'svelte/transition'
  import { truncateAddress } from '$/lib/utilities.ts'
  import { connect, disconnect, wallet, type ConnectorType } from '$lib/wallet/evm.ts'

  let connectError: any
  let walletAddress: Address

  $: if ($wallet.isConnected && $wallet.address) {
    walletAddress = $wallet.address
    connectError = undefined
  }

  async function connectWallet(type: ConnectorType) {
    try {
      const connection = await connect(type, sepolia.id)
      if (!connection) throw new Error(`No matching connector found: ${type}`)
    } catch (error) {
      connectError = error instanceof Error ? error.message : error
      console.error(connectError)
    }
  }

  let copyNotification = false
</script>

<section>
  <div class="flex flex-row items-center align-middle">
    <button
      class={clsx([
        'h-12 rounded-md bg-fuchsia-400 p-2 font-mono text-2xl font-bold tracking-wide text-white transition-colors duration-300 ease-in-out',
        'hover:bg-fuchsia-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50'
      ])}
      on:click={() => {
        if ($wallet.isConnected) {
          navigator.clipboard.writeText(walletAddress)
          copyNotification = true
          setTimeout(() => (copyNotification = false), 1000)
        } else connectWallet('injected')
      }}
      disabled={connectError}
    >
      {$wallet.isConnected ? truncateAddress(walletAddress) : 'CONNECT'}
    </button>
    <button
      hidden={!$wallet.isConnected}
      class="text-5xl hover:scale-110 hover:transform focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50"
      aria-details="exit door"
      on:click={() => disconnect()}
    >
      🚪
    </button>
  </div>
  {#if copyNotification}
    <p
      class="ml-[32px] text-lg font-bold transition-all"
      transition:slide
    >
      address copied ✓
    </p>
  {/if}
</section>
