export class DataProcessor {
  static cleanStrings(text: string): String {
    let cleanedText = text.trim();

    const allowedCharacters = /[.,;:!?¡¿]/;

    // Filtrar y mantener solo los caracteres permitidos
    cleanedText = cleanedText
      .split('')
      .filter((char) => char.match(/[a-zA-Z0-9\s]/) || char.match(allowedCharacters))
      .join('');

    return cleanedText;
  }
}
