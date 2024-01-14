const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  const regex = /Bearer /i
  if (authorization && authorization.match(regex)) {
    const newString = authorization.replace(regex, '')
    return newString
  }
  return null
}

module.exports = {
  getTokenFrom,
}