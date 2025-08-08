import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin || false,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if it's an admin login
      const isAdminUser = email.includes('admin') || email === 'admin@waapickle.com';
      
      const mockUser = {
        id: isAdminUser ? 'admin-1' : Math.random(),
        name: isAdminUser ? 'Admin User' : 'John Doe',
        email: email,
        isAdmin: isAdminUser,
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      dispatch({
        type: 'LOGIN',
        payload: mockUser,
      });
      
      toast.success(isAdminUser ? 'Admin login successful!' : 'Login successful!');
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if it's an admin signup
      const isAdminUser = email.includes('admin') || email === 'admin@waapickle.com';
      
      const mockUser = {
        id: Math.random(),
        name: name,
        email: email,
        isAdmin: isAdminUser,
      };
      
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      dispatch({
        type: 'LOGIN',
        payload: mockUser,
      });
      
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};