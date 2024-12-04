import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ExamsTable = ({ exams }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>Exam ID</th>
          <th className='border border-slate-600 rounded-md'>Course ID</th>
          <th className='border border-slate-600 rounded-md'>Exam date</th>
          </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
          <tr key={exam.exam_id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {exam.exam_id}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {exam.course_id}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {exam.formatted_date}
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExamsTable;
