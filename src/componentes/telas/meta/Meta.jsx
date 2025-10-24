import React, { useState, useEffect } from 'react';
import MetaContext from './MetaContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import { getMetasAPI, getMetaPorCodigoAPI, deleteMetaPorCodigoAPI, cadastraMetaAPI } from '../../../servicos/MetaServico';
import { getCategoriasAPI } from '../../../servicos/CategoriaServico'; 
import Alerta from '../../comuns/Alerta';

function Meta() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        id: 0,
        valor_limite: "",
        mes: "",
        ano: "",
        categoria_id: ""
    });

    const [listaCategorias, setListaCategorias] = useState([]);

    const recuperaMetas = async () => {
        setCarregando(true);
        try {
            setListaObjetos(await getMetasAPI());
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar metas: " + err.message });
        }
        setCarregando(false);
    };

    const recuperaCategorias = async () => {
        try {
            setListaCategorias(await getCategoriasAPI());
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar categorias para o formulário: " + err.message });
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover esta meta?')) {
            try {
                let retornoAPI = await deleteMetaPorCodigoAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaMetas();
            } catch (err) {
                 setAlerta({ status: "error", message: "Erro ao remover meta: " + err.message });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: 0,
            valor_limite: "",
            mes: new Date().getMonth() + 1, // Mês atual
            ano: new Date().getFullYear(), 
            categoria_id: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            setObjeto(await getMetaPorCodigoAPI(id));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
             setAlerta({ status: "error", message: "Erro ao buscar dados da meta: " + err.message });
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraMetaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
            recuperaMetas();
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao salvar meta: " + err.message });
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    useEffect(() => {
        recuperaMetas();
        recuperaCategorias();
    }, []);

    return (
        <MetaContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaMetas,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                editarObjeto,
                novoObjeto,
                acaoCadastrar,
                handleChange,
                exibirForm, setExibirForm,
                listaCategorias 
            }
        }>
            {}
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
            {}
            {!carregando && <Alerta alerta={alerta} />} 
        </MetaContext.Provider>
    );
}

export default Meta;
