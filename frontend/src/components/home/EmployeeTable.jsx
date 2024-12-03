import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const EmpployeesTable = ({ employees }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>EID</th>
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
        {employees.map((employee, index) => (
          <tr key={employee.eid} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {employee.ename}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {employee.address}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {employee.zone}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/employees/details/${employee.eid}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/employees/edit/${employee.eid}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/employees/delete/${employee.eid}`}>
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

export default EmployeesTable;
