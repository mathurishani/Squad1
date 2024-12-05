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
  const [activeSection, setActiveSection] = useState("employees");

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
    fetchData(
      "http://localhost:5555/employees",
      setEmployees,
      setLoadingEmployees
    );
    fetchData(
      "http://localhost:5555/colleges",
      setColleges,
      setLoadingColleges
    );
    fetchData("http://localhost:5555/courses", setCourses, setLoadingCourses);
    fetchData("http://localhost:5555/exams", setExams, setLoadingExams);
  }, []);

  const zone1Colleges = colleges.filter((college) => college.czone === "1");

  const handleRandomAssignment = async () => {
    setLoadingAssignments(true);

    const finalResults = [];
    const zones = ["A", "B", "C", "D", "E"]; // Adjust based on your zone logic

    colleges.forEach((college) => {
      exams
        .filter((exam) => college.course_ids.includes(exam.course_id))
        .forEach((exam) => {
          let eligibleEmployees = employees.filter(
            (employee) =>
              employee.subject_ids.includes(exam.course_id) &&
              employee.collegeid !== college.cid
          );

          if (eligibleEmployees.length < 3) {
            // Look in adjacent zones
            const currentZoneIndex = zones.indexOf(college.czone);
            const alternateZones = [
              zones[currentZoneIndex - 1],
              zones[currentZoneIndex + 1],
            ].filter((zone) => zone);

            for (const altZone of alternateZones) {
              const zoneEmployees = employees.filter(
                (employee) =>
                  employee.zone === altZone &&
                  employee.subject_ids.includes(exam.course_id) &&
                  employee.collegeid !== college.cid
              );
              eligibleEmployees.push(...zoneEmployees);
              if (eligibleEmployees.length >= 3) break;
            }
          }

          if (eligibleEmployees.length < 3) {
            console.warn(
              `Not enough employees available for College: ${college.cname}, Exam: ${exam.exam_id}`
            );
            // finalResults.push({
            //   emp_id: 0,
            //   emp_name: 0,
            //   college_cid: 0,
            //   college_cname: 0,
            //   college_address: 0,
            //   college_zone: 0,
            //   course_id: 0,
            //   exam_id: 0,
            //   exam_date: 0,
            //   post: 0,
            // });
            return;
          }

          // Sort and assign roles
          const sortedEmployees = [...eligibleEmployees].sort((a, b) => {
            if (b.yr_of_exp_in_squad !== a.yr_of_exp_in_squad) {
              return b.yr_of_exp_in_squad - a.yr_of_exp_in_squad;
            }
            if (b.yr_of_exp !== a.yr_of_exp) {
              return b.yr_of_exp - a.yr_of_exp;
            }
            return Math.random() - 0.5; // Tie-breaker random
          });

          const posts = ["Chairman", "Member", "Member"];
          sortedEmployees.slice(0, 3).forEach((employee, index) => {
            finalResults.push({
              emp_id: employee.eid,
              emp_name: employee.ename,
              college_cid: college.cid,
              college_cname: college.cname,
              college_address: college.address,
              college_zone: college.czone,
              course_id: exam.course_id,
              exam_id: exam.exam_id,
              exam_date: new Date(exam.exam_date).toISOString(),
              post: posts[index],
            });
          });
        });
    });

    try {
      const response = await axios.post("http://localhost:5555/assignments", {
        assignments: finalResults,
      });
      console.log("Assignments saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving assignments:", error);
    } finally {
      setAssignmentResults(finalResults);
      setLoadingAssignments(false);
    }
  };

  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <nav className="flex justify-around items-center bg-gray-200 py-3 shadow-md sticky top-0 z-50">
        {["employees", "colleges", "courses", "exams", "assignments"].map(
          (section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg ${
                activeSection === section
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-black hover:bg-gray-300"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
      </nav>
      {/* Conditional Rendering Based on Active Section */}
      <div className="mt-4">
        {activeSection === "employees" && (
          <div>
            <h1 className="text-3xl my-4">Employees List</h1>
            {loadingEmployees ? (
              <Spinner />
            ) : (
              <EmployeesTable employees={employees} />
            )}
          </div>
        )}
        {activeSection === "colleges" && (
          <div>
            <h1 className="text-3xl my-4">Colleges List</h1>
            {loadingColleges ? (
              <Spinner />
            ) : (
              <CollegesTable colleges={colleges} />
            )}
          </div>
        )}
        {activeSection === "courses" && (
          <div>
            <h1 className="text-3xl my-4">Courses List</h1>
            {loadingCourses ? <Spinner /> : <CoursesTable courses={courses} />}
          </div>
        )}
        {activeSection === "exams" && (
          <div>
            <h1 className="text-3xl my-4">Exams List</h1>
            {loadingExams ? <Spinner /> : <ExamsTable exams={exams} />}
          </div>
        )}

        {activeSection === "assignments" && (
          <div>
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
                    <th className="border border-slate-600 rounded-md">
                      Emp ID
                    </th>
                    <th className="border border-slate-600 rounded-md">Name</th>
                    <th className="border border-slate-600 rounded-md">
                      College ID
                    </th>
                    <th className="border border-slate-600 rounded-md">
                      College Name
                    </th>
                    <th className="border border-slate-600 rounded-md">
                      Address
                    </th>
                    <th className="border border-slate-600 rounded-md">Zone</th>
                    <th className="border border-slate-600 rounded-md">
                      Course ID
                    </th>
                    <th className="border border-slate-600 rounded-md">
                      Exam ID
                    </th>
                    <th className="border border-slate-600 rounded-md">
                      Exam Date
                    </th>
                    <th className="border border-slate-600 rounded-md">Post</th>
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
                      <td className="border border-slate-700 rounded-md text-center">
                        {result.post}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-lg mt-8">
                No assignments made yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
