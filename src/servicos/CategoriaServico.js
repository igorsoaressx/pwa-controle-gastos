const ENDERECO_API = process.env.REACT_APP_ENDERECO_API;

// GET
export const getCategoriasAPI = async () => {
    
    const url = `${ENDERECO_API}/categoria`;
    console.log(" CategoriaServico busca  para:", url);
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

       
        console.log("CategoriaServico resposta ");

        const data = await response.json();

       
        console.log(" CategoriaServico Dados recebidos da API:", data);

        return data;
        
    } catch (err) {
        // LOG DE ERRO: Se o fetch falhar 
        console.error("ERRO  CategoriaServico O fetch falhou:", err.message);
        throw err; // Joga o erro para o componente Categoria.jsx tratar
    }
}



export const getCategoriaPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/categoria/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const deleteCategoriaPorCodigoAPI = async (id) => {
    const response = await fetch(`${ENDERECO_API}/categoria/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data;
}

export const cadastraCategoriaAPI = async (objeto, metodo) => {
    const response = await fetch(`${ENDERECO_API}/categoria`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    const data = await response.json();
    return data;
}
