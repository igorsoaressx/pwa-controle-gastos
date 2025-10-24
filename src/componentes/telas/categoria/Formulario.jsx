import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import CategoriaContext from './CategoriaContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Formulario() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(CategoriaContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Categoria</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Alerta alerta={alerta} />
                    <FloatingLabel controlId="txtId" label="ID" className="mb-3">
                        <Form.Control type="text" readOnly name="id"
                            value={objeto.id}
                            onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="txtNome" label="Nome" className="mb-3">
                        <Form.Control type="text" required name="nome"
                            value={objeto.nome}
                            onChange={handleChange} placeholder="Informe o nome" />
                    </FloatingLabel>
                    <FloatingLabel controlId="txtDescricao" label="Descrição" className="mb-3">
                        <Form.Control type="text" name="descricao"
                            value={objeto.descricao}
                            onChange={handleChange} placeholder="Informe a descrição (opcional)" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        Salvar <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default Formulario;