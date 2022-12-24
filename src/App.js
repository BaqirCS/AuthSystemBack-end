import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './screen/LoginScreen';
import Register from './screen/RegisterScreen';
import ForgotPassP1 from './screen/ForgotPassP1';
import ResetPass from './screen/ResetPass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedHome from './screen/ProtectedHome';
import Navbar from './screen/Navbar';
import Footer from './screen/Footer';
import Landing from './screen/Landing';
import SecondNavbar from './screen/SecondNavbar';
import { useContext } from 'react';
import { Store } from './context/Store';
import WaitingPage from './screen/WaitingPage';
function App() {
  const { state } = useContext(Store);
  return (
    <BrowserRouter>
      {state.userInfo ? (
        <>
          <Navbar />
          <Routes>
            {' '}
            <Route element={<ProtectedHome />} path="/protected" />
            <Route element={<ProtectedHome />} path="/*" />
          </Routes>
        </>
      ) : (
        <>
          <SecondNavbar />
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<ForgotPassP1 />} path="/forgotpass" />
            <Route element={<ResetPass />} path="/resetpass" />
            <Route element={<Landing />} path="/landingpage" />
            <Route element={<WaitingPage />} path="/waiting" />

            <Route element={<Landing />} path="/*" />
          </Routes>
        </>
      )}

      <Footer />
    </BrowserRouter>
  );
}

export default App;
