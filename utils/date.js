export const getMonth = date =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date)

export const getWeekday = date =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(date)

export const getDateString = date => date.toISOString().slice(0, 10)
