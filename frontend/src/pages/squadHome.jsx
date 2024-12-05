import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SquadHome = () => {
  const { eid } = useParams(); // Extract `eid` from the URL
  const [employee, setEmployee] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch employee details by `eid`
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/employees/eid/${eid}`
        );
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to fetch employee details. Please try again.");
        console.error(err);
      }
    };

    // Fetch assignments for the employee by `eid`
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/assignments/emp_id/${eid}`
        );
        setAssignments(response.data);
      } catch (err) {
       // setError("Failed to fetch assignments. Please try again.");
        console.error(err);
      }
    };

    fetchEmployee();
    fetchAssignments();
  }, [eid]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-3xl bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        Squad Member Details
      </h1>
      <div className="space-y-4">
        <div>
          <strong>EID:</strong> {employee.eid}
        </div>
        <div>
          <strong>Name:</strong> {employee.ename}
        </div>
        <div>
          <strong>Address:</strong> {employee.address}
        </div>
        <div>
          <strong>College ID:</strong> {employee.collegeid}
        </div>
        <div>
          <strong>Years of Experience:</strong> {employee.yr_of_exp}
        </div>
        <div>
          <strong>Years in Squad:</strong> {employee.yr_of_exp_in_squad}
        </div>
        <div>
          <strong>Zone:</strong> {employee.zone}
        </div>
        <div>
          <strong>Subject ID:</strong>{" "}
          {employee.subject_ids.length > 0
            ? employee.subject_ids.join(", ") // Join course IDs with a comma
            : "No courses assigned"}
        </div>
        <div>
          <strong>Phone:</strong> {employee.phone}
        </div>
        <div>
          <strong>Email:</strong> {employee.email}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-8">
        Assigned College, Course, and Exam Details
      </h2>
      <div className="space-y-4">
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div key={index} className="p-4 border rounded-md">
              <div>
                <strong>College Name:</strong> {assignment.college_cname}
              </div>
              <div>
                <strong>College Address:</strong> {assignment.college_address}
              </div>
              <div>
                <strong>College Zone:</strong> {assignment.college_zone}
              </div>
              <div>
                <strong>Course ID:</strong> {assignment.course_id}
              </div>
              <div>
                <strong>Exam ID:</strong> {assignment.exam_id}
              </div>
              <div>
                <strong>Exam Date:</strong>{" "}
                {new Date(assignment.exam_date).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div>No assignments found for this employee.</div>
        )}
      </div>

      {/* Feedback Button */}
      <div className="mt-8">
        <a
          href="https://forms.gle/we6SXf3DrwEcAKTy9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Give Feedback
        </a>
      </div>
    </div>
  );
};

export default SquadHome;
