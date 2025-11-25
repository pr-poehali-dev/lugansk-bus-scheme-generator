const API_BASE_ROUTES = 'https://functions.poehali.dev/b315eae8-a920-4540-b3d1-ad7960ff83b1';
const API_BASE_STOPS = 'https://functions.poehali.dev/f28f725e-69a0-4ccc-ad19-2eceb8c2f702';

export interface Route {
  id: number;
  number: string;
  name: string;
  color: string;
  type: string;
  stops?: number;
  duration?: string;
}

export interface Stop {
  id: number;
  name: string;
  time?: string;
  position: number;
}

export interface RouteDetails extends Route {
  stops: Stop[];
}

export async function fetchRoutes(): Promise<Route[]> {
  const response = await fetch(API_BASE_ROUTES);
  if (!response.ok) {
    throw new Error('Failed to fetch routes');
  }
  return response.json();
}

export async function fetchRouteByNumber(number: string): Promise<RouteDetails> {
  const response = await fetch(`${API_BASE_ROUTES}?number=${number}`);
  if (!response.ok) {
    throw new Error('Failed to fetch route details');
  }
  return response.json();
}

export async function updateRoute(number: string, data: { name: string }): Promise<void> {
  const response = await fetch(`${API_BASE_ROUTES}?number=${number}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update route');
  }
}

export async function createStop(data: {
  route_id: number;
  name: string;
  time: string;
  position: number;
}): Promise<Stop> {
  const response = await fetch(API_BASE_STOPS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create stop');
  }
  
  return response.json();
}

export async function updateStop(id: number, data: Partial<Stop>): Promise<void> {
  const response = await fetch(`${API_BASE_STOPS}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update stop');
  }
}
