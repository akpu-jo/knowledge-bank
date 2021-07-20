import { createContext, useState } from 'react';

const CourseContext = createContext();

const CurrentCourse = localStorage.getItem('courseId')?localStorage.getItem('courseId'): null
function CourseContextProvider(props) {
  const [courseId, setCourseId] = useState(CurrentCourse)

  return (
    <CourseContext.Provider value={{ courseId, setCourseId }}>
      {props.children}
    </CourseContext.Provider>
  );
}

export { CourseContext, CourseContextProvider };