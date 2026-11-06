// Backend dates come as "YYYY-MM-DD" strings. new Date("2026-11-06") is
// parsed as UTC midnight, which can roll back to the previous day once the
// browser converts it to the user's local time zone. Splitting the string
// ourselves and building the Date from local year/month/day avoids that.
export function formatFriendlyDate(isoDateString, { includeYear = true } = {}) {
    const [year, month, day] = isoDateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        ...(includeYear ? { year: "numeric" } : {}),
    });
}
