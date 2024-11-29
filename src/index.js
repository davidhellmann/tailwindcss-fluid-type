const plugin = require("tailwindcss/plugin");
const defaults = require("./config/defaults");
const createClasses = require("./utils/createClasses");
const createThemeOptions = require("./utils/createThemeOptions");

module.exports = plugin.withOptions(
    function (options) {
    return function ({ matchUtilities, theme }) {
      // Updated API
      matchUtilities(
        // Use matchUtilities instead of addUtilities
        {
          text: (value) => createClasses(value, options, theme),
        },
        {
          values: createThemeOptions(options, defaults),
          supportsNegativeValues: false,
        },
      );
        };
    },
    function (options) {
        return {
            theme: {
        fontSizeFluid: createThemeOptions(options, defaults),
      },
        };
    },
);