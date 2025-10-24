const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;

export const getTransacoesAPI = async () => {
    const response = await fetch(`${ENDERECO_API}/transacao`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const getTransacaoPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/transacao/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const deleteTransacaoPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/transacao/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const cadastraTransacaoAPI = async (objeto, metodo) => {
    const response = await fetch(`${ENDERECO_API}/transacao`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}