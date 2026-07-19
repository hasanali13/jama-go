import { HttpErrorResponse } from '@angular/common/http';

/** Extracts a user-facing message from API / HTTP failures. */
export function getApiErrorMessage(error: unknown, fallback = 'Request failed.'): string {
  if (error instanceof HttpErrorResponse) {
    const fromBody = readApiErrors(error.error);
    if (fromBody) {
      return fromBody;
    }

    if (error.status === 0) {
      return 'Unable to reach the server. Check that the API is running.';
    }

    if (error.status === 401) {
      return 'Invalid email or password.';
    }

    if (error.status === 403) {
      return 'You do not have permission to perform this action.';
    }

    if (error.status >= 500) {
      return 'Server error. Please try again later.';
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

function readApiErrors(body: unknown): string | null {
  if (!body || typeof body !== 'object') {
    return typeof body === 'string' && body.trim() ? body.trim() : null;
  }

  const record = body as Record<string, unknown>;

  if (Array.isArray(record['errors'])) {
    const messages = record['errors']
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => item.trim());
    if (messages.length) {
      return messages.join(' ');
    }
  }

  if (typeof record['message'] === 'string' && record['message'].trim()) {
    return record['message'].trim();
  }

  if (typeof record['title'] === 'string' && record['title'].trim()) {
    return record['title'].trim();
  }

  return null;
}
