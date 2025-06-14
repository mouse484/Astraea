import { type SettingKey, SettingSchemas, type SettingValue } from './schema'

export function readSetting<K extends SettingKey>(key: K): SettingValue<K> | undefined {
  const value = localStorage.getItem(key)
  if (value === null) {
    return undefined
  }

  try {
    const parsed = JSON.parse(value)
    const result = SettingSchemas[key].safeParse(parsed)

    if (result.success) {
      return result.data as SettingValue<K>
    }
    console.warn(result.error)
    return undefined
  } catch (error) {
    console.warn(error)
    return undefined
  }
}

export function writeSetting<K extends SettingKey>(key: K, value: SettingValue<K>): void {
  const result = SettingSchemas[key].safeParse(value)
  if (!result.success) {
    throw new Error(`Invalid value for setting "${key}": ${result.error.message}`)
  }
  localStorage.setItem(key, JSON.stringify(result.data))
}

export function deleteSetting<K extends SettingKey>(key: K): void {
  localStorage.removeItem(key)
}
