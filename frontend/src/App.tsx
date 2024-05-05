import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Registration from 'pages/Registration';
import Login from 'pages/Login';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
