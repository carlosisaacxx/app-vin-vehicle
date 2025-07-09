export const VIN_LENGTH = 17;

// Valida que sea un VIN válido, exactamente 17 caracteres, sin I/O/Q
export function isValidVin(text: string) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(text.toUpperCase());
}

// Limpia y normaliza el VIN: quita inválidos y trunca a 17
export function cleanVin(input: string) {
  return input
    .toUpperCase()
    .replace(/[^A-HJ-NPR-Z0-9]/g, '') // solo válidos
    .slice(0, VIN_LENGTH);
}