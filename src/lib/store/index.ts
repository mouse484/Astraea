import { type StoreKey, StoreSchemas, type StoreValue } from './schema'

export function readStore<K extends StoreKey>(key: K): StoreValue<K> | undefined {
  const value = localStorage.getItem(key)
  if (value === null) {
    return undefined
  }

  try {
    const parsed = JSON.parse(value)
    const result = StoreSchemas[key].safeParse(parsed)

    if (result.success) {
      return result.data as StoreValue<K>
    }
    console.warn(result.error)
    return undefined
  } catch (error) {
    console.warn(error)
    return undefined
  }
}

export function writeStore<K extends StoreKey>(key: K, value: StoreValue<K>): void {
  const result = StoreSchemas[key].safeParse(value)
  if (!result.success) {
    throw new Error(`Invalid value for store "${key}": ${result.error.message}`)
  }
  localStorage.setItem(key, JSON.stringify(result.data))
}

export function deleteStore<K extends StoreKey>(key: K): void {
  localStorage.removeItem(key)
}
