import React, { useState, useEffect } from 'react';
import TransacaoContext from './TransacaoContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import { getTransacoesAPI, getTransacaoPorCodigoAPI, deleteTransacaoPorCodigoAPI, cadastraTransacaoAPI } from '../../../servicos/TransacaoServico';
import { getCategoriasAPI } from '../../../servicos/CategoriaServico';
import Alerta from '../../comuns/Alerta'; 

function Transacao() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        id: 0,
        descricao: "",
        valor: "",
        data: new Date().toISOString().slice(0, 10),
        categoria_id: ""
    });
    const [listaCategorias, setListaCategorias] = useState([]);

 
    const recuperaTransacoes = async () => {
        setCarregando(true);
        try {
            setListaObjetos(await getTransacoesAPI());
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar transações: " + err.message });
            console.error("Erro em recuperaTransacoes:", err);
        }
        setCarregando(false);
    };

  
    const recuperaCategorias = async () => {
        try {
            setListaCategorias(await getCategoriasAPI());
        } catch (err) {
         
            setAlerta({ status: "error", message: "Erro ao buscar categorias para o formulário: " + err.message });
            console.error("Erro em recuperaCategorias (para o form):", err);
        }
    };

    const remover = async (id) => {
        if (window.confirm('Deseja remover esta transação?')) {
            try {
                let retornoAPI = await deleteTransacaoPorCodigoAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaTransacoes();
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover: " + err.message });
                console.error("Erro em remover (transacao):", err);
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: 0,
            descricao: "",
            valor: "",
            data: new Date().toISOString().slice(0, 10),
            categoria_id: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async (id) => {
        try {
            setObjeto(await getTransacaoPorCodigoAPI(id));
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao buscar dados para edição: " + err.message });
            console.error("Erro em editarObjeto (transacao):", err);
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraTransacaoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
            recuperaTransacoes(); 
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao salvar: " + err.message });
            console.error("Erro em acaoCadastrar (transacao):", err);
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    useEffect(() => {
        recuperaTransacoes();
        recuperaCategorias();
    }, []);

    return (
        <TransacaoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaTransacoes,
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
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
            {!carregando && <Alerta alerta={alerta} />}
        </TransacaoContext.Provider>
    );
}

export default Transacao;