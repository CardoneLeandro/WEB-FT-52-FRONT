'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}
interface Donation {
  title: string;
  amount: number;
  date: string;
}
interface Session {
  id: string;
  name: string;
  email: string;
  image: string | null;
  providerAccountId: string;
  creatorId: string;
  status: string | null;
  phone: string;
  address: string;
  donations: Donation[];
}
interface PaymentInfo {
  title: string | null;
  amount: number | null;
}

interface AuthContextType {
  token: string | null;
  userSession: Session | null;
  paymentInfo: PaymentInfo | null;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session | null) => void;
  setDonation: (donation: Donation) => void;
  setPaymentInfo: (paymentInfo: PaymentInfo | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: null,
  paymentInfo: null,
  setToken: () => {},
  setSession: () => {},
  setDonation: () => {},
  setPaymentInfo: () => {},
  logout: () => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userSession, setSession] = useState<Session | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    // Cargar datos del localStorage
    const storedToken = localStorage.getItem('token');
    const storedSession = JSON.parse(
      localStorage.getItem('userSession') || 'null',
    );
    const storedPaymentInfo = JSON.parse(
      localStorage.getItem('paymentInfo') || 'null',
    );

    if (storedToken && storedSession) {
      setSession(storedSession);
      setToken(storedToken);
    } else {
      setSession(null);
      localStorage.removeItem('userSession');
      setToken(null);
    }

    // Cargar paymentInfo desde localStorage
    if (storedPaymentInfo) {
      setPaymentInfo(storedPaymentInfo);
    }
  }, []);

  const handleSetDonations = (donation: Donation) => {
    if (donation) {
      setSession((prevSession) => {
        if (prevSession) {
          return {
            ...prevSession,
            donations: [...prevSession.donations, donation],
          };
        }
        return prevSession;
      });
    }
  };

  const handleSetPayment = (params: PaymentInfo | null) => {
    setPaymentInfo(params);
    if (params) {
      localStorage.setItem('paymentInfo', JSON.stringify(params)); // Guardar en localStorage
    } else {
      localStorage.removeItem('paymentInfo'); // Limpiar localStorage si es null
    }
  };

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (!newToken) {
      setSession(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
      localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo también si no hay token
    } else {
      localStorage.setItem('token', newToken);
    }
  };

  const handleUserData = (userSession: Session | null) => {
    setSession(userSession);
    if (!userSession) {
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
      localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo también si no hay sesión
    } else {
      localStorage.setItem('userSession', JSON.stringify(userSession));
    }
  };

  const logout = () => {
    setToken(null);
    setSession(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userSession');
    localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo al cerrar sesión
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        userSession,
        setSession: handleUserData,
        setDonation: handleSetDonations,
        logout,
        paymentInfo,
        setPaymentInfo: handleSetPayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
