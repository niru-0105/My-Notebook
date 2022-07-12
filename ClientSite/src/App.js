import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert msg='A simple primary alert—check it out!'/>
          <div className="container">
          <Routes>
            <Route path='/' element={<Home key="home" />} />
            <Route path='about' element={<About key="about" />} />
            <Route path='login' element={<Login key="login" />} />
            <Route path='signup' element={<SignUp key="signUp" />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
