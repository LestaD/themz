# Themz

## Readme

Themz is helpers library for easy theming with [StyledComponents](https://styled-components.com), [ReactJSS](http://cssinjs.org/react-jss), [StyledJSS](http://cssinjs.org/styled-jss)


## Installation

```bash
npm install --save themz
```

## Usage

Just import named functions.

```js
import {
  theme,
  cond,
  breakpoint,
  palette,
  size,
  propIfElse,
  propIf,
} from 'themz'
```

And define theme object

```js
const theme = {
  palette: {
    primary: '#ff0',
    primaryLight: '#ff9',
    accent: '#f00',
    accentDark: '#900',
  },
  breakpoints: {
    mobile: {
      small: '320px',
      middle: '480px',
    },
    desktop: {
      wide: '1920px',
    },
  },
  sizes: {
    large: '22px',
    middle: '15px',
    small: '8px',

    control: '12px',
  },
}
```

### StyledComponents

```js
import styled from 'styled-components'
import { palette, size } from 'themz'

export const Button = styled.button`
  border: none;
  padding: ${size('middle')};
  background-color: ${palette('accent')};
`
```

### ReactJSS

```js
import React from 'react'
import injectSheet from 'react-jss'
import { propIfElse, palette, size } from 'themz'

const styles = {
  button: {
    backgroundColor: propIfElse('accent', palette('accent'), palette('control', 'Light')),
    padding: size('middle'),
  }
}

const Button = ({ classes, children }) => (
  <button className={classes.button}>
    {children}
  </button>
)

export default injectSheet(styles)(Button)
```

### StyledJSS

```js
import styled from 'styled-jss'
import { propIf, palette, breakpoint } from 'themz'

export const Button = styled('button')({
  boxShadow: propIf('shadowed', `1px 1px 5px -1px black`),
  backgroundColor: palette('accent', 'Dark'),
  width: breakpoint('mobile', 'small'),
})
```


## API

See [tests](/test/index.js)

### theme

Just select properties
