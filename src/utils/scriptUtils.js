export function cleanToken(token) {
  // Step 1: remove all dynamic tokens
  let cleaned = token.replace(/{{[^{}]+}}/g, '');

  // Step 2: trim leading non-alphanumerics until first alphanumeric
  cleaned = cleaned.replace(/^[^a-zA-Z0-9]+/, '');

  // Step 3: collapse repeated non-alphanumerics to one
  cleaned = cleaned.replace(/[^a-zA-Z0-9]+(?=[^a-zA-Z0-9])/g, '');

  // Step 4: remove trailing non-alphanumerics
  cleaned = cleaned.replace(/[^a-zA-Z0-9]+$/, '');

  return cleaned;
}
