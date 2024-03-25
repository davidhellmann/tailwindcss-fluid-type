const plugin = require('tailwindcss/plugin')
const defaults = require('./config/defaults')
const createClasses = require('./utils/createClasses')
const createThemeOptions = require('./utils/createThemeOptions')

module.exports = plugin.withOptions(
    function (options) {
        return function ({addUtilities, variants, e, theme}) {
            addUtilities(createClasses(options, e, theme),
                variants('fontSizeFluid', defaults.variants));
        };
    },
    function (options) {
        return {
            theme: {
                fontSizeFluid: createThemeOptions(options, defaults)
            }
        };
    },
);