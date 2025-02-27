
import { useState, useEffect } from 'react';
import SubNavbar from '../Navbar/SubNavbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from '../Footer/Footer';

const JobUpdateModel = () => {
    const[jobDetails, setJobDetails] = useState({});

    const [title, setTitle] = useState(jobDetails.title || '');
    const [description, setDescription] = useState(jobDetails.description || '');
    const [category, setCategory] = useState(jobDetails.category || '');
    const [requirements, setRequirements] = useState(jobDetails.requirements || '');
    const [workTime, setWorkTime] = useState(jobDetails.workTime || '');
    const [companyName, setCompanyName] = useState(jobDetails.companyName || '');
    const [deadline, setDeadline] = useState(jobDetails.deadline || '');
    const [location, setLocation] = useState(jobDetails.location || '');

    const {companyId, jobId} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8080/job-service/api/job/${jobId}`)
        .then((res)=>{
            setJobDetails(res.data)
            console.log(res.data)
        }).catch((err)=>{
            alert(err.message)
        })
    },[])
    useEffect(() => {
        setTitle(jobDetails.title || '');
        setDescription(jobDetails.description || '');
        setCategory(jobDetails.category || '');
        setRequirements(jobDetails.requirements || '');
        setWorkTime(jobDetails.workTime || '');
        setCompanyName(jobDetails.companyName || '');
        setDeadline(jobDetails.deadline || '');
        setLocation(jobDetails.location || '');
    }, [jobDetails]);

    const handleUpdateBtn=async(e)=>{
        e.preventDefault()
        const updateData = {jobId, title, description, category, requirements, workTime, companyName, deadline, location, companyId}
        await axios.put(`http://localhost:8080/job-service/api/job/updateJob`, updateData)
        .then((res)=>{
            navigate(`/company/job/${jobId}`)
        }).catch((err)=>{
            alert(err.message)
        })
    }

    const handleBackBtn=async(e)=>{
        e.preventDefault();
        navigate(`/company/job/${jobId}`)
    }
  return (
    <div className="loginMainContainer">
        <div className='subNavbar'>
            <SubNavbar/>
        </div>      
        <div className="jobMainCreateContainer">
        <h1 className='taskTitle'>UPDATION OF THE JOB</h1>
            <div className='jobCreateContainer'>
                <form action="">
                <div className="jobInput">
                    <label htmlFor="">Job title: </label>
                    <input type="text" value={title} onChange={(e)=>{
                        setTitle(e.target.value)
                    }} className="jobInputs"/>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Description: </label>
                    <pre><textarea name="" id="" cols="30" rows="10" value={description} onChange={(e)=>{
                        setDescription(e.target.value)
                    }} className="jobInputs"></textarea></pre>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Category: </label>
                    <select value={category} onChange={(e)=>{
                        setCategory(e.target.value)
                    }} className="jobInputs">
                        <option value="" >Select category</option>
                        <option value="informationTechnology">Information Technology (IT)</option>
                        <option value="salesAndMarketing">Sales and Marketing</option>
                        <option value="businessManagement">Business Management</option>
                        <option value="schoolLeavers">School Leavers</option>
                        <option value="internship">Internship / Undergraduate</option>
                        <option value="digitalMarketing">Digital Marketing</option>
                    </select>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Requirements: </label>
                    <pre><textarea name="" id="" cols="30" rows="10" value={requirements} onChange={(e)=>{
                        setRequirements(e.target.value)
                    }} className="jobInputs"></textarea></pre>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Work Time: </label>
                    <select value={workTime} onChange={(e)=>{
                        setWorkTime(e.target.value)
                    }} className="jobInputs">
                        <option value="fullTime">Full Time</option>
                        <option value="halfTime">Half Time</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Company Name: </label>
                    <input type="text" value={companyName} onChange={(e)=>{
                        setCompanyName(e.target.value)
                    }} className="jobInputs"/>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Deadline: </label>
                    <DatePicker selected={deadline} onChange={(date) => {
                        setDeadline(date); // Set the selected date directly
                    }}  className="jobInputs"/>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Location: </label>
                    <input type="text" value={location} onChange={(e)=>{
                        setLocation(e.target.value)
                    }} className="jobInputs"/>
                </div>
                <div className="buttonSection">
                    <button className="backBtn" onClick={handleBackBtn}>Back</button>
                    <button className="updateBtn" onClick={handleUpdateBtn}>Update</button>
                </div>
                </form>
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default JobUpdateModel

