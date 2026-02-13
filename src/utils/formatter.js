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

export function leadZero(x, length = 2) {
    return x.toString().padStart(length, '0')
}

export function formatTime(seconds) {
    const hours = Math.floor(seconds / 60 / 60)
    const minutes = Math.floor((seconds - hours * 60 * 60) / 60)
    const dSeconds = seconds - hours * 60 * 60 - minutes * 60

    return leadZero(hours) + ':' + leadZero(minutes) + ':' + leadZero(dSeconds)
}

export function formatDuration(str) {
    const digits = str.replaceAll(/[^\d ]/g, '').slice(-6)

    return digits.replace(/(.{2})(?=.)/g, '$1:').trim();
}

export function extractDurationSeconds(str) {
    const [hours, minutes, seconds] = str.split(':')

    return (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds)
}