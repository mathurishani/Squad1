import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CoursesTable = ({ courses }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>Course ID</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={course.course_id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {course.course_id}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {course.course_name}
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesTable;
