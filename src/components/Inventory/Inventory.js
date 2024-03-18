import React, { useEffect, useState } from 'react'
import { getAllusersService } from '../../services/auth/auth_services';

function Inventory() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const datas = async () => {
            try {

                const response = await getAllusersService();

                if (response) {
                    setUsers(response?.users);
                }

            } catch (error) {

            }
        }
        datas();
    }, [])
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='p-4 w-[90%] mx-auto'>
                <div className='w-[100%] flex justify-start'>
                    <button className='button fw-bold'>Inventory Update</button>
                </div>
                <div className='boxshadow mt-10 w-[100%] h-[100%] py-3 px-5'>
                    {users?.map((item, index) => {
                        return (
                            <div key={index} className='boxshadow mb-3 mt-3 p-3'>
                                <div className='flex w-[100%] content-center justify-center align-items-center'>
                                    <div className='w-[80%] flex gap-10'>
                                        <div>
                                            <img
                                                className='w-[100px] h-[100px] rounded-3xl cursor'
                                                src={item?.avatar} alt="no image" />
                                        </div>
                                        <div>
                                            {item?.username}
                                        </div>
                                    </div>
                                    <div className='w-[20%] flex gap-[30px] content-center justify-center align-items-center'>
                                        <div className='mt-5 flex gap-[50%]'>
                                            <div className='cursor hover:text-green-500 text-2xl '>
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </div>
                                            <div className='cursor hover:text-orange-500 text-2xl'>
                                                <i class="fa-solid fa-eye"></i>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Inventory
