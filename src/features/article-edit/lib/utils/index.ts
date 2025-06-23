export function getSelectOptionsFromEnum(
  options: Record<string, string>
): { value: string; label: string }[] {
  return Object.entries(options).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}
