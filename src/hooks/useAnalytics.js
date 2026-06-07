import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api.js';
import { mockData } from '../data/mockData.js';

export function useAnalytics() {
  const [stats, setStats] = useState({ revenue: 0, ordersCount: 0, usersCount: 0 });

  useEffect(() => {
    let active = true;
    apiFetch('/admin/stats')
      .then((data) => {
        if (active) setStats(data);
      })
      .catch(() => {
        if (active)
          setStats({
            revenue: mockData.orders.reduce((sum, order) => sum + order.total, 0),
            ordersCount: mockData.orders.length,
            usersCount: mockData.users.length
          });
      });
    return () => {
      active = false;
    };
  }, []);

  return stats;
}
