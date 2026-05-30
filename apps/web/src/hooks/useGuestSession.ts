import { useEffect, useState } from 'react';

const GUEST_SESSION_KEY = 'guestSessionId';

const useGuestSession = () => {
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    const existingGuestId = localStorage.getItem(GUEST_SESSION_KEY);
    if (existingGuestId) {
      setGuestId(existingGuestId);
    } else {
      const newGuestId = generateGuestId();
      localStorage.setItem(GUEST_SESSION_KEY, newGuestId);
      setGuestId(newGuestId);
    }
  }, []);

  const generateGuestId = () => {
    return 'guest-' + Math.random().toString(36).substr(2, 9);
  };

  return guestId;
};

export default useGuestSession;