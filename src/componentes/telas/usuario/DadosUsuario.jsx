// src/componentes/telas/usuario/DadosUsuario.jsx
import React, { useState, useContext, useEffect } from 'react';
import AutenticacaoContext from '../login/AutenticacaoContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Carregando from '../../comuns/Carregando';

function DadosUsuario() {
    const { usuario } = useContext(AutenticacaoContext);
    
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome);
            setEmail(usuario.email);
        }
    }, [usuario]);

    const acaoSalvar = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setAlerta({ status: "error", message: "A funcionalidade de salvar será implementada na API em breve!" });
        
        setCarregando(false);
    }

    return (
        <Container className="mt-5">
            <div className="p-4 border rounded shadow-sm bg-white">
                <h2 className="mb-4">Meus Dados</h2>
                <Alert variant="info">Você está logado como: <strong>{usuario?.tipo}</strong></Alert>
                
                {alerta.message && <Alert variant={alerta.status === 'success' ? 'success' : 'danger'}>{alerta.message}</Alert>}

                <Carregando carregando={carregando}>
                    <Form onSubmit={acaoSalvar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" value={nome} 
                                onChange={(e) => setNome(e.target.value)} required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" value={email} 
                                disabled 
                            />
                            <Form.Text className="text-muted">O email não pode ser alterado.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Deixe em branco para não alterar" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Salvar Alterações
                        </Button>
                    </Form>
                </Carregando>
            </div>
        </Container>
    );
}

export default DadosUsuario;