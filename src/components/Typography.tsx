// src/components/Typography.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react'; // Usa el hook para suscribirte al store de Nanostores
import { fontSizeStore, type FontSize } from '../store/usabilityStore'; // Importa el store de tamaños de fuente

// Definir los tipos permitidos para el prop `as`
type TypographyElement = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'strong';

interface TypographyProps {
  as?: TypographyElement;
  className?: string;
  children: React.ReactNode;
  initialFontSize: FontSize; // Prop para el tamaño de fuente inicial
}

const Typography: React.FC<TypographyProps> = ({ as = 'p', className = '', children, initialFontSize }) => {
  const baseSize = useStore(fontSizeStore);
  const [size, setSize] = useState<number>(initialFontSize);

  // Efecto para establecer el tamaño inicial y actualizar el tamaño del store
  useEffect(() => {
    setSize(baseSize);
  }, [initialFontSize, baseSize]);

  // Definir tamaños base en píxeles
  const baseSizeInPixels = `${size}px`;
  const baseClasses = {
    h1: {
      fontSize: `${size + 24}px`,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: `${size + 16}px`,
      fontWeight: '600',
    },
    h3: {
      fontSize: `${size + 8}px`,
      fontWeight: '500',
    },
    p: {
      fontSize: baseSizeInPixels,
    },
    span: {
      fontSize: `${size - 4}px`,
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
      {"el font-size actual es: " + size}
      {children}
    </Component>
  );
};

export default Typography;
