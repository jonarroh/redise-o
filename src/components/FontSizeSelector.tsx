import React from 'react';
import { fontSizeStore } from '../store/usabilityStore';

const FontSizeSelector: React.FC = () => {
  const setFontSize = (size: 16 | 18 | 24) => {
    fontSizeStore.set(size);
  };

  return (
    <div className="space-x-2 text-white">
      <button className="btn" onClick={() => setFontSize(16)}>
        Pequeña
      </button>
      <button className="btn" onClick={() => setFontSize(18)}>
        Mediana
      </button>
      <button className="btn" onClick={() => setFontSize(24)}>
        Grande
      </button>
    </div>
  );
};

export default FontSizeSelector;
