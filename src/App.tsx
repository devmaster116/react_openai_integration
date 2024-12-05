import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PersonaProvider } from './contexts/PersonaContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import ZadiGPT from './pages/ZadiGPT';
import Write2Learn from './pages/WritingLab';
import Teach2Learn from './pages/Teach2Learn';
import Chat2Learn from './pages/Chat2Learn';
import Account from './pages/Account';
import Personalise from './pages/Personalise';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PersonaProvider>
          <PreferencesProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/zadigpt"
                    element={
                      <PrivateRoute>
                        <ZadiGPT />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/write2learn"
                    element={
                      <PrivateRoute>
                        <Write2Learn />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/teach2learn"
                    element={
                      <PrivateRoute>
                        <Teach2Learn />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/chat2learn"
                    element={
                      <PrivateRoute>
                        <Chat2Learn />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <PrivateRoute>
                        <Account />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/personalise"
                    element={
                      <PrivateRoute>
                        <Personalise />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/dashboard" element={<Navigate to="/zadigpt" />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </PreferencesProvider>
        </PersonaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;