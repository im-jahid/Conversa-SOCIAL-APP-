import { useEffect, useState, createRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString, listAll } from "firebase/storage";
import { update, ref as reff, getDatabase, set, push, onValue, remove } from 'firebase/database'
import reg from '../../assets/registration.png';
import { FaPen } from "react-icons/fa6";
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import profileIcon from '../../assets/profile-icon.png'
import Header from '../Sidebar/Header';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const Profile = () => {


    const auth = getAuth();
    const db = getDatabase();
    const storage = getStorage();
    const navigate = useNavigate()
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const [imglist, setimglist] = useState([]);
    const [imgupload, setimgupload] = useState(null);
    const [profile, setProfile] = useState(false)
    const [cancel, setCancel] = useState(false)
    // React crropper
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState('');
    const cropperRef = createRef();
    // React crropper



    const [newImg, setNewImg] = useState('')
    const handelProfile = () => {
        setProfile(true)
    }

    const cancelProfile = () => {
        setCancel(true)
    }

    const newProfile = (e) => {
        e.preventDefault();
        console.log(e.target.files);
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };
    const getCropData = () => {
        // console.log('done');
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            const storage = getStorage();
            const storageRef = ref(storage, auth.currentUser.uid);
            uploadString(storageRef, message4, 'data_url').then(() => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    setNewImg('File available at', downloadURL);
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    }).then(() => {
                        update(reff(db, 'users/' + data.uid), {
                            img: downloadURL
                        });

                        setProfile(false)
                    })
                    console.log('File available at', downloadURL);
                })
            });
        }
    };












    const coverupload = () => {
        if (imgupload == null) return;
        const imgRef = ref(storage, `images/${imgupload.name + v4()}`)
        uploadBytes(imgRef, imgupload).then(() => {
            alert('img uploaded')
            console.log('cover uploded');
        })
    }
    const imglistRef = ref(storage, "images/")
    useEffect(() => {
        listAll(imglistRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setimglist((prev) => [...prev, url]);
                })
            })
        })
    })







    return (


        <>

            {
                profile ?
                    <>
                        {
                            cancel ?
                                <Profile />
                                :
                                <div className='bg-[#EEEAEA] top-0 left-0 z-[1] mt-[-400px]'>
                                    <div className='h-screen w-[450px] bg-[#06141D]'>
                                        <div className='bg-[#1B2730] text-white py-[40px] pl-[90px] pr-[100px] rounded-lg text-center mt-[400px] relative'>
                                            <RxCross1 onClick={cancelProfile} className='text-white p-2 bg-red-500 rounded-xl text-[40px] font-black  absolute top-[30px] right-[30px] cursor-pointer' />
                                            {/* <img className='w-[15%] h-[15%] rounded-full' src={profileIcon} alt="" /> */}
                                            <h3 className='font-open font-bold text-[30px] text-white mb-[10px]'>Upload Your Profile</h3>
                                            <div className='flex justify-between'>
                                                <input onChange={newProfile} className='py-[7px] px-[10px] border-[2px] border-bg[#EAEAF1] font-nunito font-semibold text-[10px] text-white outline-none bg-none w-[300px] mr-[30px]' type='file' placeholder='' />
                                                {
                                                    image ?
                                                            <div
                                                                className="img-preview object-cover"
                                                                style={{ width: "100px", float: "left", height: "100px" }}>
                                                            </div>
                                                        :
                                                        <div>
                                                            <img className='w-[70px] h-[40px] object-cover rounded-full' src={data?.photoURL} alt="" />
                                                        </div>
                                                }
                                            </div>
                                            {
                                                image &&
                                                <Cropper
                                                    ref={cropperRef}
                                                    style={{ height: 300, width: "80%" }}
                                                    zoomTo={0.1}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={image}
                                                    viewMode={1}
                                                    minCropBoxHeight={10}
                                                    minCropBoxWidth={10}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false}
                                                    guides={true}
                                                />


                                            }
                                            <button onClick={getCropData} className='bg-primary text-center font-nunito font-semibold text-[20px] text-[#fff] block py-[5px] px-[50px] mt-[20px] ml-[60px] rounded-lg'>Upload</button>
                                        </div>
                                    </div>
                                </div>
                        }

                    </>
                    :
                    <>
                        <div className="rounded-lg w-[450px] ml-[15px] bg-[#2A3843] text-[#C7D6E5] font-poppins">

                            {/* COVER PICTURE START */}
                            <div className="w-[450px] rounded-t-lg relative h-[120px] bg-[#1B2730] overflow-hidden">
                                {/* <img
                                    src={reg}
                                    alt="coverphoto"
                                    className="block object-cover h-60 w-full"
                                /> */}
                                {
                                    imglist.map((url) => {
                                        return <img src={url}
                                            alt="coverphoto"
                                            className="block object-cover h-60 w-full"
                                        />
                                    })
                                }
                                <label className="absolute top-[10px] p-1 text-[15px] rounded-full text-[#2A3843] bg-white right-[10px] opacity-1 ">
                                    <input onChange={(event) => {
                                        setimgupload(event.target.files[0])
                                    }} className='hidden' type="file" />

                                    {/* <input className='hidden' type="file" /> */}

                                    <FaPen className='cursor-pointer' />
                                </label>
                                    <button onClick={coverupload} className='px-2  m-3 text-[15px] rounded-full text-[#2A3843] bg-white' >SAVE</button>
                            </div>
                            {/* COVER PICTURE END *10

                            {/* PROFILE PICTURE START */}
                            <div className="flex justify-center relative mt-[-55px] mb-[5px]">
                                <img className='block object-cover h-[100px] rounded-full border border-2xl bg-white w-[100px]' src={data?.photoURL} alt="" />
                                <label className="absolute bottom-[10px] p-1 text-[15px] rounded-full text-[#2A3843] bg-white right-[39%]">
                                    <input id="okkk" onClick={handelProfile} className='hidden' type="none" />
                                    <FaPen className='cursor-pointer' />
                                </label>
                            </div>

                            <div className="text-center font-poppins border-b border-[#C7D6E5]">
                                <h1 className=' text-[25px] text-white font-semibold '>{data.displayName}</h1>
                                <p className='text-[10px] mb-[8px]'>{data.email}</p>
                                <p className='w-[300px] mx-auto text-white text-[12px] mb-[10px]'>Lorem nemo quae consequatur ad earum. Aliquam, beatae odio.</p>
                            </div>
                            {/* PROFILE PICTURE END */}

                            {/* Following PART START */}
                            <div className="font-poppins flex mt-[10px] items-center justify-center border-b border-[#C7D6E5]">
                                <div className="mr-[140px]">
                                    <h2 className='text-[22px] text-white font-semibold '>6,664</h2>
                                    <p className='text-white text-[12px] mb-[10px]'>Following</p>
                                </div>
                                <div className="text-center">
                                    <h2 className='text-[22px] text-white font-semibold '>6,664</h2>
                                    <p className='text-white text-[12px] mb-[10px]'>LIKES</p>
                                </div>
                            </div>
                            {/* Following PART END */}

                            <div className="text-center py-4 text-primary">
                                <h4><a href="">My Profile</a></h4>
                            </div>


                        </div>
                    </>
            }
        </>



        // <div className="rounded-lg w-[450px] ml-[15px] bg-[#2A3843] text-[#C7D6E5] font-poppins">

        //     {/* COVER PICTURE START */}
        //     <div className="w-[450px] rounded-t-lg relative h-[120px] overflow-hidden">
        //         {/* <img
        //             src={reg}
        //             alt="coverphoto"
        //             className="block object-cover h-60 w-full"
        //         /> */}
        //         {
        //             imglist.map((url) => {
        //                 return <img src={url}
        //                     alt="coverphoto"
        //                     className="block object-cover h-60 w-full"
        //                 />
        //             })
        //         }
        //         <label className="absolute top-[10px] p-1 text-[15px] rounded-full text-[#2A3843] bg-white right-[10px] opacity-1 ">
        //             <input onChange={(event) => {
        //                 setimgupload(event.target.files[0])
        //             }} className='hidden' type="file" />

        //             <FaPen className='cursor-pointer' />
        //             <button className='bg-red-500' onClick={coverupload}>fhxdfghx</button>
        //         </label>
        //     </div>
        //     {/* COVER PICTURE END *10

        //     {/* PROFILE PICTURE START */}
        //     <div className="flex justify-center relative mt-[-55px] mb-[5px]">
        //         <img className='block object-cover h-[100px] rounded-full w-[100px]' src={reg} alt="" />
        //         <label className="absolute bottom-[10px] p-1 text-[15px] rounded-full text-[#2A3843] bg-white right-[39%]">
        //             <input onChange={handleprofile} className='hidden' type="file" />
        //             <FaPen className='cursor-pointer' />
        //         </label>
        //     </div>

        //     <div className="text-center font-poppins border-b border-[#C7D6E5]">
        //         <h1 className=' text-[25px] text-white font-semibold '>JAHID</h1>
        //         <p className='text-[10px] mb-[8px]'>programmer</p>
        //         <p className='w-[300px] mx-auto text-white text-[12px] mb-[10px]'>Lorem nemo quae consequatur ad earum. Aliquam, beatae odio.</p>
        //     </div>
        //     {/* PROFILE PICTURE END */}

        //     {/* Following PART START */}
        //     <div className="font-poppins flex mt-[10px] items-center justify-center border-b border-[#C7D6E5]">
        //         <div className="mr-[140px]">
        //             <h2 className='text-[22px] text-white font-semibold '>6,664</h2>
        //             <p className='text-white text-[12px] mb-[10px]'>Following</p>
        //         </div>
        //         <div className="">
        //             <h2 className='text-[22px] text-white font-semibold '>6,664</h2>
        //             <p className='text-white text-[12px] mb-[10px]'>Following</p>
        //         </div>
        //     </div>
        //     {/* Following PART END */}

        //     <div className="text-center py-4 text-primary">
        //         <h4><a href="">My Profile</a></h4>
        //     </div>


        // </div>
    )
}

export default Profile


