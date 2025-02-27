import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SubNavbar = () => {
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
                <Link to={`/`} style={{ textDecoration: "none" }}>
                    <h1 className='systemName'>
                        <span style={{ color: "#9ef01a" }}>Speed</span> Jobs
                    </h1>
                </Link>
                <div className="tabs">
                    <p className="tabsName">ALL JOBS</p>
                    <select className='navbarSelect' style={{ display: loginRegister }}  onChange={(e)=>{
                    setLogin(e.target.value)}}>
                        <option value="">LOGIN</option>
                        <option value="candidateLogin">CANDIDATE LOGIN</option>
                        <option value="companyLogin">COMPANY LOGIN</option>
                    </select>
                    <select className='navbarSelect' style={{ display: loginRegister }} onChange={(e) => { setRegister(e.target.value) }}>
                        <option value="">REGISTER</option>
                        <option value="candidateRegister">CANDIDATE REGISTER</option>
                        <option value="companyRegister">COMPANY REGISTER</option>
                    </select>

                    <button className='logoutBtn' onClick={handleLogout} style={{ display: logout }}>LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default SubNavbar
