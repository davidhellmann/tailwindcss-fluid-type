const plugin = require('tailwindcss/plugin')

module.exports = plugin(
    function ({ addComponents, theme, variants, e }) {
        const values = theme('fluidType');
        const settingsAreNumbers = Object.values(theme('fluidTypeSettings')).every(value => typeof value === 'number')

        const calcModularScale = (value = 0) => {
            if (settingsAreNumbers) {
                const sFtMin = theme('fluidTypeSettings.fontSizeMin');
                const sFtMax = theme('fluidTypeSettings.fontSizeMax');
                const sFtRMin = theme('fluidTypeSettings.ratioMin');
                const sFtRMax = theme('fluidTypeSettings.ratioMax');
                const sFtSMin = theme('fluidTypeSettings.screenMin');
                const sFtSMax = theme('fluidTypeSettings.screenMax');
                const ftMin = sFtMin * Math.pow(sFtRMin, value);
                const ftMax = sFtMax * Math.pow(sFtRMax, value);
                return `clamp(${ftMin}rem, 
                calc(${ftMin}rem + (${ftMax} - ${ftMin}) * ((100vw - ${sFtSMin}rem) / (${sFtSMax} - ${sFtSMin}))), 
                ${ftMax}rem)`;
            }
            return value;
        };

        addComponents(
            [
                Object.entries(values).map(([key, value]) => {
                    return {
                        [`.${e(`text-${key}`)}`]: {
                            fontSize: Number.isInteger(value) ? calcModularScale(value) : value,
                        },
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
                screenMax: 96
            },
            fluidType: {
                'xs': -2,
                'sm': -1,
                'base': 0,
                'lg': 1,
                'xl': 2,
                '2xl': 3,
                '3xl': 4,
                '4xl': 5,
                '5xl': 6,
                '6xl': 7,
                '7xl': 8,
                '8xl': 9,
                '9xl': 10,
            },
        },
        variants: {
            fluidType: ['responsive'],
        },
    }
)