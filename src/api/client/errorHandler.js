export function handleApiError(error) {
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return {
        status: 408,
        message: 'Request timeout. Please check your network connection and try again.',
        isNetworkError: true,
      };
    }
    return {
      status: 0,
      message: 'Network connection lost. Please check your internet connection.',
      isNetworkError: true,
    };
  }

  const { status, data } = error.response;
  const customMessage = data?.message || data?.error || null;

  switch (status) {
    case 400:
      return {
        status,
        message: customMessage || 'Bad Request: The server could not understand your request.',
        details: data?.errors || null,
      };

    case 401:
      return {
        status,
        message: customMessage || 'Unauthorized: Your session has expired. Please log in again.',
        requiresAuth: true,
      };

    case 403:
      return {
        status,
        message: customMessage || 'Forbidden: You do not have permission to access this resource.',
      };

    case 404:
      return {
        status,
        message: customMessage || 'Not Found: The requested API endpoint or item was not found.',
      };

    case 409:
      return {
        status,
        message: customMessage || 'Conflict: A duplicate resource conflict occurred on the server.',
      };

    case 422:
      return {
        status,
        message: customMessage || 'Validation Error: Please verify input data formatting.',
        validationErrors: data?.errors || [],
      };

    case 429:
      return {
        status,
        message: customMessage || 'Too Many Requests: You have exceeded the rate limit. Please try again later.',
      };

    case 500:
      return {
        status,
        message: customMessage || 'Internal Server Error: An unexpected error occurred on the server.',
      };

    case 502:
    case 503:
    case 504:
      return {
        status,
        message: customMessage || 'Service Unavailable: The server is currently overloaded or undergoing maintenance.',
      };

    default:
      return {
        status,
        message: customMessage || `HTTP Error ${status}: Unexpected API error occurred.`,
      };
  }
}
