const calcModularScale = require('./calcModularScale')
const createData = require('./createData')

module.exports = (options) => {
    const data = createData(options, {})
    const theme = {}
    if (data.values) {
        Object.entries(data.values).map(([key, value]) => {

            // Check if value is a string
            if (typeof value === 'string') {
                theme[key] = value
            }

            // Check if value is a number
            if (typeof value === 'number') {
                theme[key] = calcModularScale(value, data)
            }

            // Check if value is array with length 1
            if (Array.isArray(value) && value.length === 1) {
                theme[key] = typeof value[0] === 'number' ? calcModularScale(value[0], data) : value[0]
            }

            // Check if value is array with length 2
            if (Array.isArray(value) && value.length === 2) {
                theme[key] = typeof value[0] === 'number' ? calcModularScale(value[0], data) : value[0]
            }
        })

        return theme
    }
}