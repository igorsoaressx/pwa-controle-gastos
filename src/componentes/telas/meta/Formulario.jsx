import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import MetaContext from './MetaContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Formulario() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaCategorias } = useContext(MetaContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Meta</Modal.Title>
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
                    <Row>
                        <Col md={4}>
                            <FloatingLabel controlId="txtValor" label="Valor Limite (R$)" className="mb-3">
                                <Form.Control type="number" step="0.01" required name="valor_limite"
                                    value={objeto.valor_limite}
                                    onChange={handleChange} placeholder="Ex: 500.00" />
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <FloatingLabel controlId="txtMes" label="Mês" className="mb-3">
                                <Form.Control type="number" min="1" max="12" required name="mes"
                                    value={objeto.mes}
                                    onChange={handleChange} placeholder="Ex: 10" />
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <FloatingLabel controlId="txtAno" label="Ano" className="mb-3">
                                <Form.Control type="number" min="2020" max="2030" required name="ano"
                                    value={objeto.ano}
                                    onChange={handleChange} placeholder="Ex: 2025" />
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
