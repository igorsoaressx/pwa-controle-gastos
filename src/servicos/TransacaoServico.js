const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;
const getToken = () => localStorage.getItem('token');

export const getTransacoesAPI = async () => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/transacao`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
    const data = await response.json();
    return data;
}

export const getTransacaoPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/transacao/${id}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
    const data = await response.json();
    return data;
}

export const deleteTransacaoPorCodigoAPI = async (id) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/transacao/${id}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token
        }
    });
    const data = await response.json();
    return data;
}

export const cadastraTransacaoAPI = async (objeto, metodo) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/transacao`, {
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