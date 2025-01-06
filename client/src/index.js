import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';

export const Context = createContext({
  isAuthenticated: false,
})


const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState('dark');


  return(
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      blogs,
      setBlogs,
      mode,
      setMode
    }}>
      <App />
      <Toaster position='top-center' reverseOrder={false} />
    </Context.Provider>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
