const OWNER_TOKEN_KEY = 'gems_owner_token';

/**
 * Device secret stored in localStorage so a visitor who never signs in still
 * owns the gifts they create - and can claim them later by logging in.
 * The server sees it as the `x-owner-token` header.
 */
export function getOwnerToken(): string {
  try {
    const existing = localStorage.getItem(OWNER_TOKEN_KEY);
    if (existing && existing.length >= 16) return existing;
    const created =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `ot-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
    localStorage.setItem(OWNER_TOKEN_KEY, created);
    return created;
  } catch {
    // Private browsing with storage disabled - fall back to an ephemeral token.
    return `ot-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
  }
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message?: string) {
    super(message || code);
    this.status = status;
    this.code = code;
  }
}

/** True when the failure is just "you are not signed in". */
export const isAuthError = (err: unknown): boolean =>
  err instanceof ApiError && (err.status === 401 || err.code === 'auth_required');

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  const isForm = typeof FormData !== 'undefined' && init.body instanceof FormData;
  if (init.body && !isForm) headers.set('Content-Type', 'application/json');
  headers.set('x-owner-token', getOwnerToken());

  let res: Response;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60000);
  try {
    res = await fetch(path, {
      ...init,
      headers,
      credentials: 'include',
      signal: controller.signal,
    });
  } catch {
    throw new ApiError(0, 'network_error', 'Could not reach the server. Check your connection.');
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      res.status,
      (data && data.error) || 'request_failed',
      (data && data.message) || 'Something went wrong.'
    );
  }
  return data as T;
}
