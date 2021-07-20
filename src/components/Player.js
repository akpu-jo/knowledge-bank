import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { CourseContext } from '../context/CourseContext';
import { RefreshIcon, ViewGridIcon } from '@heroicons/react/solid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'COURSE_REQUEST':
      return { ...state, loading: true };
    case 'COURSE_SUCCESS':
      return { ...state, loading: false, course: action.payload, error: '' };
    case 'COURSE_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function Player() {
  const { courseId } = useContext(CourseContext);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    course: [],
  });

  const { loading, error, course } = state;

  const loadCourse = async () => {
    dispatch({ type: 'COURSE_REQUEST' });
    try {
      const { data } = await axios.get(
        'https://knowledge-bank-hygeia.herokuapp.com/api/course/' + courseId
      );

      dispatch({ type: 'COURSE_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'COURSE_FAIL', payload: err.message });
    }
  };

  useEffect(() => {
    loadCourse();
    console.log(courseId);
    console.log(course);
  }, [courseId]);

  return (
    <div className="md:col-span-5 md:px-3 sticky top-14 md:top-20 z-10 bg-white pt-4 shadow-sm">
      {loading ? (
        <button
          className=" text-blue-700 m-auto w-full h-full bg-green-50"
          disabled
        >
          <ViewGridIcon className="animate-spin w-14 h-14 m-auto"></ViewGridIcon>
        </button>
      ) : (
        <>
          <div className=" aspect-w-16 aspect-h-9">
            <iframe
              src={course.src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen="allowfullscreen"
            ></iframe>
          </div>
          <h2 className="p-2 border md:hidden ">Course Content</h2>
        </>
      )}
    </div>
  );
}
