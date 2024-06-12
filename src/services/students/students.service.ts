import axios from 'axios';

export const getStudents = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/students`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addStudents = async (student: Object) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/students`, student);
  } catch (error) {
    console.error(error);
  }
};
export const deleteStudent = async (id: any) => {
  try {
    console.log(id);
    return await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}/students/${id}`);
  } catch (error) {
    console.error(error);
  }
};
export const updateStudent = async (id: any, student: Object) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BACKEND_API_KEY}/students/${id}`, student);
  } catch (error) {
    console.error(error);
  }
};
