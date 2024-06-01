import React, { useEffect, useState } from 'react'
import { chatUserService, getAllusersService, getuserService } from '../../services/auth/auth_services';
import './Chat.scss';
import { ToastError, ToastSuccess } from '../../Middleware/Toastmodel/ToastModal';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { chatProductServiceadmin, getCurrentsingleproductServices } from '../../services/product_service/product_service';
function ProductChat() {

    const { state } = useLocation();
    const [data, setData] = useState([]);



    const { datalist } = state;
    const [users, setUsers] = useState([]);

    console.log(data, 'data')
    const [chat, setChat] = useState([])

    useEffect(() => {
        const response = async () => {
            try {
                const responseData = await getCurrentsingleproductServices(datalist);
                if (responseData) {
                    setData(responseData?.data);
                }
            } catch (error) {
            }
        }
        response();
    }, [state])
    useEffect(() => {
        const datas = async () => {
            try {
                const response = await getAllusersService();
                if (response) {
                    setUsers(response?.adminuser);
                }
            } catch (error) {
            }
        }
        datas();

        if (data) {
            setChat(data?.adminproductChat);
        }
    }, [data]);






    const [message, setMessages] = useState("");

    const ProductId = data?._id;
    const handleSumitmessage = async () => {

        try {

            if (message?.length === 0) {
                toast.error("Please Enter Message....!")
            }
            if (message) {
                const data = {
                    productId: ProductId,
                    message: message,
                    senderStatus: "senderadmin"
                }
                try {
                    const response = await chatProductServiceadmin(data);
                    if (response) {
                        toast.success("success");
                        setChat([...chat, data]);
                        setMessages("")
                    }
                    else {
                        toast.error("error")
                    }

                } catch (error) {

                }
            }

        } catch (error) {

        }
    }


    return (
        <div className='main-chat w-[100%] mt-4 mb-5  overflow-hidden'>
            <div className='w-[100%] h-[100%] '>
                <div className='flex w-[80%] mx-auto gap-1 h-[70vh]'>
                    <div className='w-[30%] border p-2'>


                        <div className={` p-3 rounded cursor mt-2 mb-2 ${true ? "border-color-red" : ""}`}>
                            <div className={`flex gap-3 `}>
                                <div className='w-[20%]'>
                                    <img src={data?.thumbimage} alt="no image" className='w-[40px] h-[40px] rounded object-conatin' />
                                </div>
                                <div className='w-[80%]'>
                                    <div className='flex justify-between w-[100%] '>
                                        <div>
                                            {data?.productname}
                                        </div>
                                        <div>
                                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='w-[70%] border  '>
                        <div className='w-[100%] h-[100vh] overflow-y-auto overflow-hidden'>
                            <div className='p-3 flex justify-between'>
                                <div className=''>
                                    {data?.productname?.slice(0, 50)}...
                                </div>
                                <div className='flex gap-3 align-items-center justify-center'>
                                    <div>
                                        <img src={data?.user?.avatar ? data?.user?.avatar : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"} alt="no image"
                                            className='w-[25px] h-[25px] rounded'
                                        />
                                    </div>
                                    <div className='text-[12px]'>
                                        {data?.user?.username}
                                    </div>
                                </div>
                            </div>
                            <div className='h-[52%] border overflow-auto right-chat-box'>
                                {chat?.map((item, index) => {
                                    return (
                                        <div className='w-[100%]' key={index}>
                                            <div className={`${item?.senderStatus === "senderseller" ? "sender-message" : "receiver-message"}`} key={index}>
                                                <div className={`${item?.senderStatus === "senderseller" ? "sender-messagess" : "receiver-messagess"}`}>
                                                    {item?.message}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='h-[10%] mt-2'>
                                <div className='flex w-[100%] content-center align-items-center justify-center text-center'>
                                    <div className='w-[90%]'>
                                        <input type="text" placeholder='Message here!!!...'
                                            className='border w-[95%] rounded-full'
                                            value={message}
                                            onChange={(e) => setMessages(e?.target?.value)}
                                        />
                                    </div>
                                    <div onClick={handleSumitmessage} className='cursor flex align-items-center justify-center h-[100%]  content-center'>
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductChat
