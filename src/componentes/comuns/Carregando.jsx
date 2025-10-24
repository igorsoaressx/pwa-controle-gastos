import Spinner from 'react-bootstrap/Spinner';


function Carregando({ carregando, children }) { 
    if (carregando) {
        // Se estiver carregando, mostra o spinner
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh' 
            }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Carregando...</span>
            </div>
        );
    }
    
    return <>{children}</>; 
}

export default Carregando;

