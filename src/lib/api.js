import { mockData } from '../data/mockData.js';

export async function apiFetch(url, options = {}) {
  const endpoint = `${import.meta.env.VITE_API_URL}${url}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      credentials: 'include',
      ...options
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (url.startsWith('/products')) {
      return mockData.products;
    }
    if (url.startsWith('/orders')) {
      return mockData.orders;
    }
    if (url.startsWith('/admin')) {
      return {
        revenue: mockData.orders.reduce((sum, order) => sum + order.total, 0),
        ordersCount: mockData.orders.length,
        usersCount: mockData.users.length
      };
    }
    if (url.startsWith('/auth')) {
      return { success: true };
    }
    return {};
  }
}
