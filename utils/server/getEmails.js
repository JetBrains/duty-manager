export async function getEmails(userId, fetch) {
  const {data} = await fetch(`team-directory/profiles/${userId}?$fields=emails`)
  return data.emails
    .map(item => item.email)
    .filter(email => /^.*@jetbrains\.com$/.test(email))
}
