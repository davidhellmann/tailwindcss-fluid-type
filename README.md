# 👉🏻 tailwindcss-fluid-type 

![Tailwincss Fluid Type](tailwindcss-fluid-type.png)

A plugin that makes the use of Fluid Type a breeze. 

## 👉🏻 Installation
Install the plugin from npm:
```bash
# Using npm
npm install tailwindcss-fluid-type

# Using Yarn
yarn add tailwindcss-fluid-type
```

Then add the plugin to your tailwind.config.js file and do your settings if you're not happy with the defaults:
```js

// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  // You have to disable the fontSize core 
  // plugins otherwise it doesn't work
  corePlugins: {
    fontSize: false,
    // ...
  },
  plugins: [
    require('tailwindcss-fluid-type'),
    // ...
  ],
};
```

## 👉🏻 Usage
Nothing changed here to the default tailwindcss configuration:
```html
<article>
  <h1 class="text-xl">Fluid type</h1>
</article>
```

## 👉🏻 Configuration
The plugin comes with a default configuration (see below) but it's possible to customize this config for your project:
```js
// tailwind.config.js
module.exports = {
  theme: {
    // your fluid type settings
    // works only with unitless numbers
    // This numbers are the defaults settings
    fluidTypeSettings: {
      fontSizeMin: 1.125, // 1.125rem === 18px
      fontSizeMax: 1.25, // 1.25rem === 20px
      ratioMin: 1.125, // Multiplicator Min
      ratioMax: 1.2, // Multiplicator Max
      screenMin: 20, // 20rem === 320px
      screenMax: 96 // 96rem === 1536px
    },
    // Creates the text-xx classes
    // This are the default settings and analog to the tailwindcss defaults
    // The values should be integer numbers
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
    aspectRatio: ['responsive']
  }
};
```
