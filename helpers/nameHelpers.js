function getScreenshotName(ticker, date) {
  let today = new Date(Date.now())
  let timeStamp = today.toISOString().split('T')[0]
  timeStamp = timeStamp.replace(/-/g, '')
  const hours = `${today.getHours()}`.padStart(2, "0")
  const minutes = `${today.getMinutes()}`.padStart(2, "0")
  const seconds = `${today.getSeconds()}`.padStart(2, "0")
  const formattedDate = date.replace(/\//g, '')
  timeStamp = `${timeStamp}-${hours}${minutes}${seconds}-${ticker}-${formattedDate}`
  return timeStamp
}

module.exports = { getScreenshotName }