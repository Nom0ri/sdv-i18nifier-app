export function cleanToken(token) {
    // Remove {{ModID}} token and any trailing non-letter characters
    return token.replace(/\{\{ModID\}\}[^a-zA-Z0-9]*/gi, '').trim();
}