export function simulateDelay(req, res, next) {
  setTimeout(next, 1500);
}
