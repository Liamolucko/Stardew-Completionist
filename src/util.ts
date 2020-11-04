export function assert(
  condition: boolean,
  message?: string,
): asserts condition {
  if (!condition) throw Error(message);
}
