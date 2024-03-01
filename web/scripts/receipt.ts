#!/usr/bin/env bun
import { sepolia } from 'viem/chains'
import { raise } from '$/lib/utilities'
import { sepoliaClient } from './client.ts'
import { privateKeyToAccount } from 'viem/accounts'
import { createWalletClient, http, isAddress, isHex } from 'viem'
import { getTransactionReceipt, simulateContract, writeContract } from 'viem/actions'

// 0xbe80072bf009ae3bb39ccce6094f34b78b82990fe497e4694af211a00623f44d

// getTransactionReceipt(sepoliaClient, {
//   hash: '0xbe80072bf009ae3bb39ccce6094f34b78b82990fe497e4694af211a00623f44d'
// }).then(console.log)
