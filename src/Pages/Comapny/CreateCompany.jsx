import './createCompany.css'
import { useState } from 'react'
import axios from 'axios'
import SubNavbar from '../../components/Navbar/SubNavbar'
import Error from '../../components/Error/Error'
import Footer from '../../components/Footer/Footer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");
    const [establishedDate, setEstablishedDate] = useState(new Date);
    const [contactDetails, setContactDetails] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backImage, setBackImage] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const[bgColor, setBgColor] = useState('#ffc4d6')
    const[border, setBorder] = useState('3px solid #c9184a')
    const[color, setColor] = useState('#c9184a')
    const[errorView, setErrorView] = useState('none');
    const[errorMsg, setErrorMsg] = useState('');
    const message = ['All fields are required', 'Age should be a number']

    const navigate = useNavigate();

    const handleRegisterBtn=async()=>{
        if(!companyName || !description || !location || !industry || !establishedDate || !contactDetails || !email || !password || !backImage || !profileImage){
            setErrorView('block');
            setErrorMsg(message[0]);
            setTimeout(()=>{
            setErrorView('none');
            },1500)
        }else{
            const formData = {companyName, description, location, industry, establishedDate, contactDetails, email, password, backImage, profileImage}
            await axios.post(`http://localhost:8080/company-service/api/company`, formData)
            .then((res)=>{
                navigate(`/company/login`)
            }).catch((err)=>{
                alert(err.message)
            })
        }
    }
  return (
    <div className="loginMainContainer">
    <SubNavbar />
    <div className="mainConatainer">
    <Error message={errorMsg} backColor={bgColor} borderColor={border} textColor={color} viewOption={errorView}/>
        <div className='loginContainer' id='registerConatiner'>
          <h1 className='login'>REGISTER</h1>
          <div className="loginSection">
            <label htmlFor="">Company Name:</label>
            <input type="text" onChange={(e)=>{
              setCompanyName(e.target.value)
            }} className='loginInput' placeholder='Enter company name'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Description:</label>
            <input type="text" onChange={(e)=>{
              setDescription(e.target.value)
            }} className='loginInput'  placeholder='Enter description'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Location:</label>
            <input type="text" onChange={(e)=>{
              setLocation(e.target.value)
            }} className='loginInput'  placeholder='Enter company location'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Industry:</label>
            <select className='loginInput' onChange={(e)=>{
              setIndustry(e.target.value)
            }}>
                <option value="" selected>Select industry</option>
                <option value="Information Technology (IT)">Information Technology (IT)</option>
                <option value="Sales and Marketing">Sales and Marketing</option>
                <option value="Business Management">Business Management</option>
                <option value="School Leavers">School Leavers</option>
                <option value="Internship / Undergraduate">Internship / Undergraduate</option>
                <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
          <div className="loginSection">
            <label htmlFor="">Established Date:</label>
            <DatePicker selected={establishedDate} className='loginInputDate'vonChange={(e)=>{
              setEstablishedDate(e.target.value)
            }}/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Contact Details:</label>
            <input type="text" onChange={(e)=>{
              setContactDetails(e.target.value)
            }} className='loginInput'  placeholder='Enter contact number'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Profile Image:</label>
            <input type="text" onChange={(e)=>{
              setProfileImage(e.target.value)
            }} className='loginInput'  placeholder='Enter image link'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Cover Image:</label>
            <input type="text" onChange={(e)=>{
              setBackImage(e.target.value)
            }} className='loginInput'  placeholder='Enter image link'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e)=>{
              setEmail(e.target.value)
            }} className='loginInput'  placeholder='Enter email'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e)=>{
              setPassword(e.target.value)
            }} className='loginInput'  placeholder='Enter password'/>
          </div>
          <div className='loginBtnBox'>
            <button onClick={handleRegisterBtn} className='loginBtn'>Register</button>
          </div>
      </div>
      <Footer/>
    </div>
  </div>
  )
}

export default CreateCompany
