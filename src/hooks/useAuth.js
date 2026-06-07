import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../redux/slices/userSlice.js';
import { fetchProfile } from '../lib/auth.js';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    fetchProfile()
      .then((user) => {
        if (active && user) dispatch(setUser(user));
      })
      .catch(() => {
        if (active) dispatch(logout());
      });

    return () => {
      active = false;
    };
  }, [dispatch]);
}
