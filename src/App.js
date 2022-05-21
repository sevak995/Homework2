import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Container from './components/Container/Container';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar />
        <Container />
      </div>
    </Provider>
  );
}

export default App;
