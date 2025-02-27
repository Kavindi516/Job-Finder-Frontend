import './viewApplication.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ViewApplication = (props) => {
    const [cv, setCv] = useState([]);
    const[resumeModelView, setModelView] = useState('block')
    const navigate = useNavigate();
    const {jobId} = useParams();

    useEffect(() => {
        setCv(props.application);
        setModelView(props.resumeModelView)
    }, [props.application]);

    const handleLink = async (fileName) => {
        try {
            const response = await axios.get(`http://localhost:8080/application-service/api/application/${fileName}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Error downloading PDF:', err);
            alert('Error downloading PDF');
        }
    };
    const handleCloseBtn = (e) => {
        e.preventDefault();
        setModelView('none')
        window.location.href = `/company/job/${jobId}`;
    }
    
    return (
        <div className='viewApplicationContainer' style={{display:resumeModelView}}>
            <div className='titleBox'>
                <h2 className='resumeTitle'>All Resumes</h2>
                <button className='closeIconBtn' onClick={handleCloseBtn}><CloseIcon/></button>
            </div>
            {cv.map((cvItem, index) => (
                <div key={index}>
                    <p className='applicationLink' onClick={() => handleLink(cvItem)}>{cvItem}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewApplication;
