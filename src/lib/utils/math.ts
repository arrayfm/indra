export const toNearestEvenHalf = (num: number) => {
  return Math.ceil(num / 4) * 2
}

export const randomizeArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export const lerp = (start: number, end: number, alpha: number) =>
  start + (end - start) * alpha

export const inverseLerp = (start: number, end: number, value: number) =>
  start === end ? 0 : (value - start) / (end - start)

export const lowestNumber = (valueOne?: number, valueTwo?: number) => {
  if (valueOne === undefined && valueTwo === undefined) return undefined
  if (valueOne === undefined) return valueTwo
  if (valueTwo === undefined) return valueOne
  return Math.min(valueOne, valueTwo)
}
