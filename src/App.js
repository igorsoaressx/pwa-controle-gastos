import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu from "./componentes/Menu";
import Home from "./componentes/telas/Home";
import Categoria from "./componentes/telas/categoria/Categoria";
import Transacao from "./componentes/telas/transacao/Transacao"; 
import Meta from "./componentes/telas/meta/Meta";
import Login from "./componentes/telas/login/Login";
import DadosUsuario from "./componentes/telas/usuario/DadosUsuario"; 

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
            {
                path: "metas",
                element: <Meta />,
            },
            {
                path: "meus-dados", 
                element: <DadosUsuario />,
            }
        ]
    }
]);

function App() {
  return (
    <Login>
        <RouterProvider router={router} />
    </Login>
  );
}

export default App;