import { Schema } from 'effect'
import { type StoreKey, StoreSchemas, type StoreValue } from './schema'

export function readStore<K extends StoreKey>(key: K): StoreValue<K> | undefined {
  const value = localStorage.getItem(key)
  if (value === null) {
    return undefined
  }

  try {
    const parsed = JSON.parse(value)
    const schema = StoreSchemas[key] as Schema.Schema<StoreValue<K>>
    const result = Schema.decodeUnknownSync(schema)(parsed)
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export function writeStore<K extends StoreKey>(key: K, value: StoreValue<K>): void {
  const schema = StoreSchemas[key] as Schema.Schema<StoreValue<K>>

  const result = Schema.decodeUnknownSync(schema)(value)

  localStorage.setItem(key, JSON.stringify(result))
}

export function deleteStore<K extends StoreKey>(key: K): void {
  localStorage.removeItem(key)
}
