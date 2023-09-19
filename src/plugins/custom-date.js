const formatDate = date => {
  if (!date) return null
  const [year, month, day] = date.split("-")

  return `${day}-${months[month - 1].name}-${year}`
}

const months = [
  { name: 'Jan' },
  { name: 'Feb' },
  { name: 'Mar' },
  { name: 'Apr' },
  { name: 'May' },
  { name: 'Jun' },
  { name: 'Jul' },
  { name: 'Aug' },
  { name: 'Sep' },
  { name: 'Oct' },
  { name: 'Nov' },
  { name: 'Dec' },
]


export default formatDate
