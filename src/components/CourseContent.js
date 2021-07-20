import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ViewGridIcon } from '@heroicons/react/solid';
import { CourseContext } from '../context/CourseContext';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'MODULE_REQUEST':
      return { ...state, loading: true };
    case 'MODULE_SUCCESS':
      return { ...state, loading: false, modules: action.payload, error: '' };
    case 'MODULE_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function CourseContent() {
  const { setCourseId } = useContext(CourseContext);
  const [checked, setChecked] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    modules: [],
  });

  const { loading, error, modules } = state;

  const loadModules = async () => {
    dispatch({ type: 'MODULE_REQUEST' });
    try {
      const { data } = await axios.get(
        'https://knowledge-bank-hygeia.herokuapp.com/api/module'
      );

      dispatch({ type: 'MODULE_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'MODULE_FAIL', payload: err.message });
    }
  };

  useEffect(() => {
    loadModules();
  }, []);

  return (
    <div className=" text-2xl font-head ">
      <h2 className="p-4 border hidden md:block ">Course Content</h2>
      {loading ? (
        <button className=" text-blue-700 m-auto w-full h-full bg-green-50" disabled>
            <ViewGridIcon className="animate-spin w-14 h-14 m-auto">

            </ViewGridIcon>
        </button>
      ) : error ? <div className="">{error}</div> :(
  
      <div className=" w-full pt-2 bg-white rounded-2xl ">
        {modules.map((module) => (
          <Disclosure key={module._id}>
            {({ open }) => (
              <>
                <Disclosure.Button className=" w-full h-24 mb border-b-2 px-6 py-2 text-lg font-bold text-left text-blue-900 bg-blue-50 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <div className="flex justify-between">
                    <span>
                      {module.module}: {module.moduleTitle}
                    </span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-8 h-8 text-blue-700`}
                    />
                  </div>
                  <p className=" text-base font-light">
                    {module.courses.length} Videos
                  </p>
                </Disclosure.Button>
                {module.courses.map((course, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <Disclosure.Panel
                      key={course.title}
                      className="text-base font-semibold"
                    >
                      <Link to={`/${module.module}/${course.title}`}>
                        <button
                          className={`${
                            isActive ? ' bg-gray-200 shadow-lg text-xl' : ''
                          } text-left p-4 w-full h-20 text-blue-600`}
                          onClick={() => {
                            setActiveIndex(index);
                            setCourseId(course._id);
                            localStorage.setItem('courseId', course._id)
                          }}
                        >
                          {course.title}
                        </button>
                      </Link>
                    </Disclosure.Panel>
                  );
                })}
              </>
            )}
          </Disclosure>
        ))}
      </div>
      )}
      </div>
  );
}
