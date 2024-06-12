import axios from 'axios';

export const createClassSubjectMapping = async (classSubject: Object) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_API_KEY}/classsubjectmapping`,
      classSubject
    );
  } catch (error) {
    console.error(error);
  }
};

export const getClassSubjectMapping = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_KEY}/classsubjectmapping`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClassSubjectMapping = async (id: any) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_BACKEND_API_KEY}/classsubjectmapping/${id}`);
  } catch (error) {
    console.error(error);
  }
};
