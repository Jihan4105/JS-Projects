function formatDate(milisecond, isAllday) {
  const rawDate = new Date(milisecond);
  const formatedDate = `${rawDate.getFullYear()}-${((rawDate.getMonth() + 1).toString()).padStart(2,"0")}-${rawDate.getDate()}`
  let formatedTime
  if(isAllday) {
    formatedTime = undefined
  } else {
    formatedTime = rawDate.toTimeString().substring(0,5)
  }

  return {
    "date" : formatedDate,
    "time" : formatedTime
  }
}

export default formatDate