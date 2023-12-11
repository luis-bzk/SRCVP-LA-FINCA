export const generatePassword = (): string => {
  const specialCharacters = '!@#$%^&*()_-+=<>?/[]{}|';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = lowercaseLetters.toUpperCase();
  const numbers = '0123456789';

  let password = '';

  password += getRandomCharacter(lowercaseLetters);
  password += getRandomCharacter(uppercaseLetters);
  password += getRandomCharacter(numbers);
  password += getRandomCharacter(specialCharacters);

  const longitudDeseada = 10;
  const caracteresRestantes = longitudDeseada - password.length;

  for (let i = 0; i < caracteresRestantes; i++) {
    const opciones = lowercaseLetters + uppercaseLetters + numbers + specialCharacters;
    password += getRandomCharacter(opciones);
  }

  return password;
};

const getRandomCharacter = (str: string): string => {
  const randomIndex = Math.floor(Math.random() * str.length);
  return str[randomIndex];
};
