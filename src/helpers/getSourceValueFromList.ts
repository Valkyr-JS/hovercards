/** Get a random string/number value from a potential comma-separated string list or
 * single number. */
export default function getSourceValueFromList(
  sources: string | number
): string | number {
  // Convert the sources into a list
  const values =
    typeof sources === "string"
      ? sources.split(",").map((v) => (isNaN(+v) ? v : +v))
      : [sources];

  // Choose a random source from the list
  const value = values[Math.floor(Math.random() * values.length)];
  const trimmed = typeof value === "string" ? value.trim() : value;

  return trimmed;
}
