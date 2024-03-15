module.exports = (className, output, e, theme) => {
  const lineHeights = theme('lineHeight')

  const defaultClass = {
    [className]: output,
  }

  return Object.entries(lineHeights).reduce((classes, [name, lineHeight]) => ({
    ...classes,
    [`${className}${e(`/${name}`)}`]: {
        ...output,
        lineHeight,
    }
  }), defaultClass)
}