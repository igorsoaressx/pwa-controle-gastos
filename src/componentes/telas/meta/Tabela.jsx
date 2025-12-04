import { useContext } from 'react';
import MetaContext from './MetaContext';
import AutenticacaoContext from '../login/AutenticacaoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const formatoMoeda = (valor) => {
    let vlr = Number(valor);
    return vlr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(MetaContext);
    const { usuario } = useContext(AutenticacaoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Metas de Gasto</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Nova Meta <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h4>Nenhuma meta encontrada</h4>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Categoria</th>
                            <th>Valor Limite (R$)</th>
                            <th>Mês</th>
                            <th>Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editarObjeto(objeto.id)} title="Editar">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    
                                    {}
                                    {usuario && usuario.tipo === 'admin' && (
                                        <Button variant="danger" className="ms-2" onClick={() => { remover(objeto.id); }} title="Remover">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    )}
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.categoria_nome}</td> 
                                <td>{formatoMoeda(objeto.valor_limite)}</td>
                                <td>{objeto.mes}</td>
                                <td>{objeto.ano}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;