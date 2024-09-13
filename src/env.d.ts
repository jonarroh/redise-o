/// <reference path="../.astro/types.d.ts" />

// Extender el tipo Locals para agregar la propiedad 'userPreference'
declare namespace App {
  interface Locals {
    userPreference: {
      theme: string;
      fontSize: number;
    };
  }
}
