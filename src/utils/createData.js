const defaults = require("../config/defaults");

module.exports = (options, data) => {
    if (defaults.settings && defaults.values && options.settings && options.values) {
        // Add settings
        data.settings = Object.fromEntries(Object.entries({
            ...defaults.settings, ...options.settings
        }).filter(([key]) => key !== 'unit').filter(([key]) => key !== 'prefix'));

        // Add values
        data.values = {...defaults.values, ...options.values }

        // Add prefix
        data.prefix = options.settings?.prefix || defaults.settings?.prefix || ''
        data.unit = options.settings?.unit || defaults.settings?.unit || 'rem'

        // Add number check
        data.settingsAreNumbers = Object
            .values(data.settings)
            .every(value => typeof value === 'number')

        return data
    }
}