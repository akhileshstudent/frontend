import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function readManager() {
  try { return JSON.parse(localStorage.getItem('manager') || 'null'); }
  catch { return null; }
}

export function AuthProvider({ children }) {
  const [manager, setManager] = useState(readManager);

  const value = useMemo(() => ({
    manager,
    isAuthenticated: Boolean(localStorage.getItem('token') && manager),
    signIn(response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('manager', JSON.stringify(response.manager));
      setManager(response.manager);
    },
    signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('manager');
      setManager(null);
    }
  }), [manager]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
