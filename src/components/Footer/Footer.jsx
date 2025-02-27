import './footer.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <div className="mainFooter">
        <div className='footerContainer'>
            <div className="footerTitle">
                <Link to={`/`} style={{textDecoration:"none"}}><h1 className='systemName'><span style={{color:"#9ef01a"}}>Speed</span> Jobs</h1></Link>
                <img src={logo} alt="" className='logoImage'/>
            </div>
            <div className="footerLinkSection">
                <h3 className='linkTitle'>Job Seeker</h3>
                <p className='links'>Candidate Login</p>
                <p className='links'>Jobs</p>
                <p className='links'>Cv Less Jobs</p>
                <p className='links'>CV Formats Store</p>
                <p className='links'>Online CV Clinic</p>
                <p className='links'>SMS Job Alert</p>
                <p className='links'>Online Courses</p>
                <p className='links'>Career Guidance</p>
            </div>
            <div className="footerLinkSection">
                <h3 className='linkTitle'>Recruiters</h3>
                <p className='links'>Pricing</p>
                <p className='links'>Recruiter Login</p>
                <p className='links'>FAQ</p>
                <p className='links'>Testimonials</p>
                <p className='links'>Features</p>
            </div>
            <div className="footerLinkSection">
                <h3 className='linkTitle'>Other</h3>
                <p className='links'>Contact</p>
                <p className='links'>Partners</p>
                <p className='links'>Differently Able Employment</p>
                <p className='links'>Press Releases</p>
                <p className='links'>Terms and Conditions</p>
            </div>
            <div className="footerLinkSection">
                <h3 className='linkTitle'>Social Media</h3>
                <div className="socialMidea">
                    <FacebookIcon/>
                    <WhatsAppIcon/>
                    <LinkedInIcon/>
                    <TwitterIcon/>
                    <InstagramIcon/>
                </div>
            </div>
        </div>
        <div className="copSection">
            <p><CopyrightIcon htmlColor='white'/></p>
            <p className="copyright">2024 Speed Job Lk All Rights Reserved By DsignLk Software Solutions (pvt) Ltd.</p>
        </div>
        
    </div>
  )
}

export default Footer
