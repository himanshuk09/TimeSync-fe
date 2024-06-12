import axios from 'axios';

export const Login = async (user: Object) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')} `;
      return config;
    },
    (error) => Promise.reject(error)
  );
  const data = await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/auth/login`, user);
  return data;
};

export const signUp = async (user: Object) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/auth/signup`, user);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id: any, UserData: Object) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BACKEND_API_KEY}/auth/${id}`, UserData);
  } catch (error) {
    console.error(error);
  }
};

// {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
//   },
// }

const getCurrentUser = () => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  return accessToken;
};

export const checkToken = () => {
  const accessToken = getCurrentUser();
  if (accessToken) {
    return axios
      .get(`${process.env.REACT_APP_BACKEND_API_KEY}/auth/check-token`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Update user info in local storage if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      });
  }
  return Promise.reject('No token found');
};

export const uploadImage = (data: any) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/auth/upload-file`, data);
};
