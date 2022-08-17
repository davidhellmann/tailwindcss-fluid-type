const defaults = require("../config/defaults");

module.exports = (options, data) => {
    if (defaults.settings && defaults.values && options.settings && options.values) {
        // Add settings
        data.settings = Object.fromEntries(Object.entries({
            ...options.settings, ...defaults.settings
        }).filter(([key]) => key !== 'unit').filter(([key]) => key !== 'prefix'));

        // Add values
        data.values = {...options.values, ...defaults.values}

        // Add prefix
        data.prefix = options.settings?.prefix || defaults.settings?.prefix || ''

        // Add number check
        data.settingsAreNumbers = Object
            .values(data.settings)
            .every(value => typeof value === 'number')

        return data
    }
}