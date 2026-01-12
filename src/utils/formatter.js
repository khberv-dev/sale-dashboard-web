import dayjs from 'dayjs'

export function formatNumber(number) {
    if (!number) {
        return "0"
    }

    const stringNumber = number.toString()
        .replace(/\D+/g, '')

    return Number(stringNumber)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function extractNumber(str) {
    return Number(str.toString().replace(/\D+/g, ''))
}