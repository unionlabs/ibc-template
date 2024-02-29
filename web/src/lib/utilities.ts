export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(Math.max(0, address.length - 4))}`
}

export function raise(error: unknown): never {
  throw typeof error === 'string' ? new Error(error) : error
}
