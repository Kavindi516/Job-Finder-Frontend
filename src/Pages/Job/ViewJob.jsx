import './viewJob.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubNavbar from '../../components/Navbar/SubNavbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddApplication from '../Application/AddApplication'
import Footer from '../../components/Footer/Footer';

const ViewJob = () => {
    const{ jobId } = useParams();
    const[jobDetails, setJobDetails] = useState({})
    const[companyDetails, setCompanyDetails] = useState({})
    const[companyId, setCompanyId] = useState(null)

    const[viewOverlay, setViewOverlay] = useState('none');

    const[jobSeekerId, setJobSeekerId] = useState(() => {
        const storedData = localStorage.getItem("jobSeekerDetails");
        return storedData ? JSON.parse(storedData) : null;
    });

    const navigate = useNavigate();
    useEffect(()=>{
        const getJobDetails=async()=>{
            axios.get(`http://localhost:8080/job-service/api/job/${jobId}`)
            .then((res)=>{
                setJobDetails(res.data)
                setCompanyId(res.data.companyId)
            })
        }
        getJobDetails();
    },[companyId])

    useEffect(()=>{
        const getCompanyDetails=async()=>{
            axios.get(`http://localhost:8080/company-service/api/company/${companyId}`)
            .then((res)=>{
                setCompanyDetails(res.data)
            })
        }
        getCompanyDetails();
    },[companyId])

    const handleApplyBtn=async()=>{
        
        if(jobSeekerId){
            setViewOverlay('block')
            // navigate(`/job/application/${jobDetails.jobId}`)
        }else{
            navigate(`/job-seeker/login`)
        }
    }
  return (
    <div className="loginMainContainer">
        <SubNavbar/>
        <div className="mainConatainer">
            <div className='viewJobContainer'>
                <div className="jobViewTitle">
                    <img src={companyDetails.profileImage} className='companyLogo' />
                    <div>
                        <h1 className='titleName'>{jobDetails.title}</h1>
                        <h2 className='jobName'>{jobDetails.companyName}</h2>
                    </div>
                </div>
                <AddApplication modelView={viewOverlay}/>
                <div className='overlay' style={{display:viewOverlay}}></div>
                <div className='secondSection'>
                    <div style={{display:'flex', alignItems:'center', gap:'5px', marginLeft:'2rem'}}>
                        <p><LocationOnIcon htmlColor='red'/></p>
                        <p className='location'>{jobDetails.location}</p>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'5px', marginLeft:'2rem'}}>
                        <p><WorkHistoryIcon htmlColor='blue'/></p>
                        <p className='location'>{jobDetails.workTime}</p>
                    </div>
                    <div style={{marginLeft:'2rem'}}>
                        <p className='deadlineTitle'>Deadline</p>
                        <p className='deadline'>{jobDetails.deadline}</p>
                    </div>
                    <div style={{marginLeft:'2rem'}}>
                        <button className='applyBtn' onClick={handleApplyBtn}>APPLY FOR JOB</button>
                    </div>
                </div>
                <div className="descriptionBox">
                    <h2 className='descTitle'>What we are looking for?</h2>
                    <p className='description'>{jobDetails.description}</p>
                </div>
                <div className="descriptionBox">
                    <h2 className='descTitle'>What are requirements?</h2>
                    <pre className='requirements'>{jobDetails.requirements}</pre>
                </div>
            </div>
            <Footer/>
        </div>
        
    </div>
  )
}

export default ViewJob
