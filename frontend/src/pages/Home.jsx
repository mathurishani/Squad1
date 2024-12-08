import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import EmployeesTable from "../components/home/EmployeeTable";
import CollegesTable from "../components/home/CollegeTable";
import CoursesTable from "../components/home/CourseTabla";
import ExamsTable from "../components/home/ExanTable";
import logo from "../assets/AS_267466486288392@1440780388344_l.png";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignmentResults, setAssignmentResults] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingColleges, setLoadingColleges] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingExams, setLoadingExams] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [activeSection, setActiveSection] = useState("employees");

  const navigate = useNavigate(); // To redirect the user

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

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token or session data
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <header>
        <div className="header-content">
          <img src={logo} alt="Mumbai University Logo" className="logo" />
          <nav className="nav-links">
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <br></br><br></br><br></br><br></br>
      {/* Main Content */}
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
      </div>
      <Footer />
    </div>
  );
};

export default Home;
