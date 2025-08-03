export const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString()
}

export const formatDateForSubmit = (date: string | Date) => {
    const formated = new Date(formatDate(date))
    return formated.toISOString().split("T")[0]
}