# Evaluación II · Programación Web

Proyecto de la Evaluación II (UCA, Ciclo 02 2026). Dos ejercicios con Express en el backend y React + Vite + Reactstrap en el frontend.

- **Ejercicio 1 · Estabiliza el Reactor:** adivinar la temperatura de estabilización con `POST /adjust` y `POST /reboot`.
- **Ejercicio 2 · AstroLogistics Ltd.:** inventario, carga de la nave, presupuesto de 500 Créditos Galácticos y ventana de lanzamiento de 5 minutos.

## Equipo

| Integrante | Carnet |
| --- | --- |
| Carlos Flores | 00079225 |
| Alejandra Paola Orellana | 00108225 |
| César Fuentes | 00118825 |
| Diego Cruz | 00140725 |

## Requisitos

- Node.js 18 o superior (recomendado la versión LTS)
- npm (viene con Node.js)

## Cómo correrlo desde cero

```bash
git clone <url-del-repositorio>
cd <carpeta-del-repositorio>
npm install
npm run dev
```

`npm install` en la raíz instala también las dependencias de `backend/` y `frontend/` (script `postinstall`).
`npm run dev` levanta los dos servidores al mismo tiempo:

- Frontend (Vite): http://localhost:5173  ← abrir esta
- Backend (Express): http://localhost:3000

El frontend manda las peticiones `/api`, `/adjust` y `/reboot` al backend con el proxy de `vite.config.js`, así que no hace falta configurar CORS.

## Estructura

```
backend/
  server.js                  arranca el servidor
  app.js                     middlewares y rutas
  routes/                    reactorRoutes.js, misionRoutes.js
  controllers/               reactorController.js, misionController.js
  services/misionService.js  estado en memoria y reglas de negocio
  data/inventario.js         inventario inicial
frontend/
  vite.config.js             proxy hacia el backend
  src/api/                   http.js, reactorApi.js, misionApi.js
  src/components/            Reactor.jsx
  src/components/mision/     Mision, InfoMision, Catalogo, Bodega, Temporizador
```

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/adjust` | Recibe `{ temperatura }` y responde `más alta`, `más baja` o `estabilizado` |
| POST | `/reboot` | Genera una nueva temperatura de estabilización |
| GET | `/api/inventario` | Lista de suministros con precio y stock |
| GET | `/api/carga` | Créditos, items cargados y total |
| POST | `/api/carga/agregar` | Agrega `{ equipoId, cantidad }` a la nave |
| PUT | `/api/carga/actualizar-unidades/:id` | Cambia la cantidad de un suministro |
| DELETE | `/api/carga/eliminar/:id` | Quita el suministro y devuelve las unidades al stock |
| POST | `/api/carga/confirmar` | Confirma el equipo y bloquea el stock |
| POST | `/api/mision/reiniciar` | Reinicia la misión (inventario, carga y tiempo) |

## Flujo de trabajo con Git

GitFlow: cada integrante trabaja en una rama `feature/*`, se une a `develop` con pull request y al final `develop` se une a `main`.