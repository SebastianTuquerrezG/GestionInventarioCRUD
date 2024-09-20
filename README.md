# Sistema de Gestion de Inventario

Este es la arquitectura de backend que proporciona los endpoints para la administracion de inventario usando **Node.JS**, **TypeScript**, **TypeORM**, **Express** and **MySQL**. La aplicacion permite el manejo de productos, monitorear el nivel de stock, y el flujo de movimiento de los productos.

En el backend, se ha utilizado una arquitectura cebolla o onion architecture, que divide la lógica en capas bien definidas y facilita la separación de responsabilidades. Esta arquitectura tiene las siguientes capas:

## Product_core:

* Entidades: Aquí se definen los modelos que representan los datos de nuestra aplicación. Por ejemplo, la entidad Product representa un producto en la base de datos.
* Interfaces de repositorio: Se definen interfaces que representan cómo interactuar con los datos (CRUD), pero no se implementan aquí, lo que permite mayor flexibilidad.

## Product_infrastructure:

* Controladores: Son los puntos de entrada de la API. Reciben las solicitudes HTTP, se las pasan a los servicios, y devuelven respuestas al cliente.
* Adaptadores de persistencia (TypeORM): Implementan la lógica de acceso a la base de datos usando TypeORM. Aquí es donde las interfaces de repositorio del Product_core se implementan realmente.

## Product_service:

* Servicios: Contienen la lógica de negocio. Los controladores se comunican con los servicios para realizar acciones de más alto nivel, como la creación o modificación de productos. Los servicios a su vez utilizan los repositorios de persistencia.
* Interfaces de servicios: Definen cómo los servicios deben comportarse y cuáles son las operaciones disponibles para los controladores.

## Ventajas de esta arquitectura:
* Desacoplamiento: Las capas están bien desacopladas. Si deseas cambiar el framework de base de datos, solo tendrías que modificar la capa de infraestructura.
* Escalabilidad: Las capas independientes facilitan la adición de nuevas características.
* Facilidad para escribir tests: Como las capas están separadas, se pueden escribir tests unitarios para cada una sin necesidad de probar todo el sistema.

## Caracteristicas

- **Gestion de Productos:** Add, edit, and delete products.
- **Monitoreo de Stock:** View current stock levels and receive alerts when stock is low.
- **Historial de Inventario:** Track the history of inventory movements (stock in/out).
- **Buscar y Filtrar:** Easily search and filter products by different attributes.

## Stack de Tecnologias

- **Backend:**
  - Next.js API routes (for server-side logic)
  - Node.js
  - Express (optional for more complex routing and middleware)
  - TypeORM 
  - CORS 

- **Database:**
  - MySQL

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MySQL (v8 or later)

### Installation and Ejecution

1. **Clone the repository:**

   ```bash
   git clone git@github.com:SebastianTuquerrezG/GestionInventarioCRUD.git
   cd Backend
   ```
   
  2. **Instalar dependencias:**
      ```
      npm install
      npm i --save-dev @types/cors
      ```
  3. **Ejecutar servidor:**
      ```
      npx ts-node src/server.ts
      ```
