const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;
const getToken = () => localStorage.getItem('token');

export const atualizarUsuarioAPI = async (objeto) => {
    const token = getToken();
    const response = await fetch(`${ENDERECO_API}/atualizar`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "x-access-token": token 
        },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}