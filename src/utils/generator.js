import dayjs from 'dayjs'
import { leadZero } from '@/utils/formatter.js'

export function generateMonthDays() {
    const now = dayjs()
    const count = now.endOf('month').date()
    const month = now.month() + 1

    const data = []

    for (let i = 1; i <= count; i++) {
        data.push(`${ leadZero(i) }.${ leadZero(month) }`)
    }

    return data
}

export function generateLastMonths(interval = 6) {
    const startDate = dayjs().subtract(interval, 'month')

    const data = []

    for (let i = 0; i <= interval; i++) {
        const date = startDate.add(i, 'month')
        data.push(`${ leadZero(date.month() + 1) }-${ date.year().toString().slice(-2) }`)
    }

    return data
}