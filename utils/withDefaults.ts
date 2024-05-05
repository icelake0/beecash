export type WithDefaults<T extends Record<string, any>> = {
  [K in keyof T]-?: T[K];
};

export default function withDefaults<T extends Record<string, any>>(
  defaults: T,
  values: Partial<T>
): WithDefaults<T> {
  const result: T = {} as T;

  for (const key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      result[key] = values[key] !== undefined ? values[key]! : defaults[key];
    }
  }

  return result as WithDefaults<T>;
}
