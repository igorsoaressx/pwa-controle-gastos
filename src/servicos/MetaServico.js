const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;

const getToken = () => localStorage.getItem('token');

export const getMetasAPI = async () => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/meta`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token 
        }
    });
    const data = await response.json();
    return data;
}

export const getMetaPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/meta/${id}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token 
        }
    });
    const data = await response.json();
    return data;
}

export const deleteMetaPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/meta/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token 
        }
    });
    const data = await response.json();
    return data;
}

export const cadastraMetaAPI = async (objeto, metodo) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/meta`, {
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