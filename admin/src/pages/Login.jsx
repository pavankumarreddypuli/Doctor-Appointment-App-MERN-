import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios' //A popular library for making HTTP requests from a browser or Node.js. It simplifies fetching data from APIs.
import { toast } from 'react-toastify'  //This is likely from react-toastify, a library for showing toast notifications (small pop-up messages).
import { DoctorContext } from '../context/DoctorContext'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [state, setState] = useState('Admin') //when login page is opened admin is set to be default

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

         const loginData = { email, password };

        try {

            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', loginData)

                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                    toast.success(data.message || 'Admin login successful!');
                    // Redirect to admin dashboard if needed
                    navigate('/admin-dashboard'); 
                } else {
                    toast.error(data.message)
                }

            } else { //Doctor login
               
               const {data} = await axios.post(backendUrl+'/api/doctor/login',loginData)
               if (data.success) {
                    localStorage.setItem('dtoken', data.dtoken)
                    setDToken(data.dtoken)
                    console.log('Received Doctor Token:', data.dtoken);
                    toast.success(data.message || 'Doctor login successful!');
                    navigate('/doctor-dashboard');
                    
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
           console.error('Login Error:', error);
           // Check if the error response exists and has a message from the server
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                // Generic error message for network issues or unexpected errors
                toast.error('Login failed. Please check your credentials or try again later.');
            }
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base' >Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login



//Success Handling: If data.success is true, it means the login was successful. The code then stores the received token in the browser's local storage (localStorage.setItem('aToken', data.token)), which keeps the user logged in even if they close the browser. It also updates the aToken state in the AdminContext using setAToken(data.token), making the token available to other components in the application.
//Error Handling: If data.success is false, it means the login failed (e.g., incorrect credentials). A toast notification is shown using toast.error(data.message) to inform the user.
