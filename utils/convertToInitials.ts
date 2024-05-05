export default function convertToInitials(
  firstName: string,
  lastName: string
): string {
  // Get initials
  const initials = [firstName[0], lastName[0]]
    .filter((name) => name) // Remove empty strings
    .map((name) => name.toUpperCase()) // Convert to uppercase
    .join(""); // Concatenate initials

  return initials;
}
