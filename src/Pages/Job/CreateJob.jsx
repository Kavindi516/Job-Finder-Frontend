import './createJob.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubNavbar from '../../components/Navbar/SubNavbar';
import Footer from '../../components/Footer/Footer';

const CreateJob = () => {
    const[companyDetails, setCompanyDetails] = useState({})
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [requirements, setRequirements] = useState("");
    const [workTime, setWorkTime] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [location, setLocation] = useState("");
    const [profileImage, setProfileImage] = useState(companyDetails.profileImage);

    const navigate = useNavigate();

    const [companyId, setCompanyId] = useState(() => {
        const storedData = localStorage.getItem("CompanyDetails");
        return storedData ? JSON.parse(storedData) : null;
    });
    console.log(companyId)
    useEffect(()=>{
        const cId = companyId.companyId;
        axios.get(`http://localhost:8080/company-service/api/company/${cId}`)
        .then((res)=>{
            console.log(res.data)
            setCompanyDetails(res.data)
        }).catch((err)=>{
            alert(err.message)
        })
    },[companyId])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData ={title, description, category, requirements, workTime, companyName: companyDetails.companyName, deadline, location: companyDetails.location, companyId:companyId.companyId,  profileImage: companyDetails.profileImage}
        await axios.post(`http://localhost:8080/job-service/api/jobs`, formData)
        .then((res)=>{
            const cId = companyId.companyId;
            navigate(`/company/profile/${cId}`);
            
        }).catch((err)=>{
            alert(err.message)
            console.log(err.message)
        })
    }

    const handleBackBtn=async(e)=>{
        const cId = companyId.companyId;
        e.preventDefault();
        navigate(`/company/profile/${cId}`)
    }
  return (
    <div className="loginMainContainer">
        <div className='subNavbar'>
            <SubNavbar/>
        </div>      
        <div className="jobMainCreateContainer">
        <h1 className='taskTitle'>CREATING OF NEW JOB</h1>
            <div className='jobCreateContainer' style={{backgroundColor:"#e2eafc"}}>
                <form action="">
                <div className="jobInput">
                    <label htmlFor="">Job title: </label>
                    <input type="text"onChange={(e)=>{
                        setTitle(e.target.value)
                    }} className="jobInputs"/>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Description: </label>
                    <p><textarea name="" id="" cols="30" rows="10" onChange={(e)=>{
                        setDescription(e.target.value)
                    }} className="jobInputs"></textarea></p>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Category: </label>
                    <select onChange={(e)=>{
                        setCategory(e.target.value)
                    }} className="jobInputs">
                        <option value="" >Select category</option>
                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                        <option value="Sales and Marketing">Sales and Marketing</option>
                        <option value="Business Management">Business Management</option>
                        <option value="School Leavers">School Leavers</option>
                        <option value="Internship / Undergraduate">Internship / Undergraduate</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Requirements: </label>
                    <pre><textarea name="" id="" cols="30" rows="10" onChange={(e)=>{
                        setRequirements(e.target.value)
                    }} className="jobInputs"></textarea></pre>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Work Time: </label>
                    <select onChange={(e)=>{
                        setWorkTime(e.target.value)
                    }} className="jobInputs">
                        <option value="">Select work time</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Half time">Half Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="jobInput">
                    <label htmlFor="">Job Company Name: </label>
                    <input disabled value={companyDetails.companyName} type="text" onChange={(e)=>{
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
                    <input disabled value={companyDetails.location} type="text" onChange={(e)=>{
                        setLocation(e.target.value)
                    }} className="jobInputs"/>
                </div>
                <div className="buttonSection">
                    <button className="backBtn" onClick={handleBackBtn}>Back</button>
                    <button className="updateBtn" onClick={handleSubmit}>Submit</button>
                </div>
                </form>
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default CreateJob
