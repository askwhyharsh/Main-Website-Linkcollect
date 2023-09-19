import React, { useRef, useState } from 'react'
import Upload from '../../../assets/upload.svg'
import profile from '../../../assets/defaultProfile.svg'
import twitter from '../../../assets/twitterBlue.svg'
import websiteIcon from '../../../assets/websiteIcon.svg'
import { useContext } from 'react'
import { switchMode } from '../../../hooks/switchMode'
import { getCheckUsername, patchUser } from '../../../api-services/userService'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../store/Slices/user.slice'
import toast from 'react-hot-toast'

const Profile = () => {
    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const profilePicRef = useRef();
    const auth = useSelector((state) => state.auth)
    // username error
    const [error, setError] = useState(false);
    // profile privacy
    const [isPublic, setIsPublic] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('light')

    // changed uploaded file
    const [uploadedFile, setUploadedFile] = useState(null)

    // handling profile pic input change
    function handleFileChange() {
        const fileInput = fileInputRef.current;
        const fileLabel = fileInput.nextElementSibling;
        if (fileInput?.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileLabel.innerText = "";
            console.log(file);
            setUploadedFile(file);
            console.log(uploadedFile);
            setSrc();
        } else {
        }
    }

    function setSrc() {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileInputRef.current.files[0])
        function changeImageSource(e) {
            profilePicRef.current.src = e.target.result
        }
        fileReader.onload = changeImageSource
    }
    
    //user personal data
    const [userProfileData, setUserProfileData] = useState({
        fullName: 'Harsh Singh',
        username: 'harsh0001',
        isPublic: isPublic,
        email: 'harsh0001@gmail.com'
    })

    // user social links
    const [userSocialLinks, setUserSocialLinks] = useState({
        websiteUrl: '',
        twitterUrl: ''
    })

    // File max size
    const MAXED_ALLOWED_SIZE = 1 * 1024 * 1024;
    // if no file is selected that means iamge is null so it will be always true as image is not mandatory data
    const isValidFileSize = uploadedFile === null ? true : uploadedFile.size <= MAXED_ALLOWED_SIZE;

    const isValidUsername = async (username) => {
        if (userProfileData.username !== auth.username) {
            const res = await getCheckUsername(username);
            console.log(res);
            if (res.data.data === false) {
                setError(true);
                console.log("Showed error");
                return false;
            } else {
                setError(false);
                console.log("Username response", res.data);
                return true;
            }
        } 
    }

    // useEffect(() => {
    //     error && toast.error("Username Not available 😫", {
    //         style: {
    //           border: '1px solid #4B4C63',
    //           padding: '6px',
    //           color: '#713200',
    //           boxShadow: "none",
    //           width: 'max-content',
    //           minWidth: "max-content"
    //         },
    //       })
    // }, [error])

    // Edit user details handler
    const onChangeUserData = (e) => {
        e.preventDefault();
        setUserProfileData(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    // social links change handler
    const onChangeSocialLinks = (e) => {
        e.preventDefault();
        setUserSocialLinks(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    // handling public private switch
    const handleSwitchPrivacy = (isPublic) => {
        setUserProfileData(prev => ({ ...prev, isPublic: isPublic }))
    }

    // handling theme switch
    const handleSwitchTheme = (value) => {
        setSelectedTheme(value)
    }

    useEffect(() => {
        const setUser = {
            fullName: auth.userData.name,
            username: auth.username,
            isPublic: auth.userData.isPublic,
            email: auth.userData.email
        }
        const setSocial = {
            twitterUrl: auth.userData.socials[0],
            websiteUrl: auth.userData.socials[1]
        }
        if (auth.isPublic) {
            setIsPublic(true)
            handleSwitchPrivacy(true)
        }
        setUserProfileData(setUser)
        setUserSocialLinks(setSocial)
        console.log(userProfileData);
    }, [])

    const handleSave = async(user) => {
        const isCorrectData = isValidUsername(userProfileData.username) && isValidFileSize;
        try {
            if (isCorrectData) {
                const { username, fullName, isPublic } = userProfileData
                const { twitterUrl, websiteUrl } = userSocialLinks
                const userFormData = new FormData();
                userFormData.append('username',username);
                userFormData.append('name', fullName);
                userFormData.append('isPublic', isPublic);
                uploadedFile !== null && userFormData.append('profilePic', uploadedFile);
                userFormData.append('socials', JSON.stringify([twitterUrl, websiteUrl]));
                
                const userResponse = await patchUser(userFormData); 

                userResponse && dispatch(setUser({
                    username: userProfileData.username,
                    userData: {
                        name: userProfileData.fullName,
                        // email: userProfileDdata.email,
                        profilePic: userResponse.data.data.profilePic,
                        isPublic: isPublic,
                        socials: [userSocialLinks.twitterUrl, userSocialLinks.websiteUrl],
                    },
                }))
                console.log(...userFormData);
                console.log("truthy", isCorrectData);
                console.log(userResponse);
            } else {
                console.log("Not correct data", isValidFileSize, uploadedFile.size );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const { selectedMode } = useContext(switchMode)
    
    return (
        <div className='w-11/12 mx-auto sm:w-full flex flex-col items-center sm:items-start justify-center gap-8 max-w-[824px]'>

            {/* First section of profile settings (name, email, username etc) */}
            <div className="flex flex-col items-center justify-center w-full gap-6 pt-4 sm:items-start ">
                {/* Profile Image */}
                <div className="flex items-center justify-start w-full gap-6">
                    <img src={profile} ref={profilePicRef} alt="" className='w-20 h-20 rounded-full' />
                    <div className="flex flex-col gap-1">
                        <div className={`relative w-32 border rounded-md ${selectedMode === "dark" ? "border-neutral-800 bg-dark-background" : "border-neutral-300 bg-neutral-200"}`}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                id='myFileInput'
                                // className={`w-full px-2 text-sm font-normal leading-6 rounded-md cursor-pointer h-9 ${selectedMode === "dark" ? "file:border-neutral-800 file:bg-dark-background" : "file:border-neutral-300 file:bg-neutral-200" } file:border-0 file:h-full file:cursor-pointer ${selectedMode === "dark" ? "file:text-white" : "file:text-black"} font-inter focus:outline-none`}
                                // style={{ boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.04)` }}
                                onChange={handleFileChange}
                                accept='image/png, image/jpg'
                            />
                            <img src={Upload} alt="upload" className="absolute w-4 h-4 -translate-y-1/2 top-1/2 right-2" />
                            <label htmlFor="myFileInput"></label>
                        </div>
                        <span className='text-xs font-normal text-neutral-400'>
                            400 X 400 px jpg or png format
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-5 mx-auto sm:items-start">

                    <div className="flex flex-col items-center justify-center w-full gap-3 mx-auto sm:items-start">

                        {/* full name, username */}
                        <div className="flex flex-col items-start justify-center w-full gap-5 md:flex-row">
                            <div className="flex flex-col items-start justify-center w-full">
                                <label htmlFor="Full_Name" className={`flex items-start justify-start text-base font-normal ${selectedMode === "dark" ? 'text-neutral-100' : "text-neutral-700"}`}>Full Name</label>
                                <input type="text" onChange={onChangeUserData} id='Full_Name' name='fullName' className={`w-full px-2 py-3 text-base font-normal border-2 rounded-lg focus:border-primary-300 ${selectedMode === "dark" ? 'border-dark-secondary' : "border-neutral-400"} focus:outline-none ${selectedMode === "dark" ? 'bg-dark-border' : "bg-neutral-50"} ${selectedMode === "dark" ? 'text-neutral-300' : "text-neutral-900"}`} value={userProfileData.fullName} />
                            </div>
                            <div className="flex flex-col items-start justify-center w-full">
                                <label htmlFor="Full_Name" className={`flex items-start justify-start text-base font-normal ${selectedMode === "dark" ? 'text-neutral-100' : "text-neutral-700"}`} >Username</label>
                                <input type="text" onChange={onChangeUserData} id='username' name='username' className={`w-full px-2 py-3 text-base font-normal border-2 rounded-lg focus:border-primary-300 ${selectedMode === "dark" ? 'border-dark-secondary' : "border-neutral-400"} focus:outline-none ${selectedMode === "dark" ? 'bg-dark-border' : "bg-neutral-50"} ${selectedMode === "dark" ? 'text-neutral-300' : "text-neutral-900"}`} value={userProfileData.username} />
                                <span className='w-full text-xs font-normal text-left whitespace-nowrap sm:text-sm text-neutral-400'>Your linkcollect profile URL: https://linkcollect.io/harsh007</span>
                            </div>
                        </div>

                        {/* Email  */}
                        <div className="flex flex-col items-start justify-center w-[48%]">
                            <label htmlFor="Full_Name" className={`flex items-start justify-start text-base font-normal ${selectedMode === "dark" ? 'text-neutral-100' : "text-neutral-700"}`}>Account Email</label>
                            <input readOnly type="email" id='Full_Name' className={`w-full px-2 py-3 text-base font-normal border-2 rounded-lg focus:border-neutral-400 focus:outline-none focus:ring-neutral-400 text-neutral-500 ${selectedMode === "dark" ? 'border-dark-secondary' : "border-neutral-400"} ${selectedMode === "dark" ? 'bg-dark-secondary' : "bg-neutral-200"} ${selectedMode === "dark" ? 'text-neutral-200' : "text-neutral-900"}`} value={userProfileData.email} />
                        </div>

                    </div>
                    {/* Privacy switch */}
                    <div className="flex flex-row items-start justify-between w-full gap-3 md:gap-0 sm:pr-6 lg:px-0">
                        <div className="flex flex-col items-start justify-between gap-1">
                            <span className={`text-xs font-normal ${selectedMode === "dark" ? "text-neutral-50" : "text-neutral-700"} sm:text-[13px] `}>Select profile type</span>
                            <span className='text-[11.2px] font-normal capitalize text-neutral-400 '>{userProfileData.isPublic ? 'Public' : 'Private'} profile...</span>
                        </div>
                        <div className={`flex relative items-start justify-center gap-1.5 p-1 w-40 sm:w-40 border-2 ${selectedMode === "dark" ? "border-dark-secondary" : "border-neutral-400"} h-9 ${selectedMode === "dark" ? "bg-dark-background" : "bg-neutral-300"} py-[0.25rem] rounded-lg`}>
                            <div className={`relative z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${selectedMode === "dark" ? "text-neutral-50" : "text-black"} text-sm sm:text-base font-normal`} onClick={() => handleSwitchPrivacy(false)}>
                                <span>
                                    Private
                                </span>
                            </div>
                            <div className={`relative z-10 rounded text-sm sm:text-base w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${selectedMode === "dark" ? "text-neutral-50" : "text-black"} font-normal`} onClick={() => handleSwitchPrivacy(true)}>
                                <span>
                                    Public
                                </span>
                            </div>
                            <div className={`absolute w-[49%] h-[75%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded z-[1]  ${selectedMode === "dark" ? "bg-dark-secondary" : "bg-neutral-50"} ${!userProfileData.isPublic ? 'translate-x-[5%]' : 'translate-x-[100%]'}`}></div>
                        </div>
                    </div>

                    {/* save */}
                    <div className='flex items-start w-full my-3'>
                        <button onClick={() => handleSave({
                            name: userProfileData.fullName,
                            username: userProfileData.username,
                            isPublic: userProfileData.isPublic,
                            email: userProfileData.email})} className=" hover:bg-primary-500 hover:text-white transition-all duration-500 hover:scale-110 w-16 h-7 p-1.5 flex items-center justify-center border border-primary-500  text-primary-500 font-normal text-base rounded">Save</button>
                    </div>
                </div>
            </div>

            <hr className={`w-full border ${selectedMode === "dark" ? "border-neutral-600" : "border-neutral-300"}`} />

            {/* Social Links */}
            <div className="flex flex-col items-start justify-center w-full gap-6 sm:items-start ">
                <div className="flex flex-col items-start justify-between gap-1">
                    <span className={`text-sm font-normal ${selectedMode === "dark" ? "text-neutral-50" : "text-neutral-700"}`}>Social links</span>
                    <span className='text-xs font-normal capitalize text-neutral-400'>Note: You only need to add your username.</span>
                </div>
                <div className="flex flex-col items-start justify-center w-full gap-4 md:flex-row">
                    <div className="relative flex items-start justify-center w-full  max-w-[395px]">
                        <input type="text" name='twitterUrl' onChange={onChangeSocialLinks} className={`w-full px-3 py-2 text-base font-normal border-2 rounded-lg focus:border-primary-300 ${selectedMode === "dark" ? 'border-dark-secondary' : "border-neutral-400"} focus:outline-none ${selectedMode === "dark" ? 'bg-dark-border' : "bg-neutral-50"} ${selectedMode === "dark" ? 'text-neutral-300' : "text-neutral-900"}`} value={userSocialLinks.twitterUrl} placeholder='twitter.com/' />
                        <img src={twitter} className='absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2' alt="twitter" />
                    </div>
                    <div className="relative flex items-start justify-center w-full max-w-[395px] ">
                        <input type="text" name='websiteUrl' onChange={onChangeSocialLinks} className={`w-full px-3 py-2 text-base font-normal border-2 rounded-lg focus:border-primary-300 ${selectedMode === "dark" ? 'border-dark-secondary' : "border-neutral-400"} focus:outline-none ${selectedMode === "dark" ? 'bg-dark-border' : "bg-neutral-50"} ${selectedMode === "dark" ? 'text-neutral-300' : "text-neutral-900"}`} value={userSocialLinks.websiteUrl} placeholder='website url' />
                        <img src={websiteIcon} className='absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2' alt="twitter" />
                    </div>
                </div>

                {/* save */}
                <div className='flex items-start w-full'>
                    <button onClick={() => handleSave({socials: [userSocialLinks.twitterUrl, userSocialLinks.websiteUrl]})} className=" hover:bg-primary-500 hover:text-white transition-all duration-500 hover:scale-110 w-16 h-7 p-1.5 flex items-center justify-center border border-primary-500  text-primary-500 font-normal text-base rounded">Save</button>
                </div>
            </div>

            <hr className={`w-full border ${selectedMode === "dark" ? "border-neutral-600" : "border-neutral-300"}`}/>

            {/* theme switch */}
            <div className="flex flex-row items-start justify-between w-full gap-3 md:gap-0 ">
                <div className="flex flex-col items-start justify-between gap-1">
                    <span className={`text-sm font-normal ${selectedMode === "dark" ? "text-neutral-50" : "text-neutral-700"}`}>Theme</span>
                    <span className='text-xs font-normal capitalize text-neutral-400'>Select website color theme.</span>
                </div>
                <div className={` relative flex items-start justify-center gap-2 p-1 w-40 h-9  ${selectedMode === "dark" ? "border-dark-secondary" : "border-neutral-400"} h-9 ${selectedMode === "dark" ? "bg-dark-background" : "bg-neutral-300"} border-2 rounded-lg`}>
                    <div className={`${selectedTheme === 'light' ? 'bg-none' : 'bg-none'} z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${selectedMode === "dark" ? "text-neutral-50" : "text-black"}  text-sm sm:text-base font-normal`} onClick={() => handleSwitchTheme('light')}>
                        <span>
                            Light
                        </span>
                    </div>
                    <div className={`${selectedTheme === 'dark' ? 'bg-none' : 'bg-none'} z-10 rounded w-1/2 h-full cursor-pointer transition-all duration-300 py-1.5 px-2.5 flex items-center justify-center ${selectedMode === "dark" ? "text-neutral-50" : "text-black"}  text-sm sm:text-base font-normal`} onClick={() => handleSwitchTheme('dark')}>
                        <span>
                            Dark
                        </span>
                    </div>
                    <div className={`absolute w-[49%] h-[85%] transition-transform duration-200 top-1/2 -translate-y-1/2 left-0 rounded z-[1] ${selectedMode === "dark" ? "bg-dark-secondary" : "bg-neutral-50"} ${selectedTheme === 'light' ? 'translate-x-[5%]' : 'translate-x-[100%]'}`}></div>

                </div>
            </div>

            <hr className={`w-full border ${selectedMode === "dark" ? "border-neutral-600" : "border-neutral-300"}`}/>

            {/* Delete my account */}
            <div className="flex flex-col items-start justify-between gap-5 mb-12">

                <span className={`text-sm font-medium leading-6 ${selectedMode === "dark" ? "text-neutral-50" : "text-neutral-700"}`}>Delete my account</span>

                <span className={`max-w-[530px] text-xs font-normal capitalize ${selectedMode === "dark" ? "text-neutral-400" : "text-neutral-600"} text-left`}>Deleting the account will delete all the data. You will not be able to recover your account once you delete it.</span>

                {/* delete btn */}
                <div className='flex items-start w-full '>
                    <button className="flex items-center justify-center p-2.5 text-sm sm:text-base font-normal w-[136px] sm:w-[170px] text-white transition-all duration-500 rounded-md hover:scale-110 h-9 bg-error-500">Delete</button>
                </div>

            </div>
        </div>
    )
}

export default Profile