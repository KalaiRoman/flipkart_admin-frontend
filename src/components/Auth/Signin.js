import React, { useState } from 'react'
import { loginlogo } from '../../Assests/images/index';
import { ToastError, ToastSuccess } from '../../Middleware/Toastmodel/ToastModal';
import { Loginservice } from '../../services/auth/auth_services';
import { useNavigate } from 'react-router-dom';
function Signin() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        passowrd: ""
    });

    const { email, password } = user;

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSumbit = async () => {

        try {
            const data = {
                email: email,
                password: password,
            }
            const backendResponse = await Loginservice(data);
            if (backendResponse) {
                ToastSuccess("Login Successfully")
                localStorage.setItem("flip-token-ad", JSON.stringify(backendResponse?.token));
                setTimeout(() => {
                    navigate("/home");
                }, 300);
            }

        } catch (error) {
            ToastError(error?.response?.data?.message);
        }


    }


    return (
        <div className='w-[100%] h-[100vh] overflow-hidden xs:overflow-auto xs:flex-row-reverse'>
            <div className='flex w-[100%] h-[100%] xs:flex-col '>
                <div className='w-[30%] border h-[100%] shadow-md  bg-[#FCF5ED] xs:w-[100%] flex content-center justify-center'>
                    <section className=" flex content-center justify-center dark:bg-gray-900 p-5">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white text-center">
                                Welcome Back. Please Log In To Your Account.
                            </span>
                            <div className="w-full  rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-1 space-y-4 md:space-y-6 sm:p-8">

                                    <>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email"
                                                onChange={handleChange}
                                                value={email}
                                                name="email" id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password"
                                                onChange={handleChange}
                                                value={password}
                                                name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>
                                        <div className="flex items-center justify-end">

                                            <span className="text-sm font-medium text-primary-600 cursor hover:text-orange-500 dark:text-primary-500" onClick={() => window.location.assign("/forget-password")} >Forgot password?</span>
                                        </div>
                                        <button onClick={handleSumbit} className="w-full text-white bg-orange-400 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                    </>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
                <div className='w-[70%] h-[100%]  flex  mx-auto content-center justify-center xs:[100%]'>
                    <div className='flex  justify-center content-center h-[100%]'>
                        <img src={loginlogo} alt="no image login"
                            className='w-[100%] h-[auto] object-contain p-[10%] xs:w-[100%] xs:h-[100%] '
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
