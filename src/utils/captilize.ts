export function capitalizeFirstLetter(input: string): string {
  if (!input) return input; // Return as-is if the input is empty or null
  return input.charAt(0).toUpperCase() + input.slice(1);
}
