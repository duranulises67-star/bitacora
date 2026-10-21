# Valoración formativa: app instalable

App para registrar valoraciones, proyectos (PPA) y fichas descriptivas.

- Se instala en el celular y en la computadora.
- Funciona sin internet.
- Guarda tus datos en tu propio Google Drive, en la carpeta **«Bitácora app»**.

Los datos de los alumnos **no** se guardan en este repositorio. Viven en tus dispositivos y en tu Google Drive. Aquí solo está el programa.

La configuración se hace **una sola vez** y lleva unos 30 minutos.

---

## Parte A. Publicar la app en GitHub Pages

1. Entra a [github.com](https://github.com) con tu cuenta. Arriba a la derecha toca **+** y luego **New repository**.
2. Llena el formulario:
   - En **Repository name** escribe `bitacora`.
   - Deja marcada la opción **Public**. GitHub Pages gratuito solo funciona con repositorios públicos, pero tus datos no quedan aquí.
   - Toca **Create repository**.
3. En la página del repositorio toca **uploading an existing file**.
4. Arrastra **todos** los archivos de esta carpeta: `index.html`, `sw.js`, `manifest.webmanifest`, `config.js`, `icono-192.png`, `icono-512.png` y `README.md`. Luego toca **Commit changes**.
5. Ve a **Settings → Pages**:
   - En **Source** elige **Deploy from a branch**.
   - En **Branch** elige `main` y la carpeta `/ (root)`.
   - Toca **Save**.
6. Espera 1 o 2 minutos. Tu app quedará en
   `https://TU-USUARIO.github.io/bitacora/`
   Cambia *TU-USUARIO* por tu nombre de usuario de GitHub.

## Parte B. Dar permiso para usar Google Drive (Google Cloud)

Usa la misma cuenta de Google donde quieres guardar los datos. Con una cuenta institucional (por ejemplo, de la SEP) quizá no te deje crear proyectos; en ese caso usa una cuenta Gmail personal.

1. Entra a [console.cloud.google.com](https://console.cloud.google.com). Si es la primera vez, acepta los términos.
2. **Crea el proyecto:**
   - Arriba toca el selector de proyectos y luego **Proyecto nuevo**.
   - Como nombre escribe `Bitacora` y toca **Crear**.
   - Asegúrate de que quede seleccionado.
3. **Activa Drive:**
   - Abre el menú ☰ y ve a **APIs y servicios → Biblioteca**.
   - Busca **Google Drive API** y toca **Habilitar**.
4. **Configura la pantalla de permiso.** En el menú ☰ abre **Google Auth Platform**; en algunas cuentas se llama «Pantalla de consentimiento de OAuth». Toca **Comenzar** y llena:
   - **Nombre de la app:** `Bitácora`.
   - **Correo de asistencia:** tu correo.
   - **Público:** **Externo**.
   - **Información de contacto:** tu correo.
   - Acepta la política y toca **Crear**.
5. **Agrega a los usuarios de prueba:**
   - En el menú de la izquierda abre **Público** y busca **Usuarios de prueba**.
   - Toca **Add users** y escribe tu correo.
   - Toca **Guardar**.
6. **Crea el ID de cliente:**
   - En el menú de la izquierda abre **Clientes** y toca **Crear cliente**.
   - En **Tipo de aplicación** elige **Aplicación web**. Como nombre escribe `Bitácora web`.
   - En **Orígenes autorizados de JavaScript** toca **Agregar URI** y escribe
     `https://TU-USUARIO.github.io`
     Escríbelo solo así: sin `/bitacora` y sin diagonal al final.
   - Toca **Crear**.
7. Copia el **ID de cliente**. Termina en `.apps.googleusercontent.com`.

## Parte C. Conectar la app con tu Drive

1. En GitHub abre el archivo `config.js`, toca el lápiz ✏️ (**Edit**) y pega tu ID entre las comillas:
   ```js
   window.BITACORA_CLIENT_ID = '123456789-abc.apps.googleusercontent.com';
   ```
   Luego toca **Commit changes**.
2. Espera 1 o 2 minutos y abre `https://TU-USUARIO.github.io/bitacora/`. Si ya la habías abierto, recarga la página dos veces.
3. Toca **Conectar con Google Drive** y elige tu cuenta.
   - Google mostrará «Google no verificó esta app». Es normal, porque la app es tuya: toca **Continuar**.
   - Después autoriza el acceso.
   - La app solo puede ver los archivos que ella misma crea en tu Drive.

## Parte D. Instalarla

- **Celular Android (Chrome):** abre la dirección y en el menú ⋮ toca **Instalar aplicación** o **Agregar a la pantalla principal**.
- **Computadora (Chrome o Edge):** toca el ícono de instalar que aparece en la barra de direcciones, o en el menú elige **Instalar Bitácora**.
- **iPhone (Safari):** toca **Compartir → Agregar a inicio**. Funciona, aunque la conexión con Drive puede pedir confirmación con más frecuencia.

En cada dispositivo conecta la **misma cuenta** de Google. Al abrir la app se cargan los datos más recientes.

## Uso diario

- **Guardado automático:** cada cambio se guarda solo en Drive, unos segundos después. Arriba aparece «Guardado» con la hora.
- **Sin internet:** sigue capturando. Los cambios se suben a Drive cuando vuelve la conexión.
- **Sesión vencida:** si pasa un rato sin usarla, Google pide confirmar de nuevo. Toca **Sincronizar con Drive**.
- **Un dispositivo a la vez:** antes de abrir la app en otro, espera a que diga «Guardado». Si hay dos versiones distintas, la app te pregunta cuál conservar y guarda la otra como copia, así que no se pierde nada.
- **Copias diarias:** cada día se guarda una copia en `Bitácora app/Respaldos`. Se conservan los últimos 30 días.

## Pasar los datos que ya tienes

1. En la versión anterior, ya sea la de claude.ai o la del archivo sin internet, ve a **Ajustes → Descargar respaldo (JSON)**.
2. En la app instalada ve a **Ajustes → Restaurar respaldo…** y elige ese archivo.
3. Luego toca **Conectar con Google Drive**.

## Actualizar la app

Cuando recibas una versión nueva, sube a GitHub los archivos `index.html` y `sw.js` para reemplazar los anteriores. **No reemplaces `config.js`**, porque ahí está tu ID. La app se actualiza sola la segunda vez que la abras.
