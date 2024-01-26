import React, { useState } from 'react'
import { json, Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi'
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";
import jImg from '../../assets/jj.png'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../../assets/google.png'
import { FaWindowClose } from "react-icons/fa";


const Registration = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch()
  const db = getDatabase();

  let navigate = useNavigate()

  let [email, setEmail] = useState('')
  let [emailerr, setEmailerr] = useState('')

  let [name, setName] = useState('')
  let [nameerr, setNameerr] = useState('')

  let [password, setPassword] = useState('')
  let [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [registration, setRegistration] = useState('')

  let [loader, setLoader] = useState(false)
  let [show, setshow] = useState(false)

  let handleCreate = () => {
    setshow(!show)
  }
  let handleclose = () => {
    setshow(!show)
  }
  const submitGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('login done')
        setTimeout(() => {
          navigate('/home')
        },3000)
      }).catch(() => {
        const errorCode = errorCode;
        console.log(errorCode);
      })
  }
  let handleName = (e) => {
    setName(e.target.value)
    setNameerr('')
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
      setEmailerr('Email is requird');
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Email is not valid');
      }
    }
    if (!name) {
      setNameerr('Name is requird ');
    } if (!password) {
      setPassworderr('Password is requird')
    } else {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        setPassworderr('password must contain at least 8 characters including upper/lowercase, numbers and one scecial characters ')
      }
    }
    if (password && name && email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {

      createUserWithEmailAndPassword(auth, email, password)

        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: './src/assets/border-img.png'
          }).then(() => {
            sendEmailVerification(auth.currentUser)
            console.log(user.user, 'ok done');
            toast.success('registration done & verify your email');
            setEmail('')
            setName('')
            setPassword('')
            setTimeout(() => {
              navigate('/EmailVerification')
              // navigate('/login')
            }, 2000)
          }).then(() => {
            console.log(user.user.photoURL);
            set(ref(db, 'users/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
              photoURL: user.user.photoURL,
            });
          })

        })
        .catch((error) => {
          setRegistration('')
          const errorCode = error.code;
          // console.log(errorCode);
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailerr('Email is already in use');
          }
        });
    }
  }

  return (
    <div class="h-screen md:flex">

      <div class="flex w-full relative md:w-1/2 bg-[#131516] opacity-45 to-purple-700 i justify-around items-center">
        <img className='h-screen w-full object-cover opacity-70 rounded-b-3xl' src={jImg} alt="" />
      </div>

      <div class="flex w-full md:w-1/2 bg-[#131516] justify-center items-center">
        <form class="bg-[#131516]">
          <h1 class="text-center font-bold text-[40px] text-[#DBD8D4] mb-[20px] font-black mb-2 font-pop">Join today</h1>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          
          <div onClick={submitGoogle} className='inline-flex pt-[13px] pr-[110px] pl-[110px] pb-[11px] bg-[#131516]  border-[2px] border-bg-[#131516] rounded-2xl mb-[22px] cursor-pointer'>
            <img src={google} alt="" />
            <p className='font-semibold font-open text-[#DBD8D4] text-[13px] ml-[10px] inline-block'>Sign up with Google</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="h-[1px] bg-white w-[150px]"></div>
            <h1 className='text-white text-center'>or</h1>
            <div className="h-[1px] bg-white w-[150px]"></div>
          </div>

          {
            show ?
              <div className="">
                <div className=" bg-[#131516] absolute top-[12%] rounded-lg left-[30%] w-[600px] px-[130px] py-[110px] border-[2px] border-bg-[#131516] text-[#DBD8D4] ">
                  <FaWindowClose onClick={handleclose} className='cursor-pointer text-[#DBD8D4] text-[20px] absolute top-[30px] right-[30px]' />
                  <div className='mb-4 '>

                    <p class="text-[#DBD8D4] mt-2 hidden font-bold uppercase text-center md:block">Free register and you can enjoy it</p>
                    <div class="flex items-center border-2 py-2 mt-[22px] px-3 rounded-2xl mb-2">
                      <img className='h-5 w-5 text-gray-400' src="images/person.svg" alt="" />
                      <input onChange={handleName} class="pl-2 w-full outline-none bg-transparent border-none" type="text" name="" id="" placeholder="User Name" />
                      {nameerr &&
                        <BiError className='text-red-500 ml-[25px]' />
                      }
                    </div>
                    {nameerr &&
                      <p className='font-pop text-sm text-red-500'>{nameerr}</p>
                    }
                  </div>
                  <div className='mb-4'>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                      <img className='h-5 w-5 text-gray-400' src="images/email.svg" alt="" />
                      <input onChange={handleEmail} class="w-full pl-2 outline-none border-none bg-transparent" type="email" id="" placeholder="Email Address" />
                      {emailerr &&
                        <BiError className='text-red-500' />
                      }
                    </div>
                    {emailerr &&
                      <p className='font-pop text-sm  text-red-500'>{emailerr}</p>
                    }
                    <p className='font-pop text-sm  text-red-500'>{registration}</p>
                  </div>
                  <div className='mb-4'>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                      <img className='w-5 h-5' src="images/password.svg" alt="" />
                      <input onChange={handlePassword} class="pl-2 w-full outline-none bg-transparent border-none" type={showPassword ? 'text' : 'password'} id="" placeholder="Password" />
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
                      <button onClick={handleSubmit} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Sign up</button>
                    }

                  </div>
                </div>
              </div>
              :
              <button onClick={handleCreate} class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-[#DBD8D4] font-bold mb-2">Create Account</button>
          }

          <p className='text-[#DBD8D4] font-bold text-[20px] mt-[40px] font-pop mt-2 text-center'>Already Have an Acount!</p>
          <Link className='' to='/login'>
            <button type="submit" class="block w-28 w-full  font-pop bg-[#131516] text-[#DBD8D4] mt-4 py-2 border border-bg-[#DBD8D4] rounded-2xl font-bold mb-2 text-center">Login</button>
          </Link>
        </form>
      </div>


    </div>
  )
}

export default Registration