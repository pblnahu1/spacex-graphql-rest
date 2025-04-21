# REST vs GraphQL: Una comparación práctica con ejemplos
En el mundo del desarrollo web moderno, dos enfoques comunes para construir APIs son REST y GraphQL. Aunque ambos tienen como objetivo entregar datos a los clientes, lo hacen de formas diferentes. En este artículo exploramos sus diferencias fundamentales, cómo estructurarlos, y mostramos ejemplos reales utilizando datos de la API de SpaceX.

## ¿Qué es REST?
REST (Representational State Transfer) es un estilo de arquitectura que utiliza HTTP para obtener y manipular recursos. Cada recurso se accede a través de una URL distinta y las operaciones se definen por los métodos HTTP: GET, POST, PUT, DELETE.

### Ejemplo REST con SpaceX
```http
GET /api/launches?limit=10
GET /api/launches/633f724c0531f07b4fdf59c5
```

Con REST, necesitas hacer varias llamadas si querés distintos tipos de datos relacionados (por ejemplo, el rocket de un launch).

## ¿Qué es GraphQL?

GraphQL es un lenguaje de consulta para APIs, desarrollado por Facebook. Permite a los clientes especificar exactamente los datos que necesitan. GraphQL tiene tres partes claves:

1. Types (tipos)
Los tipos definen la forma de los datos. Por ejemplo, un Launch puede tener un id, name, success, y un rocket:
```js
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: {
      type: RocketType,
      resolve: getRocket // Resolver anidado
    }
  })
});
```

2. Resolvers (solucionadores, funciones)
Son funciones que se encargan de obtener los datos para cada campo del esquema. Ejemplo:
```js
export async function getRocket(parent) {
  const res = await axios.get(`https://api.spacexdata.com/v4/rockets/${parent.rocket}`);
  return res.data;
}
```

3. Schema (esquema)
El esquema define todas las posibles consultas (queries) y mutaciones. Ejemplo de RootQuery:
```js
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve: getLaunches
    },
    launch: {
      type: LaunchType,
      args: { id: { type: GraphQLID } },
      resolve: getLaunchById
    }
  }
});
```

## Ventajas de GraphQL sobre REST

- Evita Overfetching y Underfetching: solo pedís lo que necesitás.

- Menos requests: podés obtener datos relacionados en una sola consulta.

- Fuertemente tipado: el esquema sirve como documentación y validación.

## Ventajas de REST sobre GraphQL

- Simplicidad: fácil de implementar con herramientas tradicionales.

- Caché HTTP: REST aprovecha el caché del navegador y servidores proxy.

# Conclusión

REST y GraphQL no son enemigos, sino herramientas para diferentes necesidades. REST es directo y simple para estructuras estáticas, mientras que GraphQL es poderoso para consultas flexibles y anidadas. Dominar ambos te permite construir APIs modernas, eficientes y escalables.
<br>

# Instalaciones del proyecto

Si tenés Docker ejecutá el proyecto con:
```bash
docker compose up --build
```

Si no tenés Docker, ejecutá por consola:
```bash
npm install && npm run dev
```

# Pro Tip
Para probar la API fácilmente, podés usar el archivo requests/test.http con el plugin REST Client de VS Code.

# Autor
Pablo Torrez