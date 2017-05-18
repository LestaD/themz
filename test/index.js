import {
  theme,
  cond,
  breakpoint,
  palette,
  size,
  propIf,
  propIfElse,
} from '../src/index'

describe('utils', () => {
  const _props = {
    theme: {
      color: {
        gray: {
          light: '#aaa',
        },
      },
      palette: {
        primary: '#4682b4',
        primaryLight: '#5699c5',
      },
      breakpoints: {
        mobile: {
          medium: 10,
          small: 5,
        },
        desktop: {
          medium: 100,
          small: 50,
        },
      },
      sizes: {
        container: '1200px',
        block: '120px',
      },
    },
    truthy: true,
    falsy: false,
    maybeTruthy: '1',
    maybeFalsy: '',
  }


  describe('theme()', () => {
    it('with string path', () => {
      const result = theme('color')(_props)
      expect(result).toBe(_props.theme.color)
    })

    it('with array path', () => {
      const result = theme(['color'])(_props)
      expect(result).toBe(_props.theme.color)
    })

    it('with deep array path', () => {
      const result = theme(['color', 'gray', 'light'])(_props)
      expect(result).toBe(_props.theme.color.gray.light)
    })
  })

  describe('cond()', () => {
    it('truthy with string path', () => {
      const result = cond('truthy', 'color')(_props)
      expect(result).toBe(_props.theme.color)
    })
    it('falsy with string path', () => {
      const result = cond('falsy', 'color')(_props)
      expect(result).toBe(false)
    })
    it('truthy with array path', () => {
      const result = cond('truthy', ['color'])(_props)
      expect(result).toBe(_props.theme.color)
    })
    it('falsy with array path', () => {
      const result = cond('falsy', ['color'])(_props)
      expect(result).toBe(false)
    })
    it('truthy with deep array path', () => {
      const result = cond('truthy', ['color', 'gray', 'light'])(_props)
      expect(result).toBe(_props.theme.color.gray.light)
    })
    it('falsy with deep array path', () => {
      const result = cond('falsy', ['color', 'gray', 'light'])(_props)
      expect(result).toBe(false)
    })
    it('on non exists path string', () => {
      const result = cond('truthy', 'NOTFOUND')(_props)
      expect(result).toBe(undefined)
    })
    it('on non exists path deep array', () => {
      const result = cond('truthy', ['color', 'NOTFOUND', 'light'])(_props)
      expect(result).toBe(undefined)
    })
  })

  describe('breakpoint()', () => {
    it('exists with default size', () => {
      const result = breakpoint('mobile')(_props)
      expect(result).toBe(_props.theme.breakpoints.mobile.medium)
    })
    it('exists with custom size', () => {
      const result = breakpoint('desktop', 'small')(_props)
      expect(result).toBe(_props.theme.breakpoints.desktop.small)
    })
    it('non exists with default', () => {
      const result = breakpoint('NOTFOUND')(_props)
      expect(result).toBe(undefined)
    })
    it('non exists with custom', () => {
      const result = breakpoint('NOTFOUND', 'ERROR')(_props)
      expect(result).toBe(undefined)
    })
    it('exists with custom non exists size', () => {
      const result = breakpoint('desktop', 'NOTFOUNDSIZE')(_props)
      expect(result).toBe(undefined)
    })
  })

  describe('palette()', () => {
    it('with default shade', () => {
      const result = palette('primary')(_props)
      expect(result).toBe(_props.theme.palette.primary)
    })
    it('with custom shade', () => {
      const result = palette('primary', 'Light')(_props)
      expect(result).toBe(_props.theme.palette.primaryLight)
    })
    it('non exists palette without shade', () => {
      const result = palette('NOTFOUND')(_props)
      expect(result).toBe(undefined)
    })
    it('non exists palette with custom shade', () => {
      const result = palette('NOTFOUND', 'ASD')(_props)
      expect(result).toBe(undefined)
    })
    it('exists palette with non exists shade', () => {
      const result = palette('primary', 'NOTFOUND')(_props)
      expect(result).toBe(undefined)
    })
  })

  describe('size()', () => {
    it('resolve size', () => {
      const result = size('container')(_props)
      expect(result).toBe(_props.theme.sizes.container)
    })
    it('another size', () => {
      const result = size('block')(_props)
      expect(result).toBe(_props.theme.sizes.block)
    })
    it('non exists size', () => {
      const result = size('NOTFOUND')(_props)
      expect(result).toBe(undefined)
    })
  })

  describe('propIf()', () => {
    it('condition string with branch string', () => {
      expect(
        propIf('truthy', 'Result')(_props),
      ).toBe('Result')
      expect(
        propIf('falsy', 'Result')(_props),
      ).toBe(undefined)
    })

    it('condition string with branch function', () => {
      const fn = props => props.theme.palette
      expect(
        propIf('truthy', fn)(_props),
      ).toBe(_props.theme.palette)
      expect(
        propIf('falsy', fn)(_props),
      ).toBe(undefined)
    })

    it('condition func with branch string', () => {
      expect(
        propIf(props => props.truthy, 'Result')(_props),
      ).toBe('Result')
      expect(
        propIf(props => props.falsy, 'Result')(_props),
      ).toBe(undefined)
    })

    it('condition func with branch func', () => {
      const fn = props => props.theme.palette
      expect(
        propIf(props => props.truthy, fn)(_props),
      ).toBe(fn(_props))
      expect(
        propIf(props => props.falsy, fn)(_props),
      ).toBe(undefined)
    })

    it('condition string non exists field', () => {
      expect(
        propIf('NOTFOUND', 'Result')(_props),
      ).toBe(undefined)
    })

    it('condition func returns falsy', () => {
      expect(
        propIf(() => false, 'Result')(_props),
      ).toBe(undefined)
      expect(
        propIf(() => null, 'Result')(_props),
      ).toBe(undefined)
      expect(
        propIf(() => undefined, 'Result')(_props),
      ).toBe(undefined)
      expect(
        propIf(() => '', 'Result')(_props),
      ).toBe(undefined)
    })

    it('condition is boolean', () => {
      expect(
        propIf(true, 'Result')(_props),
      ).toBe('Result')
      expect(
        propIf(true, () => 'Result')(_props),
      ).toBe('Result')
      expect(
        propIf(false, 'Result')(_props),
      ).toBe(undefined)
    })
  })

  describe('propIfElse()', () => {
    it('condition string with branch string', () => {
      expect(
        propIfElse('truthy', 'Success', 'Fail')(_props),
      ).toBe('Success')
      expect(
        propIfElse('falsy', 'Result', 'Fail')(_props),
      ).toBe('Fail')
    })

    it('condition string with branches function', () => {
      const fn1 = props => props.theme.palette
      const fn2 = props => props.theme.sizes
      expect(
        propIfElse('truthy', fn1, fn2)(_props),
      ).toBe(_props.theme.palette)
      expect(
        propIfElse('falsy', fn1, fn2)(_props),
      ).toBe(_props.theme.sizes)
    })

    it('condition func with branches string', () => {
      expect(
        propIfElse(props => props.truthy, 'Success', 'Fail')(_props),
      ).toBe('Success')
      expect(
        propIfElse(props => props.falsy, 'Success', 'Fail')(_props),
      ).toBe('Fail')
    })

    it('condition func with branch func', () => {
      const fn1 = props => props.theme.palette
      const fn2 = props => props.theme.sizes
      expect(
        propIfElse(props => props.truthy, fn1, fn2)(_props),
      ).toBe(fn1(_props))
      expect(
        propIfElse(props => props.falsy, fn1, fn2)(_props),
      ).toBe(fn2(_props))
    })

    it('condition string with branch if string branch else func', () => {
      const fn1 = props => props.theme.palette
      expect(
        propIfElse('truthy', 'Success', fn1)(_props),
      ).toBe('Success')
      expect(
        propIfElse('falsy', 'Success', fn1)(_props),
      ).toBe(fn1(_props))
    })

    it('condition string with branch if func branch else string', () => {
      const fn1 = props => props.theme.palette
      expect(
        propIfElse('truthy', fn1, 'Fail')(_props),
      ).toBe(fn1(_props))
      expect(
        propIfElse('falsy', fn1, 'Fail')(_props),
      ).toBe('Fail')
    })

    it('condition func with branch if func branch else string', () => {
      const fn1 = props => props.theme.palette
      expect(
        propIfElse(props => props.truthy, fn1, 'Fail')(_props),
      ).toBe(fn1(_props))
      expect(
        propIfElse(props => props.falsy, fn1, 'Fail')(_props),
      ).toBe('Fail')
    })

    it('condition is boolean', () => {
      expect(
        propIfElse(true, 'Result', 'Falsy')(_props),
      ).toBe('Result')
      expect(
        propIfElse(true, () => 'Result', () => 'Falsy')(_props),
      ).toBe('Result')
      expect(
        propIfElse(false, 'Result', 'Falsy')(_props),
      ).toBe('Falsy')
    })

    it('condition without falsy branch // need it?', () => {
      expect(
        propIfElse(() => true, 'Result')(_props),
      ).toBe('Result')
      expect(
        propIfElse(() => false, 'Result')(_props),
      ).toBe(undefined)
    })
  })
})
