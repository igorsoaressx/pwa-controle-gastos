
const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;


const getToken = () => localStorage.getItem('token');

export const getCategoriasAPI = async () => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/categoria`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token 
        }
    });
    const data = await response.json();
    return data;
}

export const getCategoriaPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/categoria/${id}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
    const data = await response.json();
    return data;
}

export const deleteCategoriaPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/categoria/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
    const data = await response.json();
    return data;
}

export const cadastraCategoriaAPI = async (objeto, metodo) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/categoria`, {
        method: metodo,
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}