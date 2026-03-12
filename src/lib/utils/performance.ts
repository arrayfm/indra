interface ThrottleFunction {
  (...args: any[]): any
}

export const throttle = (
  fn: ThrottleFunction,
  delay: number
): ThrottleFunction => {
  let last = 0
  return function (...args: any[]) {
    const now = new Date().getTime()
    if (now - last < delay) {
      return
    }
    last = now
    return fn(...args)
  }
}
