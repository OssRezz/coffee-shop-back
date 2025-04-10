
# ☕ Coffee Shop API

Este proyecto es una API desarrollada con [NestJS](https://nestjs.com/) y [Prisma](https://www.prisma.io/) ORM, dockerizada para su despliegue en producción o uso local simplificado.

---

## Índice

- [Introducción](#introducción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Infraestructura](#infraestructura)
- [Análisis y Proceso de Desarrollo](#-análisis-y-proceso-de-desarrollo)
- [Pruebas](#pruebas)
- [Documentación de la API](#documentación-de-la-api)
- [Buenas Prácticas y Consideraciones](#-buenas-prácticas-y-consideraciones)

---

## Introducción

Coffee Shop Backend es una aplicación enfocada en la industria del café. Su propósito es gestionar toda la lógica necesaria para:

1. Crear regiones de los productos.
2. Crear tipos de productos (por ejemplo: café en grano).
3. Crear productos con información de su región y tipo de producto.
4. Manejo de inventarios con entradas y ventas.
5. Creación de clientes.
6. Integración con la pasarela de pagos Wompi para realizar pagos con tarjeta.

---

## Tecnologías Utilizadas

- NestJS
- Prisma
- PostgreSQL
- Docker
- NGINX
- AWS (EC2 + RDS)
- TypeScript
- Jest (para pruebas)

---

## Estructura del Proyecto

Este módulo implementa la arquitectura hexagonal (puertos y adaptadores), promoviendo la separación de responsabilidades, independencia del dominio y facilidad de pruebas.

---

### 📁 Estructura del Módulo

```
src/
└── modules/
    └── inventories/
        ├── application/                      # Capa de aplicación (casos de uso)
        │   ├── use-cases/                    # Lógica de orquestación de reglas de negocio
        │   │   ├── decrease-inventory.use-case.ts
        │   │   └── __test__/                 # Pruebas unitarias de los casos de uso
        │   │       └── decrease-inventory.use-case.spec.ts
        │
        ├── domain/                           # Capa del dominio (núcleo de la lógica)
        │   ├── entities/                     # Entidades del dominio (clases puras)
        │   │   └── inventory.entity.ts
        │   ├── ports/                        # Puertos: interfaces que definen la lógica a implementar
        │   │   └── inventory.repository.ts
        │
        ├── infrastructure/                   # Implementaciones concretas de adaptadores
        │   ├── prisma/                       # Adaptador a base de datos con Prisma
        │   │   └── inventory.prisma.repository.ts
        │
        ├── interfaces/                       # Interfaces externas (API, DTOs)
        │   ├── controllers/                  # Controladores HTTP que exponen los endpoints
        │   │   ├── inventory.controller.ts
        │   │   └── __test__/                 # Pruebas de los controladores
        │   │       └── inventory.controller.spec.ts
        │   └── dto/                          # Objetos de transferencia de datos (DTOs)
        │       ├── create-inventory.dto.ts
        │       └── __test__/                 # Pruebas de validaciones o transformaciones de DTOs
        │           └── create-inventory.dto.spec.ts
        │
        └── inventory.module.ts               # Declaración del módulo en NestJS
```

---

### 📚 Explicación por Carpeta

#### `application/`

Contiene los **casos de uso** del módulo. Esta capa orquesta la lógica del dominio (como disminuir inventario), sin depender de la infraestructura.

#### `domain/`

Aquí vive la lógica central del negocio, independiente de frameworks o tecnologías externas. Define:

- `entities/`: Clases que representan conceptos del dominio (como `Inventory`).
- `ports/`: Interfaces (puertos) que declaran lo que se necesita hacer, sin importar cómo se implementa (por ejemplo, `InventoryRepository`).

#### `infrastructure/`

Contiene las **implementaciones concretas** que responden a los puertos definidos en el dominio, como conexiones a bases de datos con Prisma o el Gateway de Wompi.

#### `interfaces/`

Representa los adaptadores que conectan la aplicación con el mundo exterior:

- `controllers/`: Controladores HTTP (NestJS) que reciben peticiones y delegan en casos de uso.
- `dto/`: Define la estructura de los datos que se reciben o envían por HTTP.

#### `inventory.module.ts`

Archivo que declara e integra todas las piezas del módulo (`providers`, `controllers`, etc.) dentro del ecosistema NestJS.

---

## Ejecución de la Aplicación

Esta API puede ejecutarse tanto en **entornos locales de desarrollo** como en **entornos de producción** mediante Docker. A continuación, se detallan ambos procesos:

---

### 🔧 Ejecución en Desarrollo (Local)

En desarrollo, se recomienda **no utilizar Docker** para facilitar el uso de herramientas como hot reload, debugging y pruebas en tiempo real. Los pasos para levantar la app en desarrollo son los siguientes:

#### 1. Requisitos

- Node.js (v20+ recomendado)
- npm
- [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference)
- Nest CLI (opcional)
- PostgreSQL en local (o acceso a una base de datos)

#### 2. Clonar el repositorio y configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` según tu entorno local:

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
WOMPI_API_URL=https://sandbox.wompi.co/v1
WOMPI_PUBLIC_KEY=pk_test_xxx
WOMPI_PRIVATE_KEY=pr_test_xxx
WOMPI_INTEGRITY_KEY=int_xxx
PORT=3000
```

#### 3. Instalar dependencias

```bash
npm install
```

#### 4. Aplicar migraciones y generar Prisma client

```bash
npx prisma migrate dev
npx prisma generate
```

#### 5. Ejecutar la aplicación

```bash
npm run start:dev
```

---

### 🚀 Ejecución en Producción (usando Docker)

Para producción, se utiliza Docker para facilitar el despliegue, manteniendo carpetas persistentes como `uploads/` y `logs/`.

#### Estructura de `docker-compose.yml`

```yaml
services:
  backend:
    build: .
    container_name: coffee-shop-backend
    ports:
      - "4002:3000"
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    env_file:
      - .env
```

#### Comando para levantar la app

```bash
docker-compose up --build
```

---

## Infraestructura

El despliegue de la API se realiza sobre servicios de AWS:

- 🖥️ **EC2**: Contiene el contenedor Docker de la API, así como NGINX como servidor de reverse proxy.
- 🛢️ **RDS**: Servicio de base de datos PostgreSQL gestionado.
- 🌐 **NGINX**: Configurado para redirigir el tráfico externo al contenedor de NestJS que corre en EC2, con reglas de redireccionamiento y seguridad.

La carpeta `uploads/` y los archivos de logs están montados como volúmenes en el contenedor, lo que permite persistencia incluso tras reinicios del contenedor.

---

## 🧠 Análisis y Proceso de Desarrollo

Al recibir la prueba técnica, realicé un análisis de los requerimientos. Entendiendo que se trataba de una tienda, decidí enfocarla en un contexto específico: una tienda de café. Por esta razón, nombré el proyecto **"Coffee Shop"**.

![Diagrama de entidades](docs/Mer Coffee shop.drawio.png)

Como primer paso, diseñé un diagrama en **draw.io** donde modelé las entidades y sus relaciones. Como valor agregado, creé dos tablas adicionales: `region` (para representar la región del café) y `product_type` (para definir si el café es en grano, cápsulas, etc.).

Analizando el flujo de la app, consideré innecesario implementar un sistema de autenticación, pero sí desarrollé una lógica para identificar al cliente al momento de una compra: si su número de identificación ya existe en la base de datos, se reutiliza; en caso contrario, se crea un nuevo registro. También agregué un campo `address` en la tabla `sales`, para poder registrar diferentes direcciones de entrega asociadas a un mismo cliente.

En cuanto a la gestión de inventario, implementé un flujo donde las **entradas** aumentan las unidades disponibles y las **ventas** las disminuyen. Esto garantiza trazabilidad y consistencia en el stock.

Para el manejo de pagos, integré **Wompi**. Una transacción puede no ser aprobada, por lo que asocié al cliente con la tabla `transactions`, la cual a su vez puede (o no) estar relacionada con una venta. En la tabla `sales`, el campo `transaction_id` es **nullable**, ya que si el pago no es exitoso, no se registra la venta ni sus productos, lo cual evita afectar el inventario.

> 💡 *Una posible mejora futura sería crear un estado inicial "pendiente", y a través de un webhook completar el flujo si la transacción se aprueba, pero por limitaciones de tiempo no lo implementé.*

---

### 🧱 Diseño Arquitectónico

Luego del diseño funcional, pasé a estructurar la aplicación usando **arquitectura hexagonal**, segmentando el código en capas de `domain`, `application`, `interfaces` e `infrastructure`. Esta separación permite una mejor mantenibilidad, testeo y escalabilidad.

También implementé **interceptores**, **filters** y funciones comunes para estandarizar las respuestas de la API. De esta forma, sin importar el error, la estructura de la respuesta es siempre la misma:

```ts
{
  success: false,
  code: 404,
  message: "Product with id 3 not found",
  data: null
}
```

Esto brinda una experiencia de consumo de API más predecible. Además, se implementó un sistema de logs con WinstonLogger para almacenar errores en un archivo de texto.

---

### 🛠️ Construcción y Retos

La base de datos fue creada con **Prisma**, basada en el modelo inicial. Utilicé `enum` para representar estados de manera tipada y segura.

Finalmente, comencé a implementar las funcionalidades por módulos. Uno de los desafíos más grandes fue el módulo de `transactions`, donde se debía **orquestar todo el flujo de una venta**, validando el estado de pago y creando la venta solo si la transacción es exitosa.

Para esto, diseñé un caso de uso llamado `purchase-order`, que encapsula toda la lógica de:

- Validación o creación del cliente
- Interacción con Wompi
- Verificación del estado de la transacción
- Creación de la venta y sus detalles
- Actualización del inventario

---

## Pruebas

Este proyecto cuenta con una cobertura completa de **pruebas unitarias** en los componentes clave del sistema. Se utilizó el framework [Jest](https://jestjs.io/) junto con las herramientas de testing de NestJS (`@nestjs/testing`) para simular dependencias y validar la lógica de manera aislada.

---

### ✅ Cobertura de pruebas

Se realizaron pruebas unitarias en los siguientes componentes:

- 🧠 **Casos de uso (use-cases)**: Verificación de la lógica central de negocio en cada módulo.
- 📦 **Controllers**: Validación de la conexión entre las rutas HTTP y los casos de uso, asegurando las respuestas esperadas.
- 🛡️ **DTOs**: Comprobación de reglas de validación con decoradores de clase.
- 🧰 **Helpers**: Utilidades comunes probadas para garantizar su correcto funcionamiento.
- 🛰️ **Interceptors y Filters**: Pruebas sobre interceptores personalizados y filtros de excepción.
- 📓 **Logger**: Validación del logger central para asegurar su correcto comportamiento y formato de salida.

---

### ⚙️ Ejecución de pruebas

Puedes ejecutar las pruebas con los siguientes comandos:

```bash
npm run test           # Ejecuta todos los tests unitarios
npm run test:watch     # Ejecuta en modo watch
npm run test:cov       # Ejecuta pruebas y muestra reporte de cobertura
```

---

### 📊 Resultado

Todos los tests fueron ejecutados exitosamente ✅ y la cobertura de pruebas garantiza confiabilidad sobre las partes críticas del sistema. Esto permite escalar y refactorizar con confianza.

---

## Documentación de la API

La documentación de los endpoints de esta API se encuentra organizada en una colección de **Postman** que contiene todos los recursos disponibles.

---

### 🔗 Acceso a la colección Postman

La colección está organizada por carpetas y utiliza una variable global `{{APP_URL}}`, la cual puedes configurar según tu entorno (`http://localhost:3000`, `http://localhost:4002`, etc.).

> Puedes importar la colección `.postman_collection.json` en tu Postman para comenzar a probar todos los endpoints disponibles.

📎 Puedes encontrar la colección Postman en [`docs/coffee-shop-api.postman_collection.json`](./docs/coffee-shop-api.postman_collection.json)

---

### 📂 Organización de Endpoints

#### 📥 Variables de entorno para Postman

La variable `APP_URL` se encuentra como variable de entorno, una vez puesto el backend en produccion o desarollo local, debemos definir el valor correcto de esta:

```text
APP_URL = http://localhost:3000
```

Esto permite mantener la colección flexible para entornos locales, staging o producción.

---

#### 🌍 Regions

> Para crear una region usamos body/raw

- `GET /regions` - Obtener todas las regiones
- `GET /regions/:id` - Obtener una región por ID
- `POST /regions` - Crear una nueva región

---

#### 🏷️ Product Types

> Para crear un tipo de producto usamos body/raw

- `GET /product-types` - Obtener todos los tipos de productos
- `GET /product-types/:id` - Obtener un tipo de producto por ID
- `POST /product-types` - Crear un nuevo tipo de producto

---

#### 🛒 Products

> Para crear/actualizar productos usamos el body/form-data, esto porque el producto el controlador reciba una imagen, la cual no es requerida.

- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener un producto por ID
- `POST /products` - Crear un producto
- `PUT /products/:id` - Actualizar un producto

---

#### 📦 Inventories

> Para usar los endpoints de increase/decrease usamos el body/raw.

- `GET /inventories` - Obtener el estado del inventario
- `POST /inventories/increase` - Incrementar unidades de un producto
- `POST /inventories/decrease` - Disminuir unidades de un producto

---

#### 🧾 Entries

> Para usar el endpoint POST  usamos el body/raw.

- `GET /entries` - Ver entradas al inventario
- `POST /entries` - Registrar una entrada

---

#### 👤 Customers

> Para usar el endpoint POST  usamos el body/raw.

- `GET /customers` - Obtener todos los clientes
- `GET /customers/document/:document` - Obtener cliente por documento
- `POST /customers` - Crear un nuevo cliente

---

#### 💳 Wompi API (externa, directa)

Endpoints de prueba directamente hacia la API de Wompi:

- Obtener `acceptance_token`
- Obtener `card_token`
- Crear transacción
- Consultar estado de transacción

---

#### 🔌 Transactions / Wompi API (gateway interno)

Estos endpoints pasan por el **gateway interno de la app** que se comunica con Wompi:

> Estos endpoints no son usados externamente por ningún servicio, se crea con el objetivo de hacer pruebas.

- `POST /transactions/tokenize ` -> Endpoint para tokenizar una tarjeta y obtener el id (token)
- `GET /transactions/acceptance-tokens` -> Endpoint para obtener general y personal tokens
- `POST /transactions/create` -> Endpoint para crear una transacción usando los tokens de tokenize y acceptance-tokens
- `GET /transactions/:transactionId (La que retorna Wompi) ` ->Obtener el estado de una transacción

---

#### 💼 Transactions (proceso completo de compra)

> Para usar el endpoint POST  usamos el body/raw.

- `POST /transactions/checkout` - Orquesta todo el flujo de una venta: cliente, transacción, venta, productos e inventario.
- `GET /transactions/:transactionId` - Obtener una transacción desde la base de datos de la aplicación

---

## 🧠 Buenas Prácticas y Consideraciones

#### 🔐 Seguridad

- Se implementó validación estricta en todos los DTOs para evitar datos malformados.
- La comunicación con **Wompi** se realiza a través de un gateway, encapsulando la lógica y ocultando las llaves privadas.
- Las variables sensibles están gestionadas desde archivos `.env` y nunca se suben al repositorio (`.env` está en `.gitignore`).
- Las rutas relacionadas con pagos y transacciones están protegidas de accesos innecesarios y no exponen detalles internos.

#### 📈 Escalabilidad

- La arquitectura **hexagonal** permite escalar la aplicación fácilmente al agregar nuevos módulos sin acoplar lógica de negocio con infraestructura.
- Cada módulo tiene su propio conjunto de casos de uso, controladores e implementación, lo que permite mantener bajo acoplamiento y alta cohesión.
- Se puede extender el sistema de inventario, métodos de pago o tipos de productos sin afectar el núcleo.

#### ⚙️ Manejo de errores

- Se implementaron **interceptors** y **filtros globales** para capturar errores y asegurar respuestas uniformes.
- Todos los errores se devuelven con una estructura clara:

```json
{
  "success": false,
  "code": 404,
  "message": "Resource not found",
  "data": null
}
```

Esto permite a los clientes de la API interpretar fácilmente cualquier error.

#### ✅ Validaciones

- Todos los DTOs utilizan decoradores de `class-validator` para garantizar datos válidos antes de llegar a los casos de uso.
- Se reutilizan reglas de validación para evitar duplicación de lógica.

#### 📦 Organización del proyecto

- Uso de nombres claros y convenciones consistentes para archivos, rutas y funciones.
- Separación de responsabilidades clara entre dominio, aplicación, infraestructura e interfaces.

#### 📄 Documentación y pruebas

- Toda la API está documentada en una colección Postman organizada.
- Se implementaron pruebas unitarias para casos de uso, controladores, DTOs, helpers e interceptores.
