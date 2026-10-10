'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import RegisterModal from '@/app/apis/components/RegisterModal';

const RegisterModalContext = createContext(null);

export function RegisterModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegisterModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeRegisterModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleRegisterModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Listen to global custom window events so it can be opened from anywhere in the app
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener('open-register-modal', handleOpen);
    window.addEventListener('close-register-modal', handleClose);
    window.addEventListener('toggle-register-modal', handleToggle);

    return () => {
      window.removeEventListener('open-register-modal', handleOpen);
      window.removeEventListener('close-register-modal', handleClose);
      window.removeEventListener('toggle-register-modal', handleToggle);
    };
  }, []);

  return (
    <RegisterModalContext.Provider
      value={{
        isOpen,
        openRegisterModal,
        closeRegisterModal,
        toggleRegisterModal,
      }}
    >
      {children}
      <RegisterModal isOpen={isOpen} onClose={closeRegisterModal} />
    </RegisterModalContext.Provider>
  );
}

export function useRegisterModal() {
  const context = useContext(RegisterModalContext);
  if (!context) {
    throw new Error('useRegisterModal must be used within a RegisterModalProvider');
  }
  return context;
}

// Global helper for opening modal anywhere (including outside React components)
export function openGlobalRegisterModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-register-modal'));
  }
}

export function closeGlobalRegisterModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('close-register-modal'));
  }
}
