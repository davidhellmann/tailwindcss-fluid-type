const plugin = require('tailwindcss/plugin')
// Defaults
const DEFAULT_SETTINGS = {
    fontSizeMin: 1.125,
    fontSizeMax: 1.25,
    ratioMin: 1.125,
    ratioMax: 1.2,
    screenMin: 20,
    screenMax: 96,
    unit: 'rem',
    prefix: '',
}
const DEFAULT_VALUES = {
    'xs': [-2, 1.6],
    'sm': [-1, 1.6],
    'base': [0, 1.6],
    'lg': [1, 1.6],
    'xl': [2, 1.2],
    '2xl': [3, 1.2],
    '3xl': [4, 1.2],
    '4xl': [5, 1.1],
    '5xl': [6, 1.1],
    '6xl': [7, 1.1],
    '7xl': [8, 1],
    '8xl': [9, 1],
    '9xl': [10, 1],
}
const DEFAULT_VARIANTS = ['responsive']

module.exports = plugin(
    function ({addUtilities, theme, variants, e}) {
        const values = theme('fluidType.values', DEFAULT_VALUES);
        const prefix = theme('fluidType.settings.prefix', DEFAULT_SETTINGS.prefix);
        const settingsAsArray = Object.entries(theme('fluidType.settings', DEFAULT_SETTINGS));
        const settingsAsArrayFiltered = settingsAsArray
            .filter(([key, value]) => key !== 'unit')
            .filter(([key, value]) => key !== 'prefix');
        const finalSettings = Object.fromEntries(settingsAsArrayFiltered);
        const settingsAreNumbers = Object
            .values(finalSettings)
            .every(value => typeof value === 'number')

        const calcModularScale = (value = 0) => {
            if (settingsAreNumbers) {
                const sFtMin = theme('fluidType.settings.fontSizeMin', DEFAULT_SETTINGS.fontSizeMin);
                const sFtMax = theme('fluidType.settings.fontSizeMax', DEFAULT_SETTINGS.fontSizeMax);
                const sFtRMin = theme('fluidType.settings.ratioMin', DEFAULT_SETTINGS.ratioMin);
                const sFtRMax = theme('fluidType.settings.ratioMax', DEFAULT_SETTINGS.ratioMax);
                const sFtSMin = theme('fluidType.settings.screenMin', DEFAULT_SETTINGS.screenMin);
                const sFtSMax = theme('fluidType.settings.screenMax', DEFAULT_SETTINGS.screenMax);
                const sFtUnit = typeof theme('fluidType.settings.unit', DEFAULT_SETTINGS.unit) === 'string'
                    ? theme('fluidType.settings.unit', DEFAULT_SETTINGS.unit)
                    : 'rem';
                const ftMin = sFtMin * Math.pow(sFtRMin, value);
                const ftMax = sFtMax * Math.pow(sFtRMax, value);
                return `clamp(${ftMin}${sFtUnit},
                calc(${ftMin}${sFtUnit} + (${ftMax} - ${ftMin}) * ((100vw - ${sFtSMin}${sFtUnit}) / (${sFtSMax} - ${sFtSMin}))),
                ${ftMax}${sFtUnit})`;
            }
            return value;
        };

        addUtilities(
            [
                Object.entries(values).map(([key, value]) => {
                    let output = {};

                    // Check if value is a string
                    if (typeof value === 'string') {
                        output.fontSize = value
                    }

                    // Check if value is a number
                    if (Number.isInteger(value)) {
                        output.fontSize = calcModularScale(value)
                    }

                    // Check if value is array with length 1
                    if (Array.isArray(value) && value.length === 1) {
                        output.fontSize = Number.isInteger(value[0]) ? calcModularScale(value[0]) : value[0]
                    }

                    // Check if value is array with length 2
                    if (Array.isArray(value) && value.length === 2) {

                        // Check if second value is an object
                        if (typeof value[1] === 'object' && value[1] !== null) {
                            output.fontSize = Number.isInteger(value[0]) ? calcModularScale(value[0]) : value[0]

                            // Check if key lineHeight exists
                            if ("lineHeight" in value[1]) {
                                output.lineHeight = value[1]['lineHeight']
                            }

                            // Check if key letterSpacing exists
                            if ("letterSpacing" in value[1]) {
                                output.letterSpacing = value[1]['letterSpacing']
                            }
                        } else {
                            output.fontSize = Number.isInteger(value[0]) ? calcModularScale(value[0]) : value[0]
                            output.lineHeight = value[1]
                        }
                    }

                    return {
                        [`.${e(`${prefix}text-${key}`)}`]: output,
                    }
                }),
            ],
            variants('fluidType', DEFAULT_VARIANTS)
        )
    },
    {
        theme: {
            fluidType: {
                settings: DEFAULT_SETTINGS,
                values: DEFAULT_VALUES
            },
        },
        variants: {
            fluidType: DEFAULT_VARIANTS,
        },
    }
)
