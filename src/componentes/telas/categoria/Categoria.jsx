import React, { useState, useEffect } from 'react';
import CategoriaContext from './CategoriaContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import { getCategoriasAPI, getCategoriaPorCodigoAPI, deleteCategoriaPorCodigoAPI, cadastraCategoriaAPI } from '../../../servicos/CategoriaServico';
import Alerta from '../../comuns/Alerta';

function Categoria() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        id: 0,
        nome: "",
        descricao: ""
    });

    const recuperaCategorias = async () => {
        setCarregando(true);
        try {
            setListaObjetos(await getCategoriasAPI());
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar categorias: " + err.message });
            console.error("Erro em recuperaCategorias:", err); 
        }
        setCarregando(false);
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover esta categoria?')) {
            try {
                let retornoAPI = await deleteCategoriaPorCodigoAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaCategorias();
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover: " + err.message });
                console.error("Erro em remover:", err);
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: 0,
            nome: "",
            descricao: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            setObjeto(await getCategoriaPorCodigoAPI(id));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar dados para edição: " + err.message });
            console.error("Erro em editarObjeto:", err);
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
            recuperaCategorias(); 
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao salvar: " + err.message });
            console.error("Erro em acaoCadastrar:", err);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaCategorias,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                editarObjeto,
                novoObjeto,
                acaoCadastrar,
                handleChange,
                exibirForm, setExibirForm
            }
        }>

            {

            }
          
            
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
            {
                
            }
            {!carregando && <Alerta alerta={alerta} />} 
        </CategoriaContext.Provider>
    );
}

export default Categoria;
