import { Auth } from "./auth";
import { X_API_KEY } from "./auth";

const auth = new Auth();

export async function fetchOrders() {
  try {
    const response = await fetch('http://localhost:3000/buyers/orders', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
        Authorization: `Bearer ${auth.getFallback('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching orders: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
}

export async function fetchOrderDetails(orderId: number) {
  try {
    const response = await fetch(`http://localhost:3000/buyers/orders/${orderId}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
        Authorization: `Bearer ${auth.getFallback('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching order details: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching order details: ${error.message}`);
  }
}

export async function fetchStoreAndProducts(storeId: number) {
  try {
    const response = await fetch(`http://localhost:3000/stores/${storeId}/products`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
        Authorization: `Bearer ${auth.getFallback('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching store and products: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching store and products: ${error.message}`);
  }
}
