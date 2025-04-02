# CerraduraSoftware

Este proyecto es una simulación de una cerradura inteligente utilizando React para el frontend y Node.js con Socket.IO para el backend. Permite abrir y cerrar una cerradura virtual verificando la proximidad mediante un sistema de simulación de Bluetooth.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React.js (Create React App)
- **Backend:** Node.js con Express y Socket.IO
- **Estilos:** CSS

## 📦 Instalación

Clona este repositorio y navega al directorio del proyecto:

```sh
git clone https://github.com/tuusuario/CerraduraSoftware.git
cd CerraduraSoftware
```

Instala las dependencias:

```sh
npm install
```

## 🔧 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

El servidor backend también debe ejecutarse por separado en el puerto `3555`.

### `npm test`

Lanza el test runner en modo interactivo.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.

### `npm run eject`

**Nota:** Esta acción es irreversible. Remueve la configuración predeterminada de Create React App para control manual.

## 🔌 Conexión con el Backend

El backend de esta aplicación debe ejecutarse en paralelo. Asegúrate de iniciar el servidor antes de probar la funcionalidad de la cerradura.

Para ejecutar el backend:

```sh
cd backend
npm install
node server.js
```

## 📖 Más Información

Puedes aprender más sobre React en la [documentación oficial](https://reactjs.org/).

Para más detalles sobre Socket.IO, consulta [su documentación](https://socket.io/docs/).

---

© 2025 Internet de las Casas. Todos los derechos reservados.

