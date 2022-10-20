const plugin = require('tailwindcss/plugin')
const defaults = require('./config/defaults')
const createClasses = require('./utils/createClasses')
const createThemeOptions = require('./utils/createThemeOptions')

module.exports = plugin.withOptions(
    function (options) {
        return function ({addUtilities, variants, e}) {
            addUtilities(createClasses(options, e),
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