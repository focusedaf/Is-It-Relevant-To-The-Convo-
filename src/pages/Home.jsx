import React,{useState} from 'react'
import { Form } from '../components/index'

const Home = () => {
  const [visible,setVisible] = useState(false) 
  const [show, setShow] = useState(true)
  const handleClick = () => {
     setVisible(true);
     setShow(false);
   };
  return (
    <div className="absolute top-0 left-0 right-0 h-screen flex flex-col justify-center items-center text-center">
      {show && (
        <>
          <h3 className="text-2xl font-semibold">
            Is this relevant to the convo?
          </h3>
          <button
            className="px-4 py-2 bg-pink-400 rounded-md mt-5 cursor-pointer"
            onClick={()=> handleClick()}
          >
            Let's find out
          </button>
        </>
      )}

      
        {visible && <Form />}
        
      
    </div>
  );
}

export default Home