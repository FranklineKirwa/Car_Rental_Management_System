import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
