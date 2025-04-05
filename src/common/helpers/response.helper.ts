import { ApiResponse } from '../interfaces/api-response.interface';
export function buildResponse<T>(
  data: T,
  message = 'Successful operation',
  code = 200,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    code,
  };
}
