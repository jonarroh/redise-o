import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react'; // Usa el hook para suscribirte al store de Nanostores
import { fontSizeStore } from '../store/usabilityStore'; // Importa el store de tamaños de fuente

// Definir los tipos permitidos para el prop `as`
type TypographyElement = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'strong';

interface TypographyProps {
  as?: TypographyElement;
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ as = 'p', className = '', children }) => {
  const baseSize = useStore(fontSizeStore);

  useEffect(() => {
    console.log('Base size changed to:', baseSize);
  }, [baseSize]); // Dependencia para que el efecto se ejecute cuando `baseSize` cambie

  // Definir tamaños base en píxeles
  const baseSizeInPixels = `${baseSize}px`;
  const baseClasses = {
    h1: {
      fontSize: `${baseSize + 24}px`,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: `${baseSize + 16}px`,
      fontWeight: '600',
    },
    h3: {
      fontSize: `${baseSize + 8}px`,
      fontWeight: '500',
    },
    p: {
      fontSize: baseSizeInPixels,
    },
    span: {
      fontSize: `${baseSize - 4}px`,
    },
    strong: {
      fontSize: baseSizeInPixels,
      fontWeight: 'bold',
    },
  }[as || 'p']; // Fallback a párrafo si no se especifica

  // Aplicar el tamaño base global y las clases específicas
  const Component = as;

  return (
    <Component
      className={className}
      style={baseClasses} // Aplicar estilos en línea
    >
      {"el font-size actual es: " + baseSize}
      {children}
    </Component>
  );
};

export default Typography;
