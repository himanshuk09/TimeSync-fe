import axios from 'axios';

export const getSubjects = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/subjects`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addSubjects = async (subject: Object) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/subjects`, subject);
  } catch (error) {
    console.error(error);
  }
};

export const deleteSubject = async (id: any) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}/subjects/${id}`);
  } catch (error) {
    console.error(error);
  }
};
export const updateSubject = async (id: any, subject: Object) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BACKEND_API_KEY}/subjects/${id}`, subject);
  } catch (error) {
    console.error(error);
  }
};
// axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')} `;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
