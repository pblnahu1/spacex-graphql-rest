// Este script sirve para probar rápido el estado de la API con algunos métodos como
// mostrar todos los datos, filtrar cuáles tuvieron éxito, y recorriendo con forEach
// para ver los nombres de las misiones que tuvieron éxito con sus fechas

const API_URL = "https://api.spacexdata.com/v5/launches/query";

async function fetchData() {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        // En este caso siempre devolveremos un JSON por eso usamos simplemente este
        "Content-Type": "application/json",
        // "Content-Type": "text/plain", // -> si agrego esto me tira error 400 o 415 (Unsopported Media Type) porque el servidor espera un contenido de tipo JSON
        // "Content-Type": "application/x-www-form-urlencoded", // -> para endpoints que acepten formularios html tradicionales (o api viejas) pero tira error 400 porque no entiende el formato de la API
        "Accept": "application/json" // -> para aceptar "text/html", "application/xml", etc 
      },
      /* PARA "application/x-www-form-urlencoded" */
      // body: new URLSearchParams({
      //   query: JSON.stringify({}),
      //   options: JSON.stringify({
      //     sort: { date_unix: "asc" },
      //     limit: 12
      //   })
      // })

      /* PARA "application/json" */
      // JSON.stringify(value, replacer?, space?)
      // value -> objeto o valor (lo que quiero convertir a JSON)
      // replacer? -> array o fn (filtra o trasnforma propiedades) (sirve para depuración, modificar valores antes de mandarlo)
      // space? -> num o str (agrega identación para que sea más legible)
      body: JSON.stringify({
        query: {}, // <- propiedad {} todos los lanzamientos
        options: { // <- propiedaddes de la API {ordenamiento de date_unix ascendente, resultados que quiero = 12} 
          sort: {
            date_unix: "asc",
          },
          limit: 12,
        },
      }, (key, v) => { // -> replacer por si quiero excluir 'sort' del JSON antes de enviarlo al servidor
        if(key==="sort") return undefined; // lo excluye
        if(key==="limit") return v * 2; // duplico el límite
        return v
      }),
    });

    // const data = JSON.stringify(await res.json()); // string plano
    const data = await res.json(); // loguear como objeto

    // accedo a docs - name para procesarlos y mostrar los nombres de las misiones, fechas o si tuvieron exito
    data.docs.forEach((launch, index) => {
      console.log(
        `#${index + 1} - ${launch.name} (${new Date(
          launch.date_utc
        ).toLocaleDateString()})`
      );
    });

    // cuales tuvieron exito (filtrado completo, es decir, valores enteros)
    const stonks = data.docs.filter(launch => launch.success);
    console.log(stonks);

    // elemento en .html
    const ul = document.createElement('ul');
        data.docs.forEach(launch => {
        const li = document.createElement('li');
        li.textContent = `${launch.name} (${new Date(launch.date_utc).toLocaleDateString()}) - ${
            launch.success ? "✅ Éxito" : "❌ Fallo"
        }`;
        ul.appendChild(li);
        });
        document.body.appendChild(ul);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

fetchData();
