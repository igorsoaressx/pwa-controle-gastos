// src/App.js (ATUALIZADO E COMPLETO)

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./componentes/Menu";
import Home from "./componentes/telas/Home";
import Categoria from "./componentes/telas/categoria/Categoria";
import Transacao from "./componentes/telas/transacao/Transacao"; 
import Meta from "./componentes/telas/meta/Meta"; // 1. IMPORTA A TELA DE METAS

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "categorias",
                element: <Categoria />,
            },
            {
                path: "transacoes",
                element: <Transacao />,
            },
            { // 2. ATIVA A ROTA DE METAS
                path: "metas",
                element: <Meta />,
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;

