import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SquadHome = () => {
  const { eid } = useParams(); // Extract `eid` from the URL
  const [employee, setEmployee] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  const myStyle = {
    backgroundImage: "url('https://assets.telegraphindia.com/telegraph/2022/Jul/1657624371_gujarat_board_exam.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/employees/eid/${eid}`);
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to fetch employee details. Please try again.");
        console.error(err);
      }
    };

    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/assignments/emp_id/${eid}`);
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to fetch assignments. Please try again.");
        console.error(err);
      }
    };

    fetchEmployee();
    fetchAssignments();
  }, [eid]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!employee) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div style={myStyle}>
      <div className="flex p-6 mx-auto max-w-6xl bg-white shadow-lg rounded-lg">
        {/* Employee Details Card */}
        <div className="w-1/2 p-6 border-r border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Squad Member Details</h1>
          <div className="space-y-4">
            <div><strong>EID:</strong> {employee.eid}</div>
            <div><strong>Name:</strong> {employee.ename}</div>
            <div><strong>Address:</strong> {employee.address}</div>
            <div><strong>College ID:</strong> {employee.collegeid}</div>
            <div><strong>Years of Experience:</strong> {employee.yr_of_exp}</div>
            <div><strong>Years in Squad:</strong> {employee.yr_of_exp_in_squad}</div>
            <div><strong>Zone:</strong> {employee.zone}</div>
            <div><strong>Subject ID:</strong> {employee.subject_id}</div>
            <div><strong>Phone:</strong> {employee.phone}</div>
            <div><strong>Email:</strong> {employee.email}</div>
          </div>
        </div>

        {/* Assignments Card */}
        {/* Assignments Card */}
<div className="w-1/2 p-6">
  {/* Static Heading */}
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Assigned College, Course, and Exam Details
  </h2>
  
  {/* Scrollable Content */}
  <div className="overflow-y-auto max-h-80 space-y-4">
    {assignments.length > 0 ? (
      assignments.map((assignment, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
          <div><strong>College Name:</strong> {assignment.college_cname}</div>
          <div><strong>College Address:</strong> {assignment.college_address}</div>
          <div><strong>College Zone:</strong> {assignment.college_zone}</div>
          <div><strong>Course ID:</strong> {assignment.course_id}</div>
          <div><strong>Exam ID:</strong> {assignment.exam_id}</div>
          <div><strong>Exam Date:</strong> {new Date(assignment.exam_date).toLocaleDateString()}</div>
          <div className="mt-2 text-center">
            <a 
              href="https://forms.gle/we6SXf3DrwEcAKTy9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Give Feedback
            </a>
          </div>
        </div>
      ))
    ) : (
      <div className="text-gray-500">No assignments found for this employee.</div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default SquadHome;
