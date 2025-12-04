import React, { useState, useEffect } from 'react';
import AutenticacaoContext from './AutenticacaoContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Carregando from '../../comuns/Carregando';
import Cadastro from './Cadastro';
import './Login.css'; 

function Login({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);
    const [criandoConta, setCriandoConta] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');
        if (token && usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
    }, []);

    const acaoLogin = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setAlerta({ status: "", message: "" });

        try {
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const dados = await response.json();

            if (response.ok) {
                localStorage.setItem('token', dados.token);
                localStorage.setItem('usuario', JSON.stringify(dados.usuario));
                setUsuario(dados.usuario);
            } else {
                setAlerta({ status: "error", message: dados.message || "Erro de login" });
            }
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao conectar: " + err.message });
        }
        setCarregando(false);
    }

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

 
    if (usuario) {
        return (
            <AutenticacaoContext.Provider value={{ usuario, logout }}>
                {children}
            </AutenticacaoContext.Provider>
        );
    }

    if (criandoConta) {
        return <Cadastro setCriandoConta={setCriandoConta} />;
    }


    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="text-center mb-4">Login</h2>
                
                {alerta.message && <Alert variant="danger">{alerta.message}</Alert>}
                
                <Carregando carregando={carregando}>
                    <Form onSubmit={acaoLogin}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="exemplo@teste.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="senha">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="******" 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required 
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Entrar
                            </Button>
                            
                            <hr />
                            
                            <Button 
                                variant="outline-primary" 
                                onClick={() => setCriandoConta(true)}
                            >
                                Criar nova conta
                            </Button>
                        </div>
                    </Form>
                </Carregando>
            </div>
        </div>
    );
}

export default Login;