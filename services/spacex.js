// funciones que consultan la API de space x (resolvers)

// import dotenv from "dotenv"
// dotenv.config()
import axios from "axios"

const API_URL = "https://api.spacexdata.com/v5/launches";
const API_URL_ROCKET = "https://api.spacexdata.com/v4/rockets";

export async function getLaunches(limit=10) {
    const res = await axios.post(`${API_URL}/query`, {
        query: {},
        options: {
            limit,
            sort: {
                date_unix: "desc"
            }
        }
    });
    return res.data.docs;
}

export async function getLaunchById(_, {id}) { // sin importar el primer argumento ya que es parent | root
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
}

export async function getRocket(parent) { // acá si me importa el parent ya q el resolver está anidado dentro de un tipo (launch) para entrar a un campo del obj padre (rocket) para construir la url
    const res = await axios.get(`${API_URL_ROCKET}/${parent.rocket}`);
    return res.data;
}