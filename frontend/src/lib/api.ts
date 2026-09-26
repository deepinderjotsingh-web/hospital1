// Typed fetch layer over the FastAPI backend. Base is the relative "/api" prefix so the
// same code works in dev (Vite proxies /api → :8001) and behind a single origin in prod.
const BASE = "/api";

// Fields are declared, not constructor parameter properties: tsconfig sets
// erasableSyntaxOnly, which rejects `constructor(readonly status: number)`.
export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`request failed with ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type JsonBody = unknown;

async function request<T>(method: string, path: string, body?: JsonBody): Promise<T> {
  // Auth rides the httpOnly session cookie automatically — never add auth headers here.
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  // FastAPI reports request-validation failures as 422 with a {detail: [...]} body.
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new ApiError(res.status, errBody);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// The response type is yours to declare: nothing infers across the Python boundary, so a
// TS interface here mirrors the endpoint's Pydantic model by hand — keep the two in sync.
export const apiGet = <T>(path: string) => request<T>("GET", path);
export const apiPost = <T>(path: string, body?: JsonBody) => request<T>("POST", path, body ?? null);
export const apiPut = <T>(path: string, body?: JsonBody) => request<T>("PUT", path, body ?? null);
export const apiPatch = <T>(path: string, body?: JsonBody) =>
  request<T>("PATCH", path, body ?? null);
export const apiDelete = <T>(path: string) => request<T>("DELETE", path);

// ——— SPS Medcare catalog models (mirrors backend/models/catalog.py) ———

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  sort_order: number;
  product_count: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category_slug: string;
  brand: string;
  short_desc: string;
  description: string;
  price: number;
  price_unit: string;
  moq: string;
  features: string[];
  specs: Record<string, string>;
  warranty: string;
  certification: string;
  image_url: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  product_name: string;
  created_at: string;
}
