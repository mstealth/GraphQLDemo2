# TRABAJO DIPLOMADO - GraphQL

## Explicación de la Aplicación

Esta aplicación es una API GraphQL que utiliza **TypeScript**, **SQLite**, y **TypeORM** para gestionar datos relacionados con **autores** y **libros**. La API permite realizar operaciones como:

1.  **Agregar autores y libros** (mutaciones).
2.  **Consultar autores y sus libros**.
3.  **Consultar libros y sus autores**.

El objetivo principal de la aplicación es demostrar cómo estructurar un proyecto escalable y mantenible utilizando patrones de diseño comunes en el desarrollo de software.

## GraphQL
El uso de **GraphQL** en esta aplicación proporciona varias ventajas significativas en comparación con una API REST tradicional. Estas ventajas mejoran la experiencia tanto del desarrollador como del usuario final. A continuación, se enumeran las principales:

### **1. Consultas Personalizables**

Con GraphQL, los clientes pueden solicitar exactamente los datos que necesitan, nada más y nada menos. Esto se traduce en:

-   **Optimización de datos**: Evita la sobrecarga de datos (overfetching) y la falta de datos (underfetching).
-   Por ejemplo, un cliente puede solicitar solo el título de un libro y el nombre de su autor:
~~~graphql
query {
  books {
    title
    author {
      name
    }
  }
}
~~~
### **2. Resolución de Relaciones Complejas**

GraphQL maneja fácilmente relaciones entre entidades, como la relación entre autores y libros en esta aplicación. Esto permite:

-   **Consultas jerárquicas**: Los clientes pueden recuperar datos relacionados en una sola solicitud.
-   Por ejemplo:
~~~graphql
query {
  authors {
    name
    books {
      title
    }
  }
}
~~~
Esto evita múltiples solicitudes o la creación de endpoints REST específicos para relaciones.

### **3. Un Único Endpoint**

Toda la funcionalidad de la API (consultas y mutaciones) está disponible a través de un solo endpoint (`/graphql`). Esto simplifica:

-   La configuración del cliente.
-   La documentación, ya que el esquema de GraphQL actúa como una fuente centralizada para entender las capacidades de la API.
### **4. Esquema Tipado y Auto-Documentado**

El esquema de GraphQL define explícitamente los tipos de datos y sus relaciones. Esto proporciona:

-   **Documentación en tiempo real**: Herramientas como **Apollo Studio** permiten explorar el esquema y probar operaciones sin necesidad de documentación externa.
-   **Validación automática**: GraphQL valida las consultas y mutaciones según el esquema, reduciendo errores en las solicitudes.

### **5. Flexibilidad para Extender la API**

Agregar nuevas funcionalidades, como nuevas entidades o campos, no rompe la compatibilidad con los clientes existentes:

-   Por ejemplo, si se agrega una entidad "Editorial", el esquema se puede extender fácilmente sin afectar las consultas actuales:
~~~graphql
type Publisher {
  id: ID!
  name: String!
  books: [Book!]!
}
~~~
### **6. Mejor Herramienta para Datos Relacionados**

Para esta aplicación, donde hay una relación clara entre **autores** y **libros**, GraphQL es ideal porque permite:

-   Consultar y mutar datos relacionados en una estructura jerárquica.
-   Resolver eficientemente relaciones sin necesidad de crear endpoints adicionales.
 
### **7. Reducción de Carga en el Cliente**

Al permitir al cliente definir qué datos necesita, GraphQL evita el procesamiento adicional para filtrar o estructurar datos en el cliente. Esto es especialmente beneficioso para aplicaciones móviles o con ancho de banda limitado.

### **8. Desarrollo Simplificado**

Con herramientas como **Apollo Server**, implementar y estructurar la API es rápido y limpio:

-   **Resolvers** simplifican la lógica.
-   La integración con bases de datos como SQLite mediante **TypeORM** facilita el acceso a datos.

### **Ejemplo Comparativo: REST vs GraphQL**

#### API REST:

Para obtener todos los autores con sus libros, se necesitan múltiples solicitudes:

1.  Obtener la lista de autores (`/authors`).
2.  Para cada autor, obtener sus libros (`/authors/:id/books`).

#### API GraphQL:
Con una sola consulta se obtienen todos los datos necesarios:
~~~graphql
query {
  authors {
    name
    books {
      title
    }
  }
}
~~~
### **Conclusión**

