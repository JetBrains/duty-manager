if (typeof window !== 'undefined') {
  const token = new URLSearchParams(location.hash.slice(1)).get('access_token')
  if (token != null) {
    document.cookie = `space_token=${token}`
    document.addEventListener('DOMContentLoaded', () => {
      location.hash = ''
    })
  }
}
