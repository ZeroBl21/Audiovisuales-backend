export const handleError = (statusCode, message, data = null) => {
  const error = new Error(message)
  error.statusCode = statusCode
  error.data = data
  return error
}

export const handlePromiseError = (err, cb) => {
  if (!err.statusCode) {
    err.statusCode = 500
  }
  cb(err)
}
