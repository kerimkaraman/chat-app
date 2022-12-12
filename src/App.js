import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home'
import './styles.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext'; 

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
