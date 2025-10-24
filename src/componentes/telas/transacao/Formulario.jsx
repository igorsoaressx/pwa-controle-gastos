import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import TransacaoContext from './TransacaoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Formulario() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaCategorias } = useContext(TransacaoContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Transação</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Alerta alerta={alerta} />
                    <Row>
                        <Col md={2}>
                            <FloatingLabel controlId="txtId" label="ID" className="mb-3">
                                <Form.Control type="text" readOnly name="id"
                                    value={objeto.id} onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md={10}>
                            <FloatingLabel controlId="txtDescricao" label="Descrição" className="mb-3">
                                <Form.Control type="text" required name="descricao"
                                    value={objeto.descricao}
                                    onChange={handleChange} placeholder="Ex: Almoço" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FloatingLabel controlId="txtValor" label="Valor (R$)" className="mb-3">
                                <Form.Control type="number" step="0.01" required name="valor"
                                    value={objeto.valor}
                                    onChange={handleChange} placeholder="Ex: 50.00" />
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <FloatingLabel controlId="txtData" label="Data" className="mb-3">
                                <Form.Control type="date" required name="data"
                                    value={objeto.data}
                                    onChange={handleChange} />
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <FloatingLabel controlId="selectCategoria" label="Categoria">
                                <Form.Select
                                    aria-label="Selecione a categoria"
                                    name="categoria_id"
                                    required
                                    onChange={handleChange}
                                    value={objeto.categoria_id}>
                                    <option value="">Selecione...</option>
                                    {listaCategorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
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