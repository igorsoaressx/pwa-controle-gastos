import { useContext } from 'react';
import TransacaoContext from './TransacaoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const formatarData = (data) => {
   
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

const formatoMoeda = (valor) => {
    let vlr = Number(valor);
    return vlr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(TransacaoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Transações</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h4>Nenhuma transação encontrada</h4>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.id}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editarObjeto(objeto.id)} title="Editar">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" className="ms-2" onClick={() => { remover(objeto.id); }} title="Remover">
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.descricao}</td>
                                <td>{formatoMoeda(objeto.valor)}</td>
                                <td>{formatarData(objeto.data)}</td>
                                <td>{objeto.categoria_nome}</td> 
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;