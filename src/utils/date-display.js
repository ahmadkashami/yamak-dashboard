import { i18n } from '@/plugins/i18n'

const getLocale = () => i18n.global.locale.value || 'en'

const getDateParts = (date, options, timeZone) => {
  const parts = new Intl.DateTimeFormat(getLocale(), {
    ...options,
    timeZone,
  }).formatToParts(date)

  return Object.fromEntries(parts.map(({ type, value }) => [type, value]))
}

const isValidDate = date => date instanceof Date && Number.isFinite(date.getTime())

export const formatDateOnly = value => {
  if (value === null || value === undefined || value === '')
    return value

  let date
  let timeZone

  if (typeof value === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|[T\s])/.exec(value)

    if (match) {
      const [, year, month, day] = match

      date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
      timeZone = 'UTC'

      if (
        date.getUTCFullYear() !== Number(year)
        || date.getUTCMonth() !== Number(month) - 1
        || date.getUTCDate() !== Number(day)
      )
        return value
    }
  }

  date ??= value instanceof Date ? value : new Date(value)
  timeZone ??= Intl.DateTimeFormat().resolvedOptions().timeZone

  if (!isValidDate(date))
    return typeof value === 'string' ? value : ''

  const parts = getDateParts(date, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }, timeZone)

  return `${parts.day} ${parts.month} ${parts.year}`
}

export const formatDateTime = value => {
  if (value === null || value === undefined || value === '')
    return value

  const date = value instanceof Date ? value : new Date(value)

  if (!isValidDate(date))
    return typeof value === 'string' ? value : ''

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const dateParts = getDateParts(date, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }, timeZone)

  const timeParts = getDateParts(date, {
    hour: '2-digit',
    hourCycle: 'h12',
    minute: '2-digit',
  }, timeZone)

  return `${dateParts.day} ${dateParts.month} ${dateParts.year}, ${timeParts.hour}:${timeParts.minute} ${timeParts.dayPeriod.toUpperCase()}`
}
