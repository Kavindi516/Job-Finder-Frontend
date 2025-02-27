import './addApplication.css'
import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Error from '../../components/Error/Error';

const AddApplication = (props) => {
    const[selectedFile, setSelectedFile] = useState(null);

    const[bgColor, setBgColor] = useState('#ffc4d6')
    const[border, setBorder] = useState('3px solid #c9184a')
    const[color, setColor] = useState('#c9184a')
    const[errorView, setErrorView] = useState('none');
    const[errorMsg, setErrorMsg] = useState('');
    const message = ['You have no uploaded any CV', 'Your CV uploaded successfully']

    const [jobSeekerId, setJobSeekerId] = useState(() => {
        const storedData = localStorage.getItem("jobSeekerDetails");
        return storedData ? JSON.parse(storedData) : null;
    });
    const{ jobId } = useParams();
    const navigate = useNavigate();

    const handleUploadBtn=async()=>{
      if (selectedFile == null) {
        setErrorView('block');
        setErrorMsg(message[0]);
        setTimeout(() => {
            setErrorView('none');
        }, 1500);
        return;
    }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('jobSeekerId', jobSeekerId.jobSeekerId);
        formData.append('jobId', jobId);
        axios.post(`http://localhost:8080/application-service/api/application`, 
        formData, 
        {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=>{
          setErrorView('block');
          setErrorMsg(message[1]);
          setBgColor('#d6eadf')
          setBorder('3px solid #368f8b')
          setColor('#368f8b')
          setTimeout(()=>{
            setErrorView('none');
            navigate('/')
          },1500)
            console.log(res.data)
        }).catch((err)=>{
            alert(err.message)
        })
    }

    const handleCloseBtn=async()=>{
      navigate(`/`)
    }
  return (
    <div className='applicationBox' style={{display:props.modelView}}>
      <Error message={errorMsg} backColor={bgColor} borderColor={border} textColor={color} viewOption={errorView}/>
      <div className='applicationContainer'>
          <h2 className='uploadTitle'>Upload Your CV</h2>
          <div className='applyBox'>
          <input type="file" className='applyInput' onChange={(e)=>{
            setSelectedFile(e.target.files[0])
          }}/>
          <button onClick={handleUploadBtn} className='cvUploadBtn'>Upload</button>
          <button onClick={handleCloseBtn} className='cvCloseBtn'>Close</button>
          </div>
      </div>
    </div>
  )
}

export default AddApplication

