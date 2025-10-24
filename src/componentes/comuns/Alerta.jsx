import Alert from 'react-bootstrap/Alert';

function Alerta({ alerta }) {
    if (alerta.status === "") {
        return null; // Não renderiza nada se não houver alerta
    }
    return (
        <Alert variant={alerta.status === 'success' ? 'success' : 'danger'}>
            {alerta.message}
        </Alert>
    );
}

export default Alerta;