import './error.css'

const Error = (props) => {
  return (
    <div className='errorContainer' style={{
        display:props.viewOption,
        backgroundColor:props.backColor,
        border:props.borderColor,
        color:props.textColor
        }}>
      {props.message}
    </div>
  )
}

export default Error
