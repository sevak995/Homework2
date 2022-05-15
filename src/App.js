import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Container from './components/Container/Container';
import ElementsProvider from './Context/ElementsContext';

function App() {
  return (
    <div className="App">
      <ElementsProvider>
        <Sidebar />
        <Container />
      </ElementsProvider>
    </div>
  );
}

export default App;
