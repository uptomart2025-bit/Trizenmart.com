import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiFetch } from '../lib/api.js';
import { setOrders } from '../redux/slices/orderSlice.js';
import { mockData } from '../data/mockData.js';

export function useOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    apiFetch('/orders')
      .then((data) => {
        if (active) dispatch(setOrders(data));
      })
      .catch(() => {
        if (active) dispatch(setOrders(mockData.orders));
      });
    return () => {
      active = false;
    };
  }, [dispatch]);
}
