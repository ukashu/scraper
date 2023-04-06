function getDateFiveDaysBack(date) {
  let lessThanFiveDays = 422000000
  date = new Date(date)
  let milliseconds = date.getTime() - lessThanFiveDays
  let newDate = new Date(milliseconds)
  newDate = newDate.toISOString().split('T')
  newDate = newDate[0]
  newDate = newDate.split('-')
  newDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`
  return newDate
}

module.exports = { getDateFiveDaysBack }