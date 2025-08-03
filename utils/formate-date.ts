export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
}

export const formatDateForSubmit = (date: string) => {
    const formated = new Date(formatDate(date))
    return formated.toISOString().split("T")[0]
}