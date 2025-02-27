import "./home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import profImage from "../../assets/profile.png";
import Footer from "../../components/Footer/Footer";
import logo from '../../assets/logo.jpg'

const Home = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [postedJobs, setPostedJobs] = useState(0);
  const [postedCompanies, setPostedCompanies] = useState(0);
  const [postedCandidate, setPostedCandidate] = useState(0);
  const [postedApplication, setPostedApplication] = useState(0);

  useEffect(() => {
    let i = 1;
    let j = 1;
    let k = 1;
    let l = 1;
    const timer = setInterval(() => {
      setPostedJobs(i);
      i++;
      if (i > 100) {
        clearInterval(timer);
      }
    }, 30);
    const timer1 = setInterval(() => {
      setPostedCompanies(j);
      j++;
      if (j > 70) {
        clearInterval(timer1);
      }
    }, 30);
    const timer2 = setInterval(() => {
      setPostedCandidate(k);
      k++;
      if (k > 120) {
        clearInterval(timer2);
      }
    }, 30);
    const timer3 = setInterval(() => {
      setPostedApplication(l);
      l++;
      if (l > 130) {
        clearInterval(timer3);
      }
    }, 30);
    return () => {
      clearInterval(timer);
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/job-service/api/jobs`)
      .then((res) => {
        setJobDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <div className="homeContainer">
      <div className="mainContainer">
        <Navbar />
      </div>
      <div className="heroContainer">
        <div>
          <div className="numericalContainer">
            <div className="numberBox">
              <h1 className="number">{postedJobs}</h1>
              <p className="numberName">Jobs Posted</p>
            </div>
            <div className="numberBox">
              <h1 className="number">{postedCompanies}</h1>
              <p className="numberName">Companies</p>
            </div>
            <div className="numberBox">
              <h1 className="number">{postedCandidate}</h1>
              <p className="numberName">Candidates</p>
            </div>
            <div className="numberBox">
              <h1 className="number">{postedApplication}</h1>
              <p className="numberName">Job Applications</p>
            </div>
          </div>
          <div className="mainHome">
            <div className="profileConatiner" style={{ marginLeft: "40px" }}>
              <h1 className="title">NEW JOB FEATURES</h1>
              {jobDetails.map((jobs, index) => (
                <Link
                  to={`/job/${jobs.jobId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="profileCard" key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <img src={jobs.profileImage} alt="" className="cardProfile" />
                      <div>
                        <p className="jobTitle" style={{fontWeight:'bold'}}>{jobs.title}</p>
                        <p className="jobTitle">{jobs.companyName}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <LocationOnIcon htmlColor="red" />
                      <p className="">{jobs.location}</p>
                    </div>
                    <div>
                      <p>Expires On</p>
                      <p className="" style={{fontWeight:'bold', color:'#2d6a4f'}}>{jobs.deadline}</p>
                    </div>
                    <p className="workTime">{jobs.workTime}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="homeCategoryBox">
              <h1 className="title">JOB CATEGORIES</h1>
              <div className="categoryContent" id="nextContent">
                <p className="category">Information Technology (IT)</p>
                <p className="categoryAmount">25</p>
              </div>
              <div className="categoryContent">
                <p className="category">Sales and Marketing</p>
                <p className="categoryAmount">10</p>
              </div>
              <div className="categoryContent" id="nextContent">
                <p className="category">Business Management</p>
                <p className="categoryAmount">05</p>
              </div>
              <div className="categoryContent">
                <p className="category">School Leavers</p>
                <p className="categoryAmount">15</p>
              </div>
              <div className="categoryContent" id="nextContent">
                <p className="category">Internship / Undergraduate</p>
                <p className="categoryAmount">23</p>
              </div>
              <div className="categoryContent">
                <p className="category">Digital Marketing</p>
                <p className="categoryAmount">26</p>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
