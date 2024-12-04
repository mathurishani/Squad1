import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const CollegesTable = ({ colleges }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>CID</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Address
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Zone
          </th>
          {/* <th className='border border-slate-600 rounded-md'>College ID</th>
          <th className='border border-slate-600 rounded-md'>Course ID</th>
          <th className='border border-slate-600 rounded-md'>Phone</th>
          <th className='border border-slate-600 rounded-md'>Email</th> */}
        </tr>
      </thead>
      <tbody>
        {colleges.map((college, index) => (
          <tr key={college.cid} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {college.cid}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {college.cname}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {college.address}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {college.czone}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/colleges/details/${college.eid}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/colleges/edit/${college.eid}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/colleges/delete/${college.eid}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollegesTable;
