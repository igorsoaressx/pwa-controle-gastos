import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Carregando from '../../comuns/Carregando';

function Cadastro({ setCriandoConta }) {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setAlerta({ status: "", message: "" });

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cadastro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha, tipo: 'comum' }) 
            });

            const dados = await response.json();

            if (response.ok) { 
                alert("Usuário criado com sucesso! Faça login agora.");
                setCriandoConta(false);
            } else {
                setAlerta({ status: "error", message: dados.message || "Erro ao criar conta" });
            }
        } catch (err) {
            setAlerta({ status: "error", message: "Erro de conexão: " + err.message });
        }
        setCarregando(false);
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="p-4 border rounded shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Nova Conta</h2>
                {alerta.message && <Alert variant="danger">{alerta.message}</Alert>}
                
                <Carregando carregando={carregando}>
                    <Form onSubmit={acaoCadastrar}>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Seu nome" 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Seu email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Crie uma senha" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit">
                                Criar Conta
                            </Button>
                            <Button variant="link" onClick={() => setCriandoConta(false)}>
                                Já tenho conta. Voltar ao Login.
                            </Button>
                        </div>
                    </Form>
                </Carregando>
            </div>
        </Container>
    );
}

export default Cadastro;