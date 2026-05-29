export class StabilityBuffer {
  constructor(size = 10, threshold = 0.6) {
    this.size = size;          // how many recent predictions to track
    this.threshold = threshold; // fraction that must agree (e.g. 60%)
    this.buffer = [];
  }

  add(value) {
    this.buffer.push(value);
    if (this.buffer.length > this.size) {
      this.buffer.shift();
    }
  }

  getStable() {
    if (this.buffer.length < this.size) return null; // wait until buffer is full

    const counts = {};
    for (const v of this.buffer) {
      counts[v] = (counts[v] || 0) + 1;
    }

    const [topValue, topCount] = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0];

    return topCount / this.size >= this.threshold ? topValue : null;
  }
}