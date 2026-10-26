const API_BASE = '/api';

class ApiClient {
  getToken() {
    return localStorage.getItem('vardha_admin_token') || sessionStorage.getItem('vardha_admin_token');
  }

  setToken(token, remember = true) {
    if (remember) {
      localStorage.setItem('vardha_admin_token', token);
    } else {
      sessionStorage.setItem('vardha_admin_token', token);
    }
  }

  clearToken() {
    localStorage.removeItem('vardha_admin_token');
    sessionStorage.removeItem('vardha_admin_token');
    localStorage.removeItem('vardha_admin_profile');
  }

  getHeaders(isMultipart = false) {
    const headers = {};
    if (!isMultipart) {
      headers['Content-Type'] = 'application/json';
    }
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const headers = { ...this.getHeaders(options.isMultipart), ...options.headers };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'omit'
      });

      // Attempt to parse JSON response
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        // If 401 Unauthorized, notify auth listener
        if (response.status === 401) {
          window.dispatchEvent(new CustomEvent('vardha:unauthorized'));
        }
        const error = new Error(data?.message || `HTTP Error ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      // Re-throw standardized error
      throw err;
    }
  }

  get(endpoint, params = null) {
    let url = endpoint;
    if (params) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, val);
        }
      });
      const qs = query.toString();
      if (qs) {
        url += (url.includes('?') ? '&' : '?') + qs;
      }
    }
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request('/upload/image', {
      method: 'POST',
      body: formData,
      isMultipart: true
    });
  }

  async uploadMultiple(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.request('/upload/multiple', {
      method: 'POST',
      body: formData,
      isMultipart: true
    });
  }
}

export const api = new ApiClient();
export default api;
