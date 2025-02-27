import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import CreateJob from './Pages/Job/CreateJob'
import CreateCompany from './Pages/Comapny/CreateCompany'
import CompanyLogin from './Pages/Login/CompanyLogin/CompanyLogin'
import CompanyProfile from './Pages/CompanyProfile/CompanyProfile'
import JobUpdateModel from './components/Model/JobUpdateModel'
import CreateJobSeeker from './Pages/JobSeeker/CreateJobSeeker'
import JobSeekerLogin from './Pages/Login/JobSeekerLogin.jsx/JobSeekerLogin'
import ViewJob from './Pages/Job/ViewJob'
import SelectedJob from './Pages/Comapny/SelectedJob'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/createJob' element={<CreateJob/>}/>
          <Route path='/company/createCompany' element={<CreateCompany/>}/>
          <Route path='/company/login' element={<CompanyLogin/>}/>
          <Route path='/company/profile/:companyId' element={<CompanyProfile/>}/>
          <Route path='/company/profile/:companyId/:jobId' element={<JobUpdateModel/>}/>
          <Route path='/job-seeker/register' element={<CreateJobSeeker/>}/>
          <Route path='/job-seeker/login' element={<JobSeekerLogin/>}/>
          <Route path='/job/:jobId' element={<ViewJob/>}/>
          <Route path='/company/job/:jobId' element={<SelectedJob/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
