// Linear
const linear = x => x

// Quadratic
const easeInQuad = x => x ** 2
const easeOutQuad = x => 1 - easeInQuad(1 - x)
const easeInOutQuad = x => (x < 0.5 ? easeInQuad(x * 2) / 2 : 1 - easeInQuad((1 - x) * 2) / 2)

// Cubic
const easeInCubic = x => x ** 3
const easeOutCubic = x => 1 - easeInCubic(1 - x)
const easeInOutCubic = x => (x < 0.5 ? easeInCubic(x * 2) / 2 : 1 - easeInCubic((1 - x) * 2) / 2)

// Quartic
const easeInQuart = x => x ** 4
const easeOutQuart = x => 1 - easeInQuart(1 - x)
const easeInOutQuart = x => (x < 0.5 ? easeInQuart(x * 2) / 2 : 1 - easeInQuart((1 - x) * 2) / 2)

// Sinusoidal
const easeInSine = x => -Math.cos(x * Math.PI / 2) + 1
const easeOutSine = x => 1 - easeInSine(1 - x)
const easeInOutSine = x => (x < 0.5 ? easeInSine(x * 2) / 2 : 1 - easeInSine((1 - x) * 2) / 2)

export default {
  linear,

  easeInQuad,
  easeOutQuad,
  easeInOutQuad,

  easeInCubic,
  easeOutCubic,
  easeInOutCubic,

  easeInQuart,
  easeOutQuart,
  easeInOutQuart,

  easeInSine,
  easeOutSine,
  easeInOutSine
}
