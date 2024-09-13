import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals } = context;
  

  // Verifica si ya existe la cookie 'userPreference'
  const userPreference = cookies.get('userPreference');
  console.log('userPreference', userPreference);
  if (!userPreference) {
    // Si no existe, establece una preferencia predeterminada
    const defaultPreferences = {
      theme: 'light',
      fontSize: 16,
    };

    // Guarda las preferencias en cookies
    cookies.set('userPreference', JSON.stringify(defaultPreferences));

    // Guarda las preferencias en `locals`
    locals.userPreference = defaultPreferences;
  }

  return next();
});
