export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function getDistances(w, h) {
  const d0 = h / 2
  const d1 = Math.sqrt(Math.pow(h / 2, 2) + Math.pow(w, 2))
  const d2 = Math.sqrt(Math.pow(h / 2, 2) + Math.pow(w / 2, 2))
  const d3 = 1.2 * h

  return [
    d0,
    d1,
    d2,
    d3,
    d2,
    d1,
  ]
}

export function getAngles(w, h, rotation) {
  const θa = Math.atan(w / ( h / 2 ))
  const θb = Math.atan(w / h)

  return [
    0,
    θa,
    Math.PI - θb,
    Math.PI,
    Math.PI + θb,
    (2 * Math.PI) - θa,
  ].map(angle => (angle + rotation) % (2 * Math.PI))
}

export function getPoints(x, y, distances, angles) {
  return distances.map((distance, index) => {
    return {
      x: x + (Math.cos(angles[index]) * distance),
      y: y + (Math.sin(angles[index]) * distance),
     }
  })
}
