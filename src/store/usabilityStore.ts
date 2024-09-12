import { persistentAtom } from '@nanostores/persistent';
import Cookies from 'js-cookie';

// Definir el tipo de tamaño de fuente permitido
export type FontSize = 16 | 18 | 20 | 24 | 32;

// Leer el tamaño de la fuente desde las cookies, si existe
const storedFontSize = Cookies.get('fontSize');
const initialFontSize: FontSize = storedFontSize ? JSON.parse(storedFontSize) : 16;

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

// Efecto secundario para actualizar la cookie cuando el valor cambie
fontSizeStore.subscribe((value) => {
  Cookies.set('fontSize', JSON.stringify(value), { expires: 365 });
});
