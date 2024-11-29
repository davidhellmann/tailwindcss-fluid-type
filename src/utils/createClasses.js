const calcModularScale = require("./calcModularScale");
const createData = require("./createData");
const defaults = require("../config/defaults");
const createLeadingClasses = require("./createLeadingClasses");

module.exports = (value, options, theme) => {
    const data = createData(options, {}, defaults);
    let output = {};

    // Check if value is a string
    if (typeof value === "string") {
        output.fontSize = value;
    }

    // Check if value is a number
    if (typeof value === "number") {
        output.fontSize = calcModularScale(value, data);
    }

    // Check if value is array with length 1
    if (Array.isArray(value) && value.length === 1) {
        output.fontSize =
            typeof value[0] === "number"
                ? calcModularScale(value[0], data)
                : value[0];
    }

    // Check if value is array with length 2
    if (Array.isArray(value) && value.length === 2) {
        if (typeof value[1] === "object" && value[1] !== null) {
            output.fontSize =
                typeof value[0] === "number"
                    ? calcModularScale(value[0], data)
                    : value[0];

            if ("lineHeight" in value[1]) {
                output.lineHeight = value[1].lineHeight;
            }

            if ("letterSpacing" in value[1]) {
                output.letterSpacing = value[1].letterSpacing;
            }
        } else {
            output.fontSize =
                typeof value[0] === "number"
                    ? calcModularScale(value[0], data)
                    : value[0];
            output.lineHeight = value[1];
        }
    }

    return output;
};
