const logger = require('./logger')
const helper = require('./helper')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtracter = (request, response ,next) => {
  request.token = helper.getTokenFrom(request)
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error : 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error : error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: error.message
    })
  }
  logger.info('begin >>', error, '<< end')
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtracter,
  errorHandler,
}