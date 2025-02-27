import './companyLogin.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubNavbar from '../../../components/Navbar/SubNavbar';
import Error from '../../../components/Error/Error'
import Footer from '../../../components/Footer/Footer';

const CompanyLogin = () => {
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);

    const[bgColor, setBgColor] = useState('#ffc4d6')
    const[border, setBorder] = useState('3px solid #c9184a')
    const[color, setColor] = useState('#c9184a')
    const[errorView, setErrorView] = useState('none');
    const[errorMsg, setErrorMsg] = useState('');
    const message = ['Invalid email or password', 'Your CV uploaded successfully']

    const navigate = useNavigate();

    const handleLogin=async()=>{
        if(!email || !password){
          setErrorView('block');
          setErrorMsg(message[0]);
          setTimeout(()=>{
            setErrorView('none');
          },1500)
        }else{
          const formData = {email, password};
          await axios.post(`http://localhost:8080/company-service/api/company/login`, formData)
          .then((res)=>{
            const companyDetails = res.data;
            localStorage.setItem("CompanyDetails", JSON.stringify(companyDetails));
            const companyId = companyDetails.companyId;
            navigate(`/company/profile/${companyId}`);
                      
          }).catch((err)=>{
            setErrorMsg(err.message);
            setErrorView('block');
            setTimeout(()=>{
              setErrorView('none');
            },1500)
          })
        }
    }
  return (
    <div className="loginMainContainer">
      <SubNavbar />
      <div className="mainConatainer">
      <Error message={errorMsg} backColor={bgColor} borderColor={border} textColor={color} viewOption={errorView}/>
          <div className='loginContainer'>
            <h1 className='login'>LOGIN</h1>
            <div className="loginSection">
              <label htmlFor="">Email:</label>
              <input type="text" onChange={(e)=>{
                setEmail(e.target.value)
              }} className='loginInput' placeholder='Ex. company@gmail.com'/>
            </div>
            <div className="loginSection">
              <label htmlFor="">Password:</label>
              <input type="password" onChange={(e)=>{
                setPassword(e.target.value)
              }} className='loginInput'  placeholder='Ex. xxxxxx'/>
            </div>
            <div className='loginBtnBox'>
              <button onClick={handleLogin} className='loginBtn'>Login</button>
            </div>
        </div>
        <Footer/>
      </div>
      
    </div>
  )
}

export default CompanyLogin
