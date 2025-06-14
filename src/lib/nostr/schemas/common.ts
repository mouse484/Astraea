import { z } from 'zod/v4'

const HEX_REGEX = /^[0-9a-f]+$/
const WEBSOCKET_PROTOCOL_REGEX = /^wss?$/

export const HexSchema = z.string().regex(HEX_REGEX).toLowerCase()
export const Hex32BytesSchema = HexSchema.length(64)
export const Hex64BytesSchema = HexSchema.length(128)
export const KindIntegerSchema = z.number().int().min(0).max(65_535)
export const PubkeySchema = Hex32BytesSchema
export const RelayUrlSchema = z.url({ protocol: WEBSOCKET_PROTOCOL_REGEX })
