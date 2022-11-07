import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { login, logout, authConfig } from './Functions/auth';
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Front show='list'/>
          }
        />      
         <Route
        path="/create"
        element={
          <Front show='create'/>
        }
      />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth role="admin">
              <Back />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then((res) => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children]);

  return view;
}

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass }).then((res) => {
      console.log(res.data);
      if ('ok' === res.data.msg) {
        login(res.data.key);
        navigate('/admin', { replace: true });
      }
    });
  };
  return (
    <div>
      <div>
        name:{' '}
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <button onClick={doLogin}>Login</button>
    </div>
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to="/login" replace />;
}

export default App;

