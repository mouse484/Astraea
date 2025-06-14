import type { NPub } from 'nostr-tools/nip19'
import { nip19 } from 'nostr-tools'

export type PubkeyHex = string
export type PubkeyRouteId = string

export type Pubkey = ReturnType<typeof createPubkey>

function normalizeToHex(input: string): PubkeyHex {
  if (input.startsWith('npub1')) {
    const decoded = nip19.decode(input)
    if (decoded.type !== 'npub') {
      throw new Error(`Invalid npub format: ${input}`)
    }
    return decoded.data
  }

  if (/^[0-9a-f]{64}$/i.test(input)) {
    return input
  }

  const npub = `npub1${input}` as NPub
  const decoded = nip19.decode(npub)
  if (decoded.type !== 'npub') {
    throw new Error(`Invalid route ID format: ${input}`)
  }
  return decoded.data
}

/**
 * Create a pubkey handler that supports multiple Nostr pubkey formats
 *
 * Supports the following input formats:
 * - npub1 format: "npub1abc123..." (Bech32 encoded with npub1 prefix)
 * - Hex format: "1234567890abcdef..." (64-character hexadecimal string)
 * - Route ID format: "abc123..." (npub1 without the "npub1" prefix)
 *
 * @param input - Pubkey in any supported format
 * @returns Object with getter properties for different pubkey formats
 *
 * @example
 * ```typescript
 * // From npub1 format
 * const key1 = createPubkey('npub1abc123...')
 *
 * // From hex format
 * const key2 = createPubkey('1234567890abcdef...')
 *
 * // From route ID format
 * const key3 = createPubkey('abc123...')
 *
 * // Access different formats
 * console.log(key1.hex)      // Get hex format
 * console.log(key1.npub)     // Get npub1 format
 * console.log(key1.routeId)  // Get route ID format
 * console.log(key1.isValid)  // Validate pubkey
 * ```
 *
 * @throws {Error} When input format is invalid or cannot be decoded
 */
export function createPubkey(input: string) {
  const hex = normalizeToHex(input)

  return {
    get hex(): PubkeyHex {
      return hex
    },

    get npub(): NPub {
      return nip19.npubEncode(hex)
    },

    get routeId(): PubkeyRouteId {
      return nip19.npubEncode(hex).slice(5)
    },

    get isValid(): boolean {
      return /^[0-9a-f]{64}$/i.test(hex)
    },
  }
}
