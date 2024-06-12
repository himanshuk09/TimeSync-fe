import axios from 'axios';

export const getClasses = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/classes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addClass = async (classes: Object) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/classes`, classes);
  } catch (error) {
    console.error(error);
  }
};
export const getClassById = async (id: any) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/classes/${id}`);
  } catch (error) {
    console.error(error);
  }
};
export const deleteClass = async (id: any) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}/classes/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const updateClass = async (id: any, classes: Object) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BACKEND_API_KEY}/classes/${id}`, classes);
  } catch (error) {
    console.error(error);
  }
};
