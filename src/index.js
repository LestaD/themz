import { path } from 'ramda'

const isfunc = val => typeof val === 'function'
const isstr = val => typeof val === 'string'

/**
 * @param  {(String|String[])} name     Value path or name
 * @return {Any}            Value or CSS retrieved from theme
 */
export const theme = name =>
  path(['theme'].concat(name))


/**
 * @param  {String} condProp              Prop that should be exists to activate theme
 * @param  {(String|String[])} themePart    Part theme name to apply
 * @return {CSS|false}                    CSS from theme if condition is truthy
 */
export const cond = (condProp, themePart) => props =>
  props[condProp] && path(['theme'].concat(themePart))(props)


/**
 * @param {String} target         name of the target from Breakpoints enum
 * @param {String} [size]         Ex.: small, medium, large
 * @return {Number}               Breakpoint size in pixels
 */
export const breakpoint = (target, size = 'medium') =>
  path(['theme', 'breakpoints', target, size])


/**
 * @param  {String} name        Color name
 * @param  {String} [shade]     Shading (one of: Darken, Lighten) if exists in palette
 * @return {String}             Color from palette
 */
export const palette = (name, shade = '') =>
  path(['theme', 'palette', `${name}${shade}`])


/**
 * @param  {String} name - Name from sizes
 * @return {Number}
 */
export const size = name =>
  path(['theme', 'sizes', name])


/**
 * Check if cond is true, returns true of exists in props then return truthy of truthy(props)
 * else return falsy or falsy(props)
 *
 * @param  {(String|Boolean|Function)} cond
 * @param  {(Function|Any)} truthy
 * @param  {(Function|Any)} [falsy]
 * @return {Any}
 */
export const propIfElse = (condition, truthy, falsy = undefined) => props =>
  (isfunc(condition) ? condition(props) : (isstr(condition) ? !!props[condition] : !!condition))
  ? isfunc(truthy) ? truthy(props) : truthy
  : isfunc(falsy) ? falsy(props) : falsy


/**
 * @param  {(String|Boolean|Function)} cond
 * @param  {(Function|Any)} truthy
 * @return {Any}
 */
export const propIf = (condition, truthy) => props =>
  (isfunc(condition) ? condition(props) : (isstr(condition) ? !!props[condition] : !!condition))
  ? isfunc(truthy) ? truthy(props) : truthy
  : undefined
