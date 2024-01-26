import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString, listAll } from "firebase/storage";
import { update, ref as reff, getDatabase, set, push, onValue, remove } from 'firebase/database'
import reg from '../../assets/registration.png';
import { PiImageLight } from "react-icons/pi";
import { PiFilmReelFill } from "react-icons/pi";
import { TbNeedleThread } from "react-icons/tb";
import { AiFillLike } from "react-icons/ai";
import { FaShareNodes } from "react-icons/fa6";
import { FaCommentAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

export const Post = () => {


    const auth = getAuth();
    const db = getDatabase();
    const storage = getStorage();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const navigate = useNavigate()

    const [posttext, setposttext] = useState('')
    let [posttexterr, setposttexterr] = useState('')
    const [postmsg, setpostmsg] = useState([])

    let handleMsg = (e) => {
        setposttext(e.target.value)
        setposttexterr('')
    }
    const handletextdlt = (item) => {
        remove(reff(db, "posts/"));
    }
    useEffect(() => {
        const postRef = reff(db, 'posts/');
        onValue(postRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), key: item.key });
            })
            setpostmsg(arr)
        });
    }, [])

    const handleMsgSend = (e) => {
        e.preventDefault(e);
        console.log('okkkkkk');
        if (!posttext) {
            setposttexterr('post Is Required')
        } else {
            set(push(reff(db, "posts/")), {
                posttext: posttext,
                date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()} ${new Date().getMinutes()}`
            }).then(() => {
                console.log('msg send done');
                setposttext("")
            })
        }
    }







    return (
        <div className='w-[700px]'>

            {/* POST BAR START */}
            <div className="bg-[#1B2730] rounded-xl py-[15px] px-[25px] mb-[10px]">

                <div className="flex items-center gap-5">
                    <img className='block object-cover h-[70px] rounded-full w-[70px]' src={data?.photoURL} alt="" />
                    <label className='text-[#2A3843]'>
                        <input
                            onChange={handleMsg}
                            id='jahid'
                            placeholder='Whats happening?'
                            className='py-4 rounded-xl px-3 outline-none bg-[#28343E] w-[460px] text-white' type="text" />
                    </label>
                    <button onClick={handleMsgSend} className='bg-primary text-white px-5 py-4 rounded-xl'>POST</button>
                </div>

                <div className="">
                    <div className="flex gap-5 justify-end mt-[10px] mr-[15px]">
                        <label className='flex items-center gap-2 py-3 px-6 border rounded-full text-white text-[15px] font-bold'>
                            <PiImageLight className='text-[20px]' />
                            <button>Photo</button>
                        </label>
                        <label className='flex items-center gap-2 py-3 px-6 border rounded-full text-white text-[15px] font-bold'>
                            <PiFilmReelFill className='text-[20px]' />
                            <button>Video</button>
                        </label>
                        <label className='flex items-center gap-2 py-3 px-6 border rounded-full text-white text-[15px] font-bold'>
                            <TbNeedleThread className='text-[20px]' />
                            <button>Thread</button>
                        </label>
                        <label className='flex items-center gap-2 py-3 px-6 border rounded-full text-white text-[15px] font-bold'>
                            <PiImageLight className='text-[20px]' />
                            <button>More</button>
                        </label>
                    </div>
                </div>
            </div>
            {/* POST BAR END */}




            {/* TEXT POST START */}
            {
                postmsg.map((item) =>
                    <div className="bg-[#1B2730] rounded-xl py-[15px] px-[25px] mb-[10px]">
                        <div className="flex items-center gap-5 border-b mb-[10px]">
                            <img className='block object-cover mb-[20px] h-[50px] rounded-full w-[50px]' src={data?.photoURL} alt="" />
                            <div className="">
                                <h1 className='text-[22px] text-white font-semibold '>{data.displayName}</h1>
                                <p className='text-[10px] text-white mb-[20px] font-semibold'>
                                    {moment(item.date, "YYYYMMDD hhmm").fromNow()}
                                </p>
                            </div>
                        </div>
                        <div className="text-[20px] mt-[20px] text-white text-center font-semibold break-words mb-[20px] pb-[20px] border-b">
                            <p className='w-[650px] font-Oswald '>{item.posttext}</p>
                        </div>
                        <div className="font-semibold flex justify-around">
                            <div className="flex items-center text-white text-[20px] gap-2">
                                <AiFillLike className='text-white cursor-pointer'></AiFillLike>
                                <button>LIKE</button>
                            </div>
                            <div className="flex items-center text-white text-[20px] gap-2">
                                <FaCommentAlt className='text-white cursor-pointer'></FaCommentAlt>
                                <button>LIKE</button>
                            </div>
                            <div className="flex items-center text-white text-[20px] gap-2">
                                <FaShareNodes className='text-white cursor-pointer'></FaShareNodes>
                                <button>Sheare</button>
                            </div>
                        </div>

                    </div>
                )}
            {/* TEXT POST END */}





            {/* IMG POST START */}

            <div className="bg-[#1B2730] rounded-xl py-[15px] px-[25px]">
                <div className="flex items-center gap-5 border-b ">
                    <img className='block object-cover mb-[20px] h-[50px] rounded-full w-[50px]' src={reg} alt="" />
                    <div className="">
                        <h1 className='text-[22px] text-white font-semibold '>JAHID HASAN</h1>
                        <p className='text-[10px] text-white mb-[20px] font-semibold'>1212</p>
                    </div>
                </div>
                <div className="text-[20px] h-[500px] overflow-hidden mb-[20px] pb-[20px] border-b">
                    <img className='' src={reg} alt="" />
                </div>
                {/* LIKE PART START */}
                <div className="font-semibold flex justify-around">
                    <div className="flex items-center text-white text-[20px] gap-2">
                        <AiFillLike className='text-white cursor-pointer'></AiFillLike>
                        <button>LIKE</button>
                    </div>
                    <div className="flex items-center text-white text-[20px] gap-2">
                        <FaCommentAlt className='text-white cursor-pointer'></FaCommentAlt>
                        <button>LIKE</button>
                    </div>
                    <div className="flex items-center text-white text-[20px] gap-2">
                        <FaShareNodes className='text-white cursor-pointer'></FaShareNodes>
                        <button>Sheare</button>
                    </div>
                </div>
                {/* LIKE PART END */}

            </div>

            {/* IMG POST END */}



        </div>
    )
}
