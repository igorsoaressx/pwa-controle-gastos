const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;

export const getMetasAPI = async () => {
    const response = await fetch(`${ENDERECO_API}/meta`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const getMetaPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/meta/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const deleteMetaPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/meta/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const cadastraMetaAPI = async (objeto, metodo) => {
    const response = await fetch(`${ENDERECO_API}/meta`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}
