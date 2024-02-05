function calculateYearsAgo(dateString) {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    const timeDifference = currentDate - targetDate;
    const yearsAgo = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

    return Math.floor(yearsAgo);
}

export { calculateYearsAgo }