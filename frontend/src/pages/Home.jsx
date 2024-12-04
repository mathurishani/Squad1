import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import EmployeesTable from "../components/home/EmployeeTable";
import CollegesTable from "../components/home/CollegeTable";
import CoursesTable from "../components/home/CourseTabla";
import ExamsTable from "../components/home/ExanTable";

const Home = () => {
  const fetchData = async (url, setter, setLoading) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setter(response.data.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    } finally {
      setLoading(false);
    }
  };
  
  const [employees, setEmployees] = useState([]);
  const [colleges, setColleges] = useState([]);

  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [showType, setShowType] = useState("table"); // 'table' or 'card'
  const [showZone1Colleges, setShowZone1Colleges] = useState(false);
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(false);
  const [assignmentResults, setAssignmentResults] = useState([]);
  const [loadingassignments, setLoadingAssignments] = useState(false);

  // useEffect(() => {
  //   // Fetch employees
  //   setLoadingEmployees(true);
  //   axios
  //     .get("http://localhost:5555/employees")
  //     .then((response) => {
  //       setEmployees(response.data.data);
  //       setLoadingEmployees(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoadingEmployees(false);
  //     });

  //   // Fetch colleges
  //   setLoadingColleges(true);
  //   axios
  //     .get("http://localhost:5555/colleges")
  //     .then((response) => {
  //       setColleges(response.data.data);
  //       setLoadingColleges(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoadingColleges(false);
  //     });

  //   // Fetch courses
  //   setLoadingCourses(true);
  //   axios
  //     .get("http://localhost:5555/courses")
  //     .then((response) => {
  //       setCourses(response.data.data);
  //       setLoadingCourses(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoadingCourses(false);
  //     });

  //   // Fetch exams
  //   setLoadingExams(true);
  //   axios
  //     .get("http://localhost:5555/exams")
  //     .then((response) => {
  //       setExams(response.data.data);
  //       setLoadingExams(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoadingExams(false);
  //     });
  // }, []);

  useEffect(() => {
    fetchData('http://localhost:5555/employees', setEmployees, setLoadingEmployees);
    fetchData('http://localhost:5555/colleges', setColleges, setLoadingColleges);
    fetchData('http://localhost:5555/courses', setCourses, setLoadingCourses);
    fetchData('http://localhost:5555/exams', setExams, setLoadingExams);
  }, []);
  
  const zone1Colleges = colleges.filter((college) => college.czone === "1");

  const handleRandomAssignment = async () => {
    setLoadingAssignments(true);
  
    const results = employees.map((employee) => {
      const eligibleColleges = colleges.filter(
        (college) =>
          college.czone === employee.zone &&
          college.cid !== employee.collegeid
      );
  
      const eligibleCourses = courses.filter(
        (course) => course.course_id === employee.subject_id
      );
  
      const eligibleExams = exams.filter(
        (exam) => exam.course_id === employee.subject_id
      );
  
      if (eligibleColleges.length && eligibleExams.length && eligibleCourses.length) {
        const randomCollege = eligibleColleges[Math.floor(Math.random() * eligibleColleges.length)];
        const randomExam = eligibleExams[Math.floor(Math.random() * eligibleExams.length)];
  
        return {
          emp_id: employee.eid,
          emp_name: employee.ename,
          college_cid: randomCollege.cid,
          college_cname: randomCollege.cname,
          college_address: randomCollege.address,
          college_zone: randomCollege.czone,
          course_id: employee.subject_id,
          exam_id: randomExam.exam_id,
          exam_date: new Date(randomExam.exam_date).toISOString(),
        };
      }
      return null;
    });
  
    const finalResults = results.filter(Boolean);
    setAssignmentResults(finalResults);
  
    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:5555/assignments", { assignments: finalResults });
      console.log("Assignments saved successfully:", response.data);
     // setAssignmentResults(response.data.data); 
    } catch (error) {
      console.error("Error saving assignments:", error);
    } finally {
      setLoadingAssignments(false);
    }
  };
  

  return (
    <div className="p-4">
      {/* Toggle Display Type */}
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {/* Employees Section */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl my-4">Employees List</h1>
      </div>
      {loadingEmployees ? (
        <Spinner />
      ) : (
        <EmployeesTable employees={employees} />
      )}

      {/* Colleges Section */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl my-4">Colleges List</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 rounded-lg"
          onClick={() => setShowZone1Colleges(!showZone1Colleges)}
        >
          {showZone1Colleges ? "Hide Zone 1 Colleges" : "Show Zone 1 Colleges"}
        </button>
      </div>
      {loadingColleges ? <Spinner /> : <CollegesTable colleges={colleges} />}

      {/* Zone 1 Colleges Section */}
      {showZone1Colleges && (
        <div className="mt-8">
          <h1 className="text-3xl my-4">Zone 1 Colleges</h1>
          <CollegesTable colleges={zone1Colleges} />
        </div>
      )}

      {/* Courses Section */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl my-4">Courses List</h1>
      </div>
      {loadingCourses ? <Spinner /> : <CoursesTable courses={courses} />}

      {/* Exams Section */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl my-4">Exams List</h1>
      </div>
      {loadingExams ? <Spinner /> : <ExamsTable exams={exams} />}

      {/* Assignments Section */}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-3xl my-4">Assignments</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 rounded-lg"
          onClick={handleRandomAssignment}
        >
          Random Assignment
        </button>
      </div>
      {loadingassignments ? (
        <Spinner />
      ) : assignmentResults.length ? (
        <table className="w-full border-separate border-spacing-2 mt-8">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">Emp ID</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">College ID</th>
              <th className="border border-slate-600 rounded-md">
                College Name
              </th>
              <th className="border border-slate-600 rounded-md">Address</th>
              <th className="border border-slate-600 rounded-md">Zone</th>
              <th className="border border-slate-600 rounded-md">Course ID</th>
              <th className="border border-slate-600 rounded-md">Exam ID</th>
              <th className="border border-slate-600 rounded-md">Exam Date</th>
            </tr>
          </thead>
          <tbody>
            {assignmentResults.map((result, index) => (
              <tr key={index}>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.emp_id}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.emp_name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.college_cid}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.college_cname}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.college_address}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.college_zone}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.course_id}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.exam_id}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {result.exam_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-lg mt-8">No assignments made yet.</p>
      )}
    </div>
  );
};

export default Home;
