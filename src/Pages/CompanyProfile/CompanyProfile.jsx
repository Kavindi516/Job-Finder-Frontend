import { useEffect, useState } from 'react';
import './companyProfile.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubNavbar from '../../components/Navbar/SubNavbar';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';

const CompanyProfile = () => {
  const[jobDetails, setJobDetails] = useState([]);
  const[companyDetails, setCompanyDetails] = useState({});
  // const[editJobDetails, setEditJobDetails] = useState({});

  const { companyId } = useParams();
  const navigate = useNavigate();

useEffect(() => {
  const getJobDetails=()=>{
    axios.get(`http://localhost:8080/job-service/api/job-list/${companyId}`)
    .then((res)=>{
      setJobDetails(res.data)
    }).catch((err)=>{
      alert(err.message)
    })
  }
  const getCompanyDetails=()=>{
    axios.get(`http://localhost:8080/company-service/api/company/${companyId}`)
    .then((res)=>{
      setCompanyDetails(res.data)
    }).catch((err)=>{
      alert(err.message)
    })
  }
  getJobDetails();
  getCompanyDetails();
}, [companyId, jobDetails]);


   const handleJobLink=async(jobId)=>{
    navigate(`/company/job/${jobId}`)
   }
  return (
    <div className="loginMainContainer">
      <div className='subNavbar'>
        <SubNavbar/>
      </div>
      <div className='pageConatiner'>
        <div className="welcomSection">
          <h2 className='welcomeTitle'>Welcome, <span className='companyNameInWelcome'>{companyDetails.companyName}</span></h2>
          <Link to={`/job/createJob`}><button className='newJobBtn'>NEW JOB</button></Link>
          {/* <h2 className='welcomeTitle'>Welcome, <span className='companyNameInWelcome'>{companyDetails.companyName}</span></h2> */}
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
          <h1 className='publishTitle'>Published Job Vacancies</h1>
          <h1 className='publishTitle'>WHO ARE YOU?</h1>
        </div>
        <div className="prodileMainContainer" >
            <div className='profileConatiner' >
              {jobDetails.map((jobs, index)=>(
                <div className="profileCard" key={index} onClick={()=>{handleJobLink(jobs.jobId)}}>
                  <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
                      <img src={companyDetails.profileImage} alt="" className='cardProfile'/>
                      <div>
                        <p className="jobTitle" style={{fontWeight:'bold'}}>{jobs.title}</p>
                        <p className="jobTitle">{jobs.companyName}</p>
                      </div>
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
                      <LocationOnIcon htmlColor='red'/>
                      <p className="">{jobs.location}</p>
                  </div>
                  <div>
                      <p>Expires On</p>
                      <p className="">{jobs.deadline}</p>
                  </div>
                  <p className="workTime">{jobs.workTime}</p>
              </div>
              ))}
          </div>
          <div className="profileDetailsBox">
            <div className="imageSection">
            <img src={companyDetails.profileImage} alt="" className='profileImage'/>
              <img src={companyDetails.backImage} alt="" className='backgroungImage'/>
              
            </div>
            <div className="detailsSection">
              <p><span style={{fontSize:"17px", fontWeight:"bold"}}>Name:</span> <span style={{fontFamily:'sans-serif', color:"#023e7d", fontWeight:"bold"}}>{companyDetails.companyName}</span></p><hr />
              <p><span style={{fontSize:"17px", fontWeight:"bold"}}>Location:</span> <span style={{fontFamily:'sans-serif', color:"#023e7d", fontWeight:"bold"}}>{companyDetails.location}</span></p><hr />
              <p><span style={{fontSize:"17px", fontWeight:"bold"}}>Establshed Date:</span> <span style={{fontFamily:'sans-serif', color:"#023e7d", fontWeight:"bold"}}>{companyDetails.establishedDate}</span></p><hr />
              <p><span style={{fontSize:"17px", fontWeight:"bold"}}>Industry:</span> <span style={{fontFamily:'sans-serif', color:"#023e7d", fontWeight:"bold"}}>{companyDetails.industry}</span></p><hr />
              <p><span style={{fontSize:"17px", fontWeight:"bold"}}>Conact No:</span> <span style={{fontFamily:'sans-serif', color:"#023e7d", fontWeight:"bold"}}>{companyDetails.contactDetails}</span></p><hr />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default CompanyProfile
