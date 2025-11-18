// utils/validators.ts

// Validar que un campo no esté vacío
export function required(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim().length > 0;
}

// Validar email
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// Validar contraseña mínima de 6 caracteres
export function minLength(value: string, length: number = 6): boolean {
  return value.length >= length;
}

// Validar números positivos
export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && value > 0;
}

// Validar solo letras
export function onlyLetters(value: string): boolean {
  return /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value);
}

// Validar solo números
export function onlyNumbers(value: string): boolean {
  return /^[0-9]+$/.test(value);
}
