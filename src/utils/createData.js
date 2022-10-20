const defaults = require("../config/defaults");

module.exports = (options, data) => {
    if (defaults.settings && defaults.values) {
        // Add settings
        data.settings = Object.fromEntries(Object.entries({
            ...defaults.settings, ...options?.settings
        }));

        // Save extendValues
        const extendValues = data.settings.extendValues

        // Remove settings from object
        delete data.settings.unit
        delete data.settings.prefix
        delete data.settings.extendValues

        // Add values
        if (extendValues) {
            data.values = {...defaults.values, ...options?.values }
        } else {
            const values = options?.values ? options?.values : defaults.values;
            data.values = { ...values }
        }

        // Add prefix
        data.prefix = options?.settings?.prefix || defaults.settings?.prefix || ''
        data.unit = options?.settings?.unit || defaults.settings?.unit || 'rem'

        // Add number check
        data.settingsAreNumbers = Object
            .values(data.settings)
            .every(value => typeof value === 'number')

        return data
    }
}
