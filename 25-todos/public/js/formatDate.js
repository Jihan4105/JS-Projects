function formatDate(milisecond) {
  const date = new Date(milisecond).toISOString()
  const formatedDate = date.substring(0,10)
  const formatedTime = date.substring(11,19)

  return {
    "date" : formatedDate,
    "time" : formatedTime
  }
}

export default formatDate