// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Addproduct from './components/Addproduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/add-quiz' element={<Addproduct />} />
      </Routes>
    </div>
  );
}

export default App;
