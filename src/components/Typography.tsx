// Importa las dependencias necesarias
import { useEffect, useState } from 'react';
import { persistentAtom } from '@nanostores/persistent';
import Cookies from 'js-cookie';

// Define los tipos permitidos para fontSize
export type FontSize = 16 | 18 | 20 | 24 | 32;

// Crear un atom persistente para almacenar el tamaño de la fuente en cookies
export const fontSizeStore = persistentAtom<FontSize>('fontSize', 16, {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    try {
      return JSON.parse(value) as FontSize;
    } catch (e) {
      return 16; // Valor predeterminado en caso de error
    }
  },
});

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

  userPreference.fontSize = value;
  Cookies.set('userPreference', JSON.stringify(userPreference), { expires: 365 });
});

// Define las propiedades que el componente acepta
interface TypographyProps {
  initialFontSize: FontSize;
}

const Typography = ({ initialFontSize }: TypographyProps) => {
  // Inicializa el estado con el valor recibido como prop
  const [fontSize, setFontSize] = useState<FontSize>(initialFontSize);

  // Sincroniza el store con el valor inicial
  useEffect(() => {
    fontSizeStore.set(initialFontSize);
  }, [initialFontSize]);

  // Efecto secundario para actualizar la cookie cuando el valor cambia
  useEffect(() => {
    const unsubscribe = fontSizeStore.subscribe((value) => {
      const userPreferenceCookie = Cookies.get('userPreference');
      let userPreference = { theme: 'light', fontSize: 16 }; // Valores por defecto

      if (userPreferenceCookie) {
        try {
          userPreference = JSON.parse(userPreferenceCookie);
        } catch (e) {
          console.error('Error al parsear la cookie userPreference:', e);
        }
      }

      // Actualiza el tamaño de fuente en la cookie 'userPreference'
      userPreference.fontSize = value;
      Cookies.set('userPreference', JSON.stringify(userPreference), { expires: 365 });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>El font-size actual es: {fontSize}</h1>
    </div>
  );
};

export default Typography;
