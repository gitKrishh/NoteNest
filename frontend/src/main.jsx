import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Make sure this is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider must wrap your entire App */}
      <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
);