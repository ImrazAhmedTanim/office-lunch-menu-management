import axios from 'axios';

const AuthService = {
  signup: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3500/olmm/signup', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.user.role || 'user';
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        return role;
      } else {
        return null;
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      return null;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3500/olmm/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.user.role || 'user';
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        return role;
      } else {
        return null;
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },
};

export default AuthService;