export const displayDate = (timestampData: string) => {
  const month_english_list = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const convertedDate = new Date(parseInt(timestampData))
  const year = convertedDate.getFullYear()
  const int_month = convertedDate.getMonth()
  const month = month_english_list[int_month]
  const date = convertedDate.getDate()
  const formatDate = `${month} ${date}, ${year}`
  return formatDate
}
