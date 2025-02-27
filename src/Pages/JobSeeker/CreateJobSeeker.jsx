import './createJobSeeker.css'
import { useState } from 'react'
import axios from 'axios';
import SubNavbar from '../../components/Navbar/SubNavbar';
import Footer from '../../components/Footer/Footer';
import Error from '../../components/Error/Error';
import { useNavigate } from 'react-router-dom';
const CreateJobSeeker = () => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[age, setAge] = useState('');
    const[address, setAddress] = useState('');
    const[gender, setGender] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[bgColor, setBgColor] = useState('#ffc4d6')
    const[border, setBorder] = useState('3px solid #c9184a')
    const[color, setColor] = useState('#c9184a')
    const[errorView, setErrorView] = useState('none');
    const[errorMsg, setErrorMsg] = useState('');
    const message = ['All fields are required', 'Age should be a number']

    const navigate = useNavigate();

    const handleRegisterBtn=async()=>{
        if(!firstName || !lastName || !age || !address || !gender || !email || !password){
            setErrorView('block');
            setErrorMsg(message[0]);
            setTimeout(()=>{
            setErrorView('none');
            },1500)
        }else if(isNaN(age)){
            setErrorView('block');
            setErrorMsg(message[1]);
            setTimeout(()=>{
            setErrorView('none');
            },1500)
        }else{
            const formData = {firstName, lastName, age, address, gender, email, password}
            await axios.post(`http://localhost:8080/job-seeker-service/api/job-seeker`, formData)
            .then((res)=>{
                navigate(`/job-seeker/login`)
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
        <div className='loginContainer'>
          <h1 className='login'>REGISTER</h1>
          <div className="loginSection">
            <label htmlFor="">First Name:</label>
            <input type="text" onChange={(e)=>{
              setFirstName(e.target.value)
            }} className='loginInput' placeholder='Ex. Nimal'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Last Name:</label>
            <input type="text" onChange={(e)=>{
              setLastName(e.target.value)
            }} className='loginInput'  placeholder='Ex. Perera'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Age:</label>
            <input type="text" onChange={(e)=>{
              setAge(e.target.value)
            }} className='loginInput'  placeholder='Ex. 26'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Address:</label>
            <input type="text" onChange={(e)=>{
              setAddress(e.target.value)
            }} className='loginInput'  placeholder='Ex. No, street, city'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Gender:</label>
            <input type="text" onChange={(e)=>{
              setGender(e.target.value)
            }} className='loginInput'  placeholder='Ex. Male'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Email:</label>
            <input type="email" onChange={(e)=>{
              setEmail(e.target.value)
            }} className='loginInput'  placeholder='Ex. nimal@gmail.com'/>
          </div>
          <div className="loginSection">
            <label htmlFor="">Password:</label>
            <input type="password" onChange={(e)=>{
              setPassword(e.target.value)
            }} className='loginInput'  placeholder='Ex. xxxxxx'/>
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

export default CreateJobSeeker
