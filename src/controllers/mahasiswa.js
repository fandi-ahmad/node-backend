const response = (statusCode, message, data, res) => {
    res.json(statusCode, [
        {
            status_code: statusCode,
            message: message,
            data: data,
            meta: {
                prev: '',
                next: '',
                current: ''
            }
        }
    ])
}

module.exports = response