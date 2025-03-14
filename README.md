# BackendCercaFood-Teheran-
Paso a paso para ejecutar el proyecto
Primer paso: Clona el repositorio del backend:
https://github.com/jatemast/BackendCercaFood-Teheran-.git

 
Copiar código
git clone https://github.com/jatemast/BackendCercaFood-Teheran-.git
Espera a que se clone el repositorio. Luego de que se clone, pega el archivo .env que dejé en el correo, el cual contiene la API Key de Google Places.

Después, ejecuta:

 
npm install
Luego, crea una base de datos en http://localhost/phpmyadmin/ con el nombre:
restaurant_db
Ejecuta las migraciones con este comando:

npx sequelize db:migrate
Esto creará las tablas en la base de datos.

Luego, inicia el proyecto con:

npm start
Ahí ya tendrías el backend funcionando a la perfección. Recuerda tener XAMPP con Apache en start y MySQL activo.

Ahora solo queda clonar el repositorio del frontend (está hecho en React):

 
git clone https://github.com/jatemast/FrontCercaFood-Teheran-.git
Luego, en la consola de Visual Studio ejecuta:
 
npm install
Espera a que se instalen todas las dependencias y luego ejecuta:
 
npm start
Ahora puedes probar el software:

Crea un usuario y luego inicia sesión.
Da permiso para la ubicación.
Según tu ubicación, se generará una lista de restaurantes cercanos en un radio de 1500 metros.
En el historial se almacenarán todos los restaurantes que aparecieron en el momento de la búsqueda junto con su ubicación aproximada.
