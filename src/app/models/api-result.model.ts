export interface ApiResult<T> {
  succeeded: boolean;
  data: T | null;
  errors: string[];
}

export function unwrapApiResult<T>(result: ApiResult<T>): T {
  if (!result.succeeded || result.data === null || result.data === undefined) {
    throw new Error(result.errors?.[0] ?? 'Request failed.');
  }
  return result.data;
}
