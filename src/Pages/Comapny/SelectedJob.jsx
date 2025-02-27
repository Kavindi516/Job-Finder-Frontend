
import './selectedJob.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubNavbar from '../../components/Navbar/SubNavbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ViewApplication from '../Application/ViewApplication';
import Footer from '../../components/Footer/Footer';

const SelectedJob = () => {
    const{ jobId } = useParams();
    const[jobDetails, setJobDetails] = useState({})
    const[companyDetails, setCompanyDetails] = useState({})
    const[companyId, setCompanyId] = useState(null)
    const[resume, setResume] = useState(0)

    const[viewOverlay, setViewOverlay] = useState('none');
    const[applications, setApplications] = useState([]);

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
        const nuOfResume=()=>{
            axios.get(`http://localhost:8080/application-service/api/application-count/${jobId}`)
            .then((res)=>{
                setResume(res.data)
            }).catch((err)=>{
                alert(err.message)
            })
        }
        getJobDetails();
        nuOfResume();
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

    const handleApplicationsBtn=async()=>{       
        await axios.get(`http://localhost:5003/application-service/api/applications/${jobId}`)
        .then((res)=>{
            setApplications(res.data);
            setViewOverlay('block')
        }).catch((err)=>{
            alert(err.message)
        })
    }
    const handleEditBtn=async()=>{
        navigate(`/company/profile/${companyId}/${jobId}`)
    }
    const handleDeleteBtn=async()=>{
        await axios.delete(`http://localhost:8080/job-service/api/job/${jobId}`)
        .then((res)=>{
          navigate(`/company/profile/${companyId}`)
        }).catch((err)=>{
          alert(err.message)
        })
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
                <ViewApplication application={applications} resumeModelView={viewOverlay}/>
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
                        <p className='resumies'>{resume}</p>
                        <button className='applicationsBtn' onClick={handleApplicationsBtn} style={{marginRight:'10px'}}>Applications</button>
                        <button className='editedBtn' onClick={handleEditBtn} style={{marginRight:'10px'}}>Edit</button>
                        <button className='deletedBtn' onClick={handleDeleteBtn} >Delete</button>
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

export default SelectedJob
