// Shared client-side checks. Every form builds its error messages the same
// way: a required check and a positive-number check, so the wording a user
// sees is identical everywhere ("[Label] is required.",
// "[Label] must be greater than 0.") no matter which form or field it's for.

export function requiredError(value) {
    return value === "" || value === null || value === undefined
        ? "is required"
        : null;
}

export function positiveError(value, { allowZero = false } = {}) {
    const number = Number(value);
    if (Number.isNaN(number)) return "is required";
    if (allowZero ? number < 0 : number <= 0) {
        return allowZero ? "can't be negative" : "must be greater than 0";
    }
    return null;
}
