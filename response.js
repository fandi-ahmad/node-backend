const response = (statusCode, message, data, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
            data: data
        },
        pagination: {
            prev: '',
            next: '',
            max: ''
        }
    })
}

module.exports = response