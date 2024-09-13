import { persistentAtom } from '@nanostores/persistent';
import Cookies from 'js-cookie';

// Definir el tipo de tamaño de fuente permitido
export type FontSize = 16 | 18 | 20 | 24 | 32;

// Leer la cookie 'userPreference' para obtener el tamaño de fuente
const userPreferenceCookie = Cookies.get('userPreference');
let initialFontSize: FontSize = 16;

if (userPreferenceCookie) {
  try {
    const userPreference = JSON.parse(userPreferenceCookie);
    // Verificar si el tamaño de fuente es válido
    if ([16, 18, 20, 24, 32].includes(userPreference.fontSize)) {
      initialFontSize = userPreference.fontSize;
    }
  } catch (e) {
    console.error('Error al parsear la cookie userPreference:', e);
  }
}

// Crear un atom persistente para almacenar el tamaño de la fuente en cookies
export const fontSizeStore = persistentAtom<FontSize>('fontSize', initialFontSize, {
  encode(value) {
    // Solo devolver el valor serializado
    return JSON.stringify(value);
  },
  decode(value) {
    try {
      // Decodificar el valor almacenado en las cookies
      return JSON.parse(value) as FontSize;
    } catch (e) {
      return 16; // Valor predeterminado en caso de error
    }
  },
});

// Efecto secundario para actualizar la cookie 'userPreference' cuando el valor cambie
fontSizeStore.subscribe((value) => {
  const userPreferenceCookie = Cookies.get('userPreference');
  let userPreference = { theme: 'light', fontSize: 16 }; // Valores por defecto

  if (userPreferenceCookie) {
    try {
      userPreference = JSON.parse(userPreferenceCookie);
    } catch (e) {
      console.error('Error al parsear la cookie userPreference:', e);
    }
  }

  // Actualizar el tamaño de fuente en la cookie 'userPreference'
  userPreference.fontSize = value;
  Cookies.set('userPreference', JSON.stringify(userPreference), { expires: 365 });
});
