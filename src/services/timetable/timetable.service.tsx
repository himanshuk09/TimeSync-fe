import axios from 'axios';

export const saveTimetable = async (timetableEntities: any) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_API_KEY}/timetable`,
      timetableEntities
    );
  } catch (error) {
    console.error(error);
  }
};

export const getAllTimetableDetails = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_KEY}/timetable`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTimetableByClassId = async (classId: any) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_KEY}/timetable/class/${classId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSavedTimetableClassNames = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_API_KEY}/timetable/class-names`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCompleteTimetableByClassId = async (classId: any) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_API_KEY}/timetable/${classId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const timetableData = [
  {
    subjectId: '65fc204b004281106d04ff4c',
    day: 'Monday',
    period: 'P1',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc203f004281106d04ff49',
    day: 'Monday',
    period: 'P2',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fd4fc80bf750684aa86eb8',
  },
  {
    subjectId: '65fc204b004281106d04ff4c',
    day: 'Monday',
    period: 'P3',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fd4fc80bf750684aa86eb8',
  },
  {
    subjectId: '65fc205a004281106d04ff4f',
    day: 'Monday',
    period: 'P4',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fd4fc80bf750684aa86eb8',
  },
  {
    subjectId: '65faa784712a5f11a8fe7e40',
    day: 'Monday',
    period: 'P5',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65faa784712a5f11a8fe7e40',
    day: 'Monday',
    period: 'P6',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Monday',
    period: 'P7',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2077004281106d04ff55',
    day: 'Tuesday',
    period: 'P1',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a447bdc19bfe313a212',
  },
  {
    subjectId: '65fc204b004281106d04ff4c',
    day: 'Tuesday',
    period: 'P2',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc203f004281106d04ff49',
    day: 'Tuesday',
    period: 'P3',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc204b004281106d04ff4c',
    day: 'Tuesday',
    period: 'P4',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc204b004281106d04ff4c',
    day: 'Tuesday',
    period: 'P5',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc203f004281106d04ff49',
    day: 'Tuesday',
    period: 'P6',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc203f004281106d04ff49',
    day: 'Tuesday',
    period: 'P7',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ffb004281106d04ff41',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P7',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P6',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P5',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P4',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P3',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P2',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Wednesday',
    period: 'P1',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P1',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P2',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P3',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P4',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P5',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P6',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2030004281106d04ff46',
    day: 'Thursday',
    period: 'P7',
    classId: '65f990d84823670a61600d1e',
    teacherId: '65fc1ee6004281106d04fef0',
  },
  {
    subjectId: '65fc2063004281106d04ff52',
    day: 'Friday',
    period: 'P4',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
  {
    subjectId: '65fc2063004281106d04ff52',
    day: 'Friday',
    period: 'P3',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
  {
    subjectId: '65fc2063004281106d04ff52',
    day: 'Friday',
    period: 'P2',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a447bdc19bfe313a212',
  },
  {
    subjectId: '65fc205a004281106d04ff4f',
    day: 'Friday',
    period: 'P1',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
  {
    subjectId: '65fc205a004281106d04ff4f',
    day: 'Friday',
    period: 'P5',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
  {
    subjectId: '65fc2063004281106d04ff52',
    day: 'Friday',
    period: 'P6',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
  {
    subjectId: '65fc205a004281106d04ff4f',
    day: 'Friday',
    period: 'P7',
    classId: '65f990d84823670a61600d1e',
    teacherId: '66051a2f7bdc19bfe313a1fc',
  },
];
