import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext'; // custom toast

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast(); // use custom toast

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/user');
      setUser(data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
      addToast('Login successful!', 'success');
      return true;
    } catch (error) {
      addToast(error.response?.data?.message || 'Login failed', 'error');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
      addToast('Registration successful!', 'success');
      return true;
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed', 'error');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    addToast('Logged out successfully', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};