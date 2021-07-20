import React from 'react';
import CourseContent from './CourseContent';

export default function SideNav() {
  return (
    <div className=" container hidden md:block md:col-span-2 border-r-4 max-h-screen overflow-auto">
      <CourseContent />
    </div>
  );
}
