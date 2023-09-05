function mapRange(value, oldMin, oldMax, newMin, newMax) {
  const oldRange = oldMax - oldMin;
  const newRange = newMax - newMin;
  const newValue = ((value - oldMin) * newRange) / oldRange + newMin;
  return newValue;
}

function constrain(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function average(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: p1.y + p2.y / 2,
  };
}

function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

