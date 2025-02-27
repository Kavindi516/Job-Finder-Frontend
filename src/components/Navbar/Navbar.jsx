import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const[login, setLogin] = useState('');
    const[register, setRegister] = useState('');

    const [logout, setLogout] = useState('none')
    const [loginRegister, setLoginRegister] = useState('block')
    const navigate = useNavigate();

    const isLoggedCompany = localStorage.getItem("CompanyDetails")
    const isLoggedJobSeeker = localStorage.getItem("jobSeekerDetails")

    useEffect(() => {
        if (isLoggedCompany || isLoggedJobSeeker) {
            setLogout('block')
            setLoginRegister('none')
        }
    }, [isLoggedCompany, isLoggedJobSeeker])

    if(login === "candidateLogin"){
        navigate("/job-seeker/login");
    }else if(login === "companyLogin"){
        navigate("/company/login");
    }
   
    if(register === "candidateRegister"){
        navigate("/job-seeker/register");
    }else if(register === "companyRegister"){
        navigate("/company/createCompany");
    }
    const handleLogout = async () => {
        localStorage.removeItem("CompanyDetails")
        localStorage.removeItem("jobSeekerDetails")
        window.location.reload();
    }
  return (
    <div className='navbarContainer'>
        <div className="topSection">
            <Link to={`/`} style={{textDecoration:"none"}}><h1 className='systemName'><span style={{color:"#9ef01a"}}>Speed</span> Jobs</h1></Link>
            <div className="tabs">
                <p className="tabsName">ALL JOBS</p>
                <select style={{ display: loginRegister }} className='navbarSelect' onChange={(e)=>{
                    setLogin(e.target.value)
                }}>
                    <option value="">LOGIN</option>
                    <option value="candidateLogin">CANDIDATE LOGIN</option>
                    <option value="companyLogin">COMPANY LOGIN</option>
                </select>
                <select style={{ display: loginRegister }} className='navbarSelect' onChange={(e)=>{
                    setRegister(e.target.value)
                }}>
                    <option value="">REGISTER</option>
                    <option value="candidateRegister">CANDIDATE RESGISTER</option>
                    <option value="companyRegister">COMPANY RESGISTER</option>
                </select>
                <button className='logoutBtn' onClick={handleLogout} style={{ display: logout }}>LOGOUT</button>
            </div>
        </div>
        <div className="systemThumnail">
            <h3>Give your Career a Quick Start !</h3>
        </div>
        <div className="bottomSection">
            <input type="text" className='navbarInput' placeholder='Select Job Title'/>
            <input type="text" className='navbarInput' placeholder='Select Job Location'/>
            <input type="text" className='navbarInput' placeholder='Select Job Category'/>
            <button className='navbarSearchBtn'>SEARCH</button>
        </div>
    </div>
  )
}

export default Navbar