En esta aplicación, **GraphQL** mejora la eficiencia, la flexibilidad y la experiencia del desarrollador. Es particularmente ventajoso en sistemas con relaciones complejas entre entidades, donde las necesidades de datos varían entre clientes. Esto hace que la API sea más robusta y fácil de consumir, además de prepararla para futuras expansiones sin complicaciones.

--- 
## Patrones de Diseño Aplicados y sus Beneficios
#### **1. Repository Pattern (Patrón de Repositorio)**

Este patrón se utilizó para encapsular la lógica de acceso a datos. Cada entidad tiene su propio repositorio (`AuthorRepository` y `BookRepository`), lo que centraliza la interacción con la base de datos.

**Beneficios:**

-   **Desacoplamiento**: El código que interactúa con la base de datos está separado de las capas de negocio y presentación.
-   **Reutilización**: La lógica de acceso a datos es reutilizable en diferentes partes de la aplicación.
-   **Facilidad de pruebas**: Es fácil simular el repositorio para realizar pruebas unitarias sin depender de una base de datos real.

----------

#### **2. Service Layer Pattern (Capa de Servicios)**

La capa de servicios actúa como intermediaria entre los resolvers de GraphQL y los repositorios. Esta capa contiene la lógica de negocio de la aplicación.

**Beneficios:**

-   **Centralización de la lógica de negocio**: Todo el procesamiento de datos y validaciones se realiza en esta capa, lo que facilita los cambios.
-   **Resolvers más simples**: Los resolvers se enfocan únicamente en delegar solicitudes a los servicios.
-   **Escalabilidad**: Es fácil agregar nuevas funcionalidades al extender los servicios existentes.

----------

#### **3. Dependency Injection (Inyección de Dependencias)**

Se implementó un contenedor (`container.ts`) para gestionar las dependencias, como repositorios y servicios. Esto permite que las dependencias sean fácilmente reemplazadas o simuladas en un entorno de prueba.

**Beneficios:**

-   **Reducción de acoplamiento**: Los componentes no crean directamente sus dependencias; en su lugar, se les proporcionan.
-   **Facilidad de pruebas**: Las dependencias pueden ser reemplazadas por versiones simuladas durante las pruebas.
-   **Flexibilidad**: Permite cambiar implementaciones sin modificar el código de las capas superiores.
---

## Consumo desde Postman
### **1. Configura un Nuevo Request en Postman**

1.  Abre **Postman**.
2.  Haz clic en **New Request**.
3.  Configura el método HTTP en **POST**.
4.  En el campo **URL**, ingresa el endpoint de tu servidor GraphQL, por ejemplo:
~~~bash
http://localhost:4000/graphql
~~~
### **2. Configura el Header**

Para que el servidor entienda que estás enviando una solicitud GraphQL, agrega este encabezado (header):

-   **Key**: `Content-Type`
-   **Value**: `application/json`

### **3. Define el Cuerpo de la Solicitud**

En Postman, selecciona la pestaña **Body** y elige la opción **raw**. Luego, escribe tu consulta o mutación en formato JSON:

#### Ejemplo de una Consulta (Query):
~~~json
{
  "query": "query { books { id title author { name } } }"
}
~~~
#### Ejemplo de una Mutación:

Para agregar un libro relacionado con un autor:
~~~json
{
  "query": "mutation {
      addBook(title: \"Cien años de soledad\", authorId: 1)
      {
          id title author { id name }
      }
  }"
}
~~~
### **4. Envía la Solicitud**

1.  Haz clic en **Send**.
2.  Si la API está configurada correctamente, recibirás una respuesta JSON con los datos solicitados.

### **5. Ejemplo Completo**

#### Query: Obtener todos los autores con sus libros

**Body:**
~~~json
{
  "query": "query { authors { id name books { id title } } }"
}
~~~
Respuesta Esperada:
~~~json
{
  "data": {
    "authors": [
      {
        "id": 1,
        "name": "Gabriel García Márquez",
        "books": [
          {
            "id": 1,
            "title": "Cien años de soledad"
          }
        ]
      }
    ]
  }
}
~~~
#### Mutación: Agregar un nuevo autor

**Body:**
~~~json
{
  "query": "mutation { addAuthor(name: \"Isabel Allende\") { id name } }"
}
~~~
Respuesta Esperada:
~~~json
{
  "data": {
    "addAuthor": {
      "id": 2,
      "name": "Isabel Allende"
    }
  }
}
~~~
