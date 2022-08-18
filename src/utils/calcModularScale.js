const defaults = require("../config/defaults");

module.exports = (value, data) => {
    if (data.settingsAreNumbers && data.settings) {
        const sFtMin = data.settings?.fontSizeMin
        const sFtMax = data.settings?.fontSizeMax
        const sFtRMin = data.settings?.ratioMin
        const sFtRMax = data.settings?.ratioMax
        const sFtSMin = data.settings?.screenMin
        const sFtSMax = data.settings?.screenMax
        const unit = data.unit
        const sFtUnit = typeof unit === 'string' ? unit : 'rem';
        const ftMin = sFtMin * Math.pow(sFtRMin, value);
        const ftMax = sFtMax * Math.pow(sFtRMax, value);
        return `clamp(${ftMin}${sFtUnit}, calc(${ftMin}${sFtUnit} + ((${ftMax} - ${ftMin}) * ((100vw - ${sFtSMin}${sFtUnit}) / (${sFtSMax} - ${sFtSMin})))), ${ftMax}${sFtUnit})`;
    }
    return value;
}