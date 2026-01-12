export function getAvatarUrl(fileName) {
    return fileName ? import.meta.env.VITE_FILE_URL + 'avatar/' + fileName : null
}