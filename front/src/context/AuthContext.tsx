'use client';

import { set } from 'date-fns';
import React, { useState, useEffect, createContext, useContext } from 'react';
const port = process.env.NEXT_PUBLIC_APP_API_PORT;

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
  favorites: string[];
}
export interface PaymentInfo {
  title: string | null;
  amount: number | null;
}

export interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  vacancy: boolean;
  title: string;
  description: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: number;
  stock: number;
  currentStock: number;
  images: string[];
  assistantEvents: Assistance[];
}

export interface Post {
  id: string;
  createDate: Date;
  status: string;
  title: string;
  content: string;
  author: string;
  images: string[];
  files: string[];
  newStatus?: string;
}

interface AuthContextType {
  token: string | null;
  userSession: Session;
  paymentInfo: PaymentInfo | null;
  adminDonations: AdminDonation[] | null;
  allEvents: Event[] | null;
  adminEvents: Event[] | null;
  allPosts: Post[] | null;
  postButtonStatus: string;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session) => void;
  setDonation: (donation: Donation) => void;
  setAssistance: (assistance: Assistance[]) => void;
  setFavorites: (favorites: string[]) => void;
  setPaymentInfo: (paymentInfo: PaymentInfo | null) => void;
  setAdminDonation: (adminDonation: AdminDonation) => void;
  setAdminDonations: (adminDonations: AdminDonation[] | null) => void;
  setAllEvents: (allEvents: Event[] | null) => void;
  setAdminEvents: (adminEvets: Event[] | null) => void;
  setAdminEvent: (adminEvent: Event) => void;
  setEvent: (event: Event) => void;
  logout: () => void;
  getEvents: () => void;
  setAllPosts: (allPosts: Post[] | null) => void;
  setPostButtonStatus: (status: string) => void;
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
    favorites: [],
  },
  paymentInfo: null,
  adminDonations: null,
  allEvents: null,
  adminEvents: null,
  allPosts: null,
  postButtonStatus: '',
  setToken: () => {},
  setSession: () => {},
  setDonation: () => {},
  setAssistance: () => {},
  setFavorites:() => {},
  setPaymentInfo: () => {},
  setAdminDonation: () => {},
  setAdminDonations: () => {},
  setAllEvents: () => {},
  setEvent: () => {},
  setAdminEvents: () => {},
  setAdminEvent: () => {},
  logout: () => {},
  getEvents: () => {},
  setAllPosts: () => {},
  setPostButtonStatus: () => {},

});
 
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
console.log('CONTEXTO MONTADO')
  const clearSession = {
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
    favorites: []
  };
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
    favorites: []
  });
  const [token, setToken] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [adminDonations, setAdminDonations] = useState<AdminDonation[] | null>(
    null,
  );
  const [allPosts, setAllPosts] = useState<Post[] | null>(null);
  const [allEvents, setAllEvents] = useState<Event[] | null>(null);
  const [adminEvents, setAdminEvents] = useState<Event[] | null>(null);
  const [postButtonStatus, setPostButtonStatus] = useState<string>('All');

  const getEvents = async () => {
    try {
      const res = await fetch(
        `http://localhost:${port}/events/getactiveandinactivehighlight`,
      );
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        setAllEvents(data);
      } else {
        setAllEvents([]);
      }
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      setAllEvents([])
    }
  };

  useEffect(() => {
    getEvents();
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
      setSession(clearSession);
      localStorage.removeItem('userSession');
      setToken(null);
    }

    // Cargar paymentInfo desde localStorage
    if (storedPaymentInfo) {
      setPaymentInfo(storedPaymentInfo);
    }
    
  }, []);

const handlePostButtonStatus = (status: string) => {
  setPostButtonStatus(status);
};

const handleSetDonations = (donation: Donation) => {
  if (donation) {
    setSession((prevSession) => {
      if (prevSession) {
        const updatedDonations = [...prevSession.donations, donation];
        const updatedSession = { ...prevSession, donations: updatedDonations };
        localStorage.setItem('userSession', JSON.stringify(updatedSession)); // Guardar en localStorage
        return updatedSession;
      }
      return prevSession;
    });
  }
};

  const handleSetAssistance = (assistantEvents: Assistance[]) => {
      setSession((prevSession) => {
        if (prevSession) {
          const updatedSession = { ...prevSession, assistantEvents };
          localStorage.setItem('userSession', JSON.stringify(updatedSession)); // Guardar en localStorage
          return updatedSession;
        }
        return prevSession;
      });
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
      setSession(clearSession);
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

  const handleSetAllPosts = (allPosts: Post[] | null) => {
    setAllPosts(allPosts);
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

  const handleSetFavorites = (favorites: string[]) => {
    setSession((prevSession) => {
      if (prevSession) {
        const updatedSession = { ...prevSession, favorites };
        localStorage.setItem('userSession', JSON.stringify(updatedSession));
        return updatedSession;
      }
      return prevSession;
    });
  }

  const logout = () => {
    setToken(null);
    setSession(clearSession);
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
        setFavorites: handleSetFavorites,
        allPosts,
        setAllPosts: handleSetAllPosts,
        postButtonStatus,
        setPostButtonStatus: handlePostButtonStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
