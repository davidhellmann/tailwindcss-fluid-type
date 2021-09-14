const plugin = require('tailwindcss/plugin')

module.exports = plugin(
    function ({addUtilities, theme, variants, e}) {
        const values = theme('fluidType');
        const settingsAsArray = Object.entries(theme('fluidTypeSettings'));
        const settingsAsArrayFiltered = settingsAsArray.filter(([key, value]) => key !== 'unit');
        const finalSettings = Object.fromEntries(settingsAsArrayFiltered);
        const settingsAreNumbers = Object
            .values(finalSettings)
            .every(value => typeof value === 'number')

        const calcModularScale = (value = 0) => {
            if (settingsAreNumbers) {
                const sFtMin = theme('fluidTypeSettings.fontSizeMin');
                const sFtMax = theme('fluidTypeSettings.fontSizeMax');
                const sFtRMin = theme('fluidTypeSettings.ratioMin');
                const sFtRMax = theme('fluidTypeSettings.ratioMax');
                const sFtSMin = theme('fluidTypeSettings.screenMin');
                const sFtSMax = theme('fluidTypeSettings.screenMax');
                const sFtUnit = typeof theme('fluidTypeSettings.unit') === 'string' ? theme('fluidTypeSettings.unit') : 'rem';
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

                    // Check if value a number
                    if (Number.isInteger(value)) {
                        output.fontSize = Number.isInteger(value) ? calcModularScale(value) : value
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
                        [`.${e(`text-${key}`)}`]: output,
                    }
                }),
            ],
            variants('fluidType')
        )
    },
    {
        theme: {
            fluidTypeSettings: {
                fontSizeMin: 1.125,
                fontSizeMax: 1.25,
                ratioMin: 1.125,
                ratioMax: 1.2,
                screenMin: 20,
                screenMax: 96,
                unit: 'rem'
            },
            fluidType: {
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
            },
        },
        variants: {
            fluidType: ['responsive'],
        },
    }
)
