import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobListing from './components/JobListing';
import jobData from './data.json';

function App() {
    const jobs = jobData;

    return (
    <Container fluid className="App">
        <header className="App-header">
            <img src="./images/bg-header-desktop.svg"/>
        </header>
        <Container fluid>
            {jobs.map(j => {
                return(<JobListing job={j} />)
            })}
        </Container>
    </Container>
    );
}

export default App;
