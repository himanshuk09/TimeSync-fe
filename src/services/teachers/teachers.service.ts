import axios from 'axios';

export const getTeachers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/teachers`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addTeachers = async (teacher: Object) => {
  try {
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_KEY}/teachers`, teacher);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTeacher = async (id: any) => {
  try {
    console.log('id', id);
    return await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}/teachers/${id}`);
  } catch (error) {
    console.error(error);
  }
};
export const updateTeacher = async (id: any, teacher: Object) => {
  try {
    return await axios.put(`${process.env.REACT_APP_BACKEND_API_KEY}/teachers/${id}`, teacher);
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherBySubjectId = async (id: any) => {
  try {
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/teachers/subjectId/${id}`);
  } catch (error) {
    console.error(error);
  }
};
