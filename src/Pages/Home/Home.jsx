import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EmailVerification from '../EmailVerification/EmailVerification';
import { getDatabase } from 'firebase/database';
import Header from '../Sidebar/Header';
import Profile from '../Profile/Profile';
import { Post } from '../Post/Post';
import Trend from '../Trend/Trend';

const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [verify, setVerify] = useState(false)

  useEffect(() => {
    if (!data) {
      navigate('/login')
    }
  }, [])

  onAuthStateChanged(auth, (user) => {
    console.log(user, 'userrrr');
    if (user.emailVerified) {
      setVerify(true)
      dispatch(userLoginInfo(user.user))
      localStorage.setItem('userLoginInfo', JSON.stringify((user.user)))
    }
  });

  return (
    <div className='bg-[#06141D]'>


      <div className="container  h-full mx-auto px-4">
        {
          verify ?
            <>
              <div className="">
                <Header></Header>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <Profile className='' />
                </div>
                <div className="">
                  <Post className='' />
                </div>
                <div className="">
                  <Trend className='' />
                </div>
              </div>
            </>
            :
            <EmailVerification></EmailVerification>
        }
      </div>

    </div>
  )
}

export default Home