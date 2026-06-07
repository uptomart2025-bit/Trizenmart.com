import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiFetch } from '../lib/api.js';
import { setProducts } from '../redux/slices/productSlice.js';
import { mockData } from '../data/mockData.js';

export function useProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    apiFetch('/products')
      .then((data) => {
        if (active) dispatch(setProducts(data));
      })
      .catch(() => {
        if (active) dispatch(setProducts(mockData.products));
      });
    return () => {
      active = false;
    };
  }, [dispatch]);
}
