# Themz

## Readme

[![Build Status](https://travis-ci.org/LestaD/themz.svg?branch=master)](https://travis-ci.org/LestaD/themz)
[![npm](https://img.shields.io/npm/v/themz.svg)](https://npmjs.com/themz)
[![David](https://img.shields.io/david/lestad/themz.svg)](https://github.com/lestad/themz)
[![license](https://img.shields.io/github/license/lestad/themz.svg)](https://github.com/lestad/themz)


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

Just select properties from `theme` property

```js
const styles = {
  value: theme('palette'), // will be object
  color: theme(['palette', 'accentLight']), // like: palette('accent', 'Light')
  width: theme(['width', 'control', 'medium']), // same as: props => props.theme.width.control.medium
}
```

### cond

Apply value if property exists in props object

```js
const styles = {
  backgroundColor: cond('opened', ['palette', 'accent']),
  textDecoration: cond('active', 'underline'),
}
```

### breakpoint

Simple select breakpoint from theme. (Default size is `medium`)

```js
const Demo = styled.div`
  @media screen and (max-width: ${breakpoint('desktop')}) {
    padding: ${size('controlPadding')};
  }

  @media screen and (max-width: ${breakpoint('desktop', 'small')}) {
    padding: ${size('controlSmall')};
  }
`
```

### palette

Select color from theme. By default shade is `''`

```js
const styles = {
  backgroundColor: palette('accent', 'Light'), // same as props => props.theme.palette.accentLight
  color: palette('black'), // props => props.theme.palette.black
}
```

### size

Get size from `theme.sizes`

```js
const styles = {
  width: size('block1/2'), // props => props.theme.sizes['block1/2']
}
```

### propIf

Execute condition, and it `true` return branch

```js
const styles = {
  padding: propIf(props => props.type === 'global', size('controlLarge')),
  color: propIf('active', palette('secondary', 'Light')),
  boxShadow: propIf('active', '1px 0 9px -1px #121412'),
}
```

### propIfElse

```js
const styles = {
  padding: propIf(
    props => props.type === 'global',
    size('controlLarge'),
    size('controlMedium')
  ),
  color: propIf('active', palette('secondary', 'Light'), palette('accent')),
  boxShadow: propIf('active', '1px 0 9px -1px #121412', 'none'),
}
```
