import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiError } from 'react-icons/bi'
import login from '../../assets/login.png'
import google from '../../assets/google.png'
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { userLoginInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jImg from '../../assets/jj.png'
import { FaWindowClose } from 'react-icons/fa'

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch()

  let navigate = useNavigate()

  let [email, setEmail] = useState('')
  let [emailerr, setEmailerr] = useState('')

  let [password, setPassword] = useState('')
  let [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  let [loader, setLoader] = useState(false)

  const [error, setError] = useState('')
  let [show, setshow] = useState(false)

  let handleCreate = () => {
    setshow(!show)
  }
  let handleclose = () => {
    setshow(!show)
  }

  const submitGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('login done')
        setTimeout(() => {
          navigate('/home')
        }, 3000)
      }).catch(() => {
        const errorCode = errorCode;
        console.log(errorCode);
      })
  }

  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr('')
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr('')
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setEmailerr('Email Is Required')
    }

    if (!password) {
      setPassworderr('Passowrd Is Required')
    }

    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
      signInWithEmailAndPassword(auth, email, password)
        // .then((user) => {
        .then((user) => {
          toast.success('login successfully')
          // sendEmailVerification(auth.currentUser)
          console.log(user.user);
          dispatch(userLoginInfo(user.user))
          localStorage.setItem('userLoginInfo', JSON.stringify((user.user)))
          setError('')
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/home')
          }, 3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          // console.log(errorCode);
          if (errorCode.includes('auth/invalid-login-credentials')) {
            setError('email or password is incorrect')
          }
        });
    }

  }
  return (
    <div class="h-screen md:flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div class="flex w-full relative md:w-1/2 bg-[#131516] opacity-45 to-purple-700 i justify-around items-center ">
        <img className='h-screen w-full object-cover  opacity-70 rounded-b-3xl' src={jImg} alt="" />
      </div>

      <div class="flex w-full  md:w-1/2 justify-center items-center bg-[#131516]">
        <form class="bg-[#131516]">
          <h1 class="text-center font-bold text-[30px] text-[#DBD8D4] mb-[20px] font-black mb-2 font-pop">Login to your account!</h1>

          <div onClick={submitGoogle} className='inline-flex pt-[13px] pr-[110px] pl-[110px] pb-[11px] bg-[#131516]  border-[2px] border-bg-[#131516] rounded-2xl mb-[22px] cursor-pointer'>
            <img src={google} alt="" />
            <p className='font-semibold font-open text-[#DBD8D4] text-[13px] ml-[10px] inline-block'>Login with Google</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="h-[1px] bg-white w-[150px]"></div>
            <h1 className='text-white text-center'>or</h1>
            <div className="h-[1px] bg-white w-[150px]"></div>
          </div>


          {
            show ?
              <div className="bg-[#131516] absolute top-[12%] rounded-lg left-[30%] w-[600px] px-[130px] py-[110px] border-[2px] border-bg-[#131516] text-[#DBD8D4] ">
                <div className='mb-4 text-[#DBD8D4]'>
                  <FaWindowClose onClick={handleclose} className='cursor-pointer text-[#DBD8D4] text-[20px] absolute top-[30px] right-[30px]' />
                  <h1 class="text-center font-bold text-[30px] text-[#DBD8D4] mb-[20px] font-black mb-2 font-pop">Login to your account!</h1>
                  <p className='font-semibold font-open text-red-500 text-[13px] ml-[10px] mb-5 '>{error}</p>
                  <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                    <img className='h-5 w-5 text-gray-400' src="images/email.svg" alt="" />
                    <input onChange={handleEmail} class=" bg-transparent pl-2 outline-none w-full border-none" type="email" id="" placeholder="Email Address" />
                    {emailerr &&
                      <BiError className='text-red-500 ml-[25px]' />
                    }
                  </div>

                  {emailerr &&
                    <p className='font-pop text-sm  text-red-500 '>{emailerr}</p>
                  }
                </div>
                <div className='mb-4 text-[#DBD8D4]'>
                  <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                    <img className='w-5 h-5' src="images/password.svg" alt="" />
                    <input onChange={handlePassword} class=" bg-transparent pl-2 w-full outline-none border-none" type={showPassword ? 'text' : 'password'} id="" placeholder="Password" />
                    {
                      showPassword ?
                        <BsEyeFill onClick={() => setShowPassword(!showPassword)} className='' />
                        :
                        <BsFillEyeSlashFill onClick={() => setShowPassword(!showPassword)} className='' />

                    }
                    {passworderr &&
                      <BiError className='text-red-500' />
                    }
                  </div>
                  {passworderr &&
                    <p className='font-pop text-sm text-red-500 '>{passworderr}</p>
                  }
                </div>
                <div className='flex justify-center'>

                  {loader ?
                    <ThreeDots
                      height="80"
                      width="80"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                    :
                    <button onClick={handleSubmit} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                  }
                </div>
                <Link to='/ForgotPassword' >
                  <span class="text-bold ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                </Link>
              </div>
              :
              <button onClick={handleCreate} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-[#DBD8D4] font-bold mb-2">Login Account</button>
          }
          <p className='text-[#DBD8D4] font-bold text-[20px] mt-[40px] font-pop mt-2 text-center'>Already don't Have an Acount!</p>
          {/* <button type="submit" class="block w-28 w-full  font-pop bg-[#131516] text-[#DBD8D4] mt-4 py-2 border border-bg-[#DBD8D4] rounded-2xl font-bold mb-2 text-center">Login</button> */}
          <Link className='' to='/Registration'>
            <button type="submit" class="block w-28 w-full  font-pop bg-[#131516] text-[#DBD8D4] mt-4 py-2 border border-bg-[#DBD8D4] rounded-2xl font-bold mb-2 text-center">Create an account</button>
          </Link>
        </form>
      </div>

    </div>
  )
}

export default Login