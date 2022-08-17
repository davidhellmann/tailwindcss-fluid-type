const defaults = require("../config/defaults");

module.exports = (value, data) => {
    if (data.settingsAreNumbers && data.settings && defaults.settings) {
        const sFtMin = data.settings?.fontSizeMin || defaults.settings?.fontSizeMin
        const sFtMax = data.settings?.fontSizeMax || defaults.settings?.fontSizeMax
        const sFtRMin = data.settings?.ratioMin || defaults.settings?.ratioMin
        const sFtRMax = data.settings?.ratioMax || defaults.settings?.ratioMax
        const sFtSMin = data.settings?.screenMin || defaults.settings?.screenMin
        const sFtSMax = data.settings?.screenMax || defaults.settings?.screenMax
        const unit = data.settings?.unit || defaults.settings?.unit
        const sFtUnit = typeof unit === 'string' ? unit : 'rem';
        const ftMin = sFtMin * Math.pow(sFtRMin, value);
        const ftMax = sFtMax * Math.pow(sFtRMax, value);
        return `clamp(${ftMin}${sFtUnit}, calc(${ftMin}${sFtUnit} + ((${ftMax} - ${ftMin}) * ((100vw - ${sFtSMin}${sFtUnit}) / (${sFtSMax} - ${sFtSMin})))), ${ftMax}${sFtUnit})`;
    }
    return value;
}