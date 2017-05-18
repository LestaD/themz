
export function theme(arg: string | string[]): number | string | object

export function cond(condProp: string, themePart: string | string[]): number | string | object

export function breakpoint(target: string, size: 'small' | 'medium' | 'large' | 'xlarge' | 'large1440' | 'large1600' | 'fullhd'): number

export function palette(name: string, shade: string): string

export function size(name: string): number

/**
 * Check if cond is true, returns true of exists in props then return truthy of truthy(props)
 * else return falsy or falsy(props)
 */
export function propIfElse(cond: string | boolean | Function, thruthy: Function | any, falsy?: Function | any): any

export function propIf(cond: string | boolean | Function, thruthy: Function | any): any
