export const getEmails = user =>
  user.emails
    .map(item => item.email)
    .filter(email => /^.*@jetbrains\.com$/.test(email))

export async function fetchEmails(userId, fetch) {
  const {data} = await fetch(`team-directory/profiles/${userId}?$fields=emails`)
  return getEmails(data)
}
