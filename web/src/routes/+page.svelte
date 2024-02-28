<script lang="ts">
  import clsx from 'clsx'
  import { onMount } from 'svelte'
  import { sepolia } from '@wagmi/core/chains'
  import Connect from '$lib/components/connect.svelte'
  import { wallet, config, switchChain } from '$lib/wallet/evm.ts'
  import {
    snapAddress,
    snapInstalled,
    snapConnected,
    getSnapAddress,
    suggestSnapChain,
    unionTransactions,
    snapChainConnected,
    ensureSnapInstalled,
    ensureSnapConnected,
    snapChainInitialized,
    ensureSnapChainInitialized,
    sendAssetFromUnionToEthereum
  } from '$/lib/wallet/union'

  let error: any

  onMount(async () => {
    await ensureSnapInstalled()
    await ensureSnapConnected()
    await getSnapAddress()
    await ensureSnapChainInitialized()
  })
</script>

<main
  class="mx-auto mt-12 flex h-full w-full flex-col items-center justify-start space-y-6 sm:space-y-6"
>
  <Connect />
  <section>
    {#if !$snapChainInitialized}
      <button on:click={() => suggestSnapChain()}>add union chain</button>
    {/if}
    {#if !$snapInstalled}
      <div class="mt-4">
        <button on:click={ensureSnapInstalled}>Add Leap Cosmos Wallet to Metamask 🌌</button>
      </div>
    {:else}
      <div class="my-4">✅ Leap Cosmos Wallet Installed</div>
    {/if}
    <button
      on:click={() => switchChain(sepolia.id)}
      class={clsx([
        'my-5',
        'shadow-mini hover:bg-dark/95 active:scale-98 rounded-lg bg-stone-50 text-black',
        'inline-flex h-12 items-center justify-center px-[21px]',
        'text-[15px] font-semibold active:transition-all',
        $wallet.chainId === sepolia.id ? 'hidden' : ''
      ])}
    >
      Switch Chain
    </button>
    <div class="my-4">
      {#if $snapChainConnected}
        <div>✅ Connected to Union</div>
      {:else}
        <button on:click={suggestSnapChain}>Connect to Union</button>
      {/if}
    </div>
  </section>
</main>
<footer
  class="sticky bottom-0 mx-auto flex h-min items-center justify-center rounded-md align-middle font-mono font-semibold"
>
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/unionlabs/web-template"
    class="bg-cyan-500 px-2 font-mono font-semibold text-white hover:underline"
  >
    github.com/unionlabs/web-template
  </a>
</footer>
