// Turns validation errors - either the backend's raw jakarta wording
// (e.g. "must not be null") or our own client-side checks, which already use
// the friendly wording - into plain sentences like "Waist is required." or
// "Waist must be greater than 0." Each form supplies its own `labels` map,
// since only that form knows what its own field names mean to a user; this
// function just knows how to combine a label with a message.

const BACKEND_MESSAGE_TRANSLATIONS = {
    "must not be null": "is required",
    "must not be blank": "is required",
    "must not be empty": "is required",
    "must be greater than or equal to 0": "can't be negative",
};

// fetch() rejects with a TypeError when the request never reached the
// server (offline, server down, CORS, etc). Any other error we throw
// ourselves (e.g. "Server error: 500") already has a clear message, so only
// TypeErrors get replaced with this friendlier, consistent wording.
const UNREACHABLE_MESSAGE =
    "Can't reach the server. Check your connection and try again.";

export function describeFetchError(err) {
    return err instanceof TypeError ? UNREACHABLE_MESSAGE : err.message;
}

function parseField(field) {
    const match = field.match(/^(.+)\[(\d+)]\.(.+)$/);
    if (match) {
        return { group: match[1], index: Number(match[2]), subfield: match[3] };
    }
    return { group: field, index: null, subfield: null };
}

export function formatFieldErrors(errors, labels) {
    if (!errors) return [];

    return Object.entries(errors).map(([field, message]) => {
        const { group, index, subfield } = parseField(field);
        const tail = BACKEND_MESSAGE_TRANSLATIONS[message] ?? message;
        const groupLabel = labels[group] ?? group;

        if (subfield !== null) {
            const subLabels = typeof groupLabel === "object" ? groupLabel : {};
            const subLabel = subLabels[subfield] ?? subfield;
            return `Exercise ${index + 1} ${subLabel} ${tail}.`;
        }

        const label =
            typeof groupLabel === "object" ? groupLabel._self ?? group : groupLabel;
        return `${label} ${tail}.`;
    });
}
