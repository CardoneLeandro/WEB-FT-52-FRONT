'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}
export interface Assistance {
  eventId: string; // ID DEL EVENTO
  id: string; // ID DE LA ASISTENCIA
  status: string; // SI ESTA ACTIVA ES PORQUE EL USUARIO ESTA APUNTADO
  title: string; // TITULO DEL EVENTO
  eventDate: Date; // FECHA DEL EVENTO
}
export interface AdminDonation {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'pending' | 'active' | 'rejected';
}
export interface Donation {
  title: string;
  amount: number;
  date: string;
}
export interface Session {
  id: string | null;
  role: string | null;
  name: string;
  email: string;
  image: string | null;
  providerAccountId: string;
  creatorId: string;
  status: string | null;
  phone: string;
  address: string;
  donations: Donation[];
  assistantEvents: Assistance[];
}
export interface PaymentInfo {
  title: string | null;
  amount: number | null;
}

export interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: boolean;
  vacancy: boolean;
  title: string;
  description: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: number;
  stock: number;
  images: string[];
  assistantEvents: Assistance[];
  key?: string;
}

interface AuthContextType {
  token: string | null;
  userSession: Session;
  paymentInfo: PaymentInfo | null;
  adminDonations: AdminDonation[] | null;
  allEvents: Event[] | null;
  adminEvents: Event[] | null;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session) => void;
  setDonation: (donation: Donation) => void;
  setAssistance: (assistance: Assistance[]) => void;
  setPaymentInfo: (paymentInfo: PaymentInfo | null) => void;
  setAdminDonation: (adminDonation: AdminDonation) => void;
  setAdminDonations: (adminDonations: AdminDonation[] | null) => void;
  setAllEvents: (allEvents: Event[] | null) => void;
  setAdminEvents: (adminEvets: Event[] | null) => void;
  setAdminEvent: (adminEvent: Event) => void;
  setEvent: (event: Event) => void;
  logout: () => void;
  getEvents: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: {
    id: null,
    role: null,
    name: '',
    email: '',
    image: null,
    providerAccountId: '',
    creatorId: '',
    status: null,
    phone: '',
    address: '',
    donations: [],
    assistantEvents: [],
  },
  paymentInfo: null,
  adminDonations: null,
  allEvents: null,
  adminEvents: null,
  setToken: () => {},
  setSession: () => {},
  setDonation: () => {},
  setAssistance: () => {},
  setPaymentInfo: () => {},
  setAdminDonation: () => {},
  setAdminDonations: () => {},
  setAllEvents: () => {},
  setEvent: () => {},
  setAdminEvents: () => {},
  setAdminEvent: () => {},
  logout: () => {},
  getEvents: () => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userSession, setSession] = useState<Session>({
    id: null,
    role: null,
    name: '',
    email: '',
    image: null,
    providerAccountId: '',
    creatorId: '',
    status: null,
    phone: '',
    address: '',
    donations: [],
    assistantEvents: [],
  });
  const [token, setToken] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [adminDonations, setAdminDonations] = useState<AdminDonation[] | null>(
    null,
  );
  const [allEvents, setAllEvents] = useState<Event[] | null>(null);
  const [adminEvents, setAdminEvents] = useState<Event[] | null>(null);

  const getEvents = async () => {
    try {
      const res = await fetch(
        `https://web-ft-52-back-1.onrender.com/events/getactiveandinactivehighlight`,
      );
      if (res.ok) {
        const data = await res.json();
        setAllEvents(data);
      } else {
        setAllEvents(null);
      }
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    }
  };

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
      setSession({
        id: null,
        role: null,
        name: '',
        email: '',
        image: null,
        providerAccountId: '',
        creatorId: '',
        status: null,
        phone: '',
        address: '',
        donations: [],
        assistantEvents: [],
      });
      localStorage.removeItem('userSession');
      setToken(null);
    }

    // Cargar paymentInfo desde localStorage
    if (storedPaymentInfo) {
      setPaymentInfo(storedPaymentInfo);
    }

    getEvents();
  }, []);

  const handleSetDonations = (donation: Donation) => {
    if (donation) {
      setSession((prevSession) => {
        if (prevSession) {
          const updatedDonations = [...prevSession.donations, donation];
          const updatedSession = {
            ...prevSession,
            donations: updatedDonations,
          };
          localStorage.setItem('userSession', JSON.stringify(updatedSession)); // Guardar en localStorage
          return updatedSession;
        }
        return prevSession;
      });
    }
  };

  const handleSetAssistance = (updatedAssistance: Assistance[]) => {
    if (updatedAssistance.length > 0) {
      setSession((prevSession) => {
        if (prevSession) {
          // eslint-disable-next-line no-unused-vars
          const { assistantEvents, ...rest } = prevSession;
          const updatedSession = {
            assistantEvents: updatedAssistance,
            ...rest,
          };
          return updatedSession;
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
      setSession({
        id: '',
        role: null,
        name: '',
        email: '',
        image: null,
        providerAccountId: '',
        creatorId: '',
        status: null,
        phone: '',
        address: '',
        donations: [],
        assistantEvents: [],
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
      localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo también si no hay token
    } else {
      localStorage.setItem('token', newToken);
    }
  };

  const handleUserData = (userSession: Session) => {
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

  const handleAdminDonations = (adminDonations: AdminDonation[] | null) => {
    setAdminDonations(adminDonations);
  };

  const handleAdminDonation = (adminDonation: AdminDonation) => {
    setAdminDonations((prevAdminDonations) => {
      if (prevAdminDonations) {
        return [...prevAdminDonations, adminDonation];
      }
      return [adminDonation];
    });
  };

  const handleAllEvents = (allEvents: Event[] | null) => {
    setAllEvents(allEvents);
  };

  const handleEvent = (updatedEvent: Event) => {
    setAllEvents((prevEvents) => {
      if (!prevEvents) return null;
      return prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      );
    });
  };

  const handleAdminEvents = (allEvents: Event[] | null) => {
    setAdminEvents(allEvents);
  };

  const handleAdminEvent = (adminEvent: Event) => {
    setAdminEvents((prevAdminEvents) => {
      if (prevAdminEvents) {
        return [...prevAdminEvents, adminEvent];
      }
      return [adminEvent];
    });
  };

  const logout = () => {
    setToken(null);
    setSession({
      id: null,
      role: null,
      name: '',
      email: '',
      image: null,
      providerAccountId: '',
      creatorId: '',
      status: null,
      phone: '',
      address: '',
      donations: [],
      assistantEvents: [],
    });
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
        adminDonations,
        setAdminDonation: handleAdminDonation,
        setAdminDonations: handleAdminDonations,
        allEvents,
        setEvent: handleEvent,
        setAllEvents: handleAllEvents,
        adminEvents,
        setAdminEvents: handleAdminEvents,
        setAdminEvent: handleAdminEvent,
        setAssistance: handleSetAssistance,
        getEvents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
