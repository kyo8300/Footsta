export const displayDate = (
  timestampData: string | undefined,
  isHours = true
) => {
  const month_english_list = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  if (typeof timestampData === 'undefined') return ''
  const convertedDate = new Date(parseInt(timestampData))
  const year = convertedDate.getFullYear()
  const int_month = convertedDate.getMonth()
  const month = month_english_list[int_month]
  const date = convertedDate.getDate()
  const hours = convertedDate.getHours()
  const minutes = convertedDate.getMinutes()
  const seconds = convertedDate.getSeconds()
  const formatDate = isHours
    ? `${month} ${date}, ${year} ${hours < 10 ? 0 : ''}${hours}:${
        minutes < 10 ? 0 : ''
      }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
    : `${month} ${date}, ${year}`
  return formatDate
}
