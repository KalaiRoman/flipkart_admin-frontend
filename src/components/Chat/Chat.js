import React, { useEffect, useState } from 'react'
import { chatUserFilterService, chatUserService, getAllusersService, chatPortfoliusersUpdateStatus,getuserService,chatPortfoliusers,getPortfolioUsers,getuserPortfolioChatService } from '../../services/auth/auth_services';
import './Chat.scss';
import { ToastSuccess } from '../../Middleware/Toastmodel/ToastModal';
function Chat() {
    const [users, setUsers] = useState([]);
    const [currentuserid, setCurrentUserId] = useState(users[0]?._id);
    const [currentusers, setCurrentUsers] = useState({});
    const [currentuserChat, setCurrentuserChat] = useState([]);
    const [Typeofusers, setTypeofUsers] = useState("");

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
    }, [Typeofusers,currentuserChat]);

    useEffect(() => {
        if (users) {
        }
        
    }, [users, currentuserid,Typeofusers])

    const datas = [
        {
            id: 1,
            message: "kalai",
            type: "send"
        },
        {
            id: 2,
            message: "kalai",
            type: "received"
        },
        {
            id: 3,
            message: "kalai",
            type: "received"
        },
        {
            id: 4,
            message: "kalai",
            type: "send"
        }
    ];


    const filterUsers=async(types)=>{
try {
    setTypeofUsers(types);

    if(Typeofusers=="portfoliouser")
        {
            const response=await getPortfolioUsers();
            if(response)
                {
                    setUsers(response?.user);
                }
        }
        else
        {
            const response=await chatUserFilterService();

            if(response)
                {
                    setUsers(response?.user);
                }
        }
  
   
    
} catch (error) {
    
}
    }
    const [message, setMessages] = useState("");
    const handleSumitmessage = async () => {
        try {


            if(Typeofusers=="portfoliouser")
                {
                    const data = {
                        message: message,
                        type: "receiver",
                        userid:currentuserid
                    }
                    const response = await chatPortfoliusers(data);

                    
                    const list={
                        userid:currentuserid,
                        type:"sender"
                    }
                    await chatPortfoliusersUpdateStatus(list);
                    if (response) {
                        setMessages("");
                        setCurrentuserChat([...currentuserChat, data]);
        
                    }
                }
                else{
                    const data = {
                        message: message,
                        type: "sender",
                        userid: currentuserid
                    }
                    
                    const response = await chatUserService(data);

                
                    if (response) {
                        ToastSuccess("success messages");
                        setMessages("");
                        setCurrentuserChat([...currentuserChat, data]);
        
                    }
                }
            
        } catch (error) {

        }
    }

    const singleUserid = async (id) => {
        setCurrentUserId(id);

        try {

            const datas = {
                userid: id
            }

            if(Typeofusers=="portfoliouser")
            {
                const response = await getuserPortfolioChatService(datas);
                if (response) {
                    setCurrentUsers(response?.user);
                    setCurrentuserChat(response?.user?.chat);
                    const list={
                        userid:currentuserid,
                        type:"sender"
                    }
                    await chatPortfoliusersUpdateStatus(list);
                }
            }
            else{
                const response = await getuserService(datas);
                if (response) {
                    setCurrentUsers(response?.user);
                    setCurrentuserChat(response?.user?.chat);
                  
                }
            }

           

        } catch (error) {

        }
    }


    useEffect(()=>{

    },[currentuserChat,currentuserid,users,currentusers])
    console.log(currentuserChat,users,'currentuserChat')
    return (
        <div className='main-chat w-[100%] mt-4 mb-5  overflow-hidden'>
            <div className='w-[100%] h-[100%] '>
                <div className='flex w-[80%] mx-auto gap-1 h-[70vh]'>
                    <div className='w-[30%] border p-2'>
                    <div className='d-flex gap-4 align-items-center'>
                        <div>
                            <button  onClick={()=>filterUsers("seller")} className='border p-3 rounded bg-orange-500 border-none w-auto text-white cursor-auto'>Sellers</button>
                        </div>
                        <div>
                        <button onClick={()=>filterUsers("portfoliouser")} className='border p-3 rounded bg-green-500 border-none w-auto text-white cursor-auto'>Portfolio users</button>
                        </div>
                    </div>
                        {users?.map((item, index) => {
                            return (
                                <div className={` p-3 rounded cursor mt-2 mb-2 ${currentuserid == item?._id ? "border-color-red" : "border"}`} key={index}>
                                    <div className={`flex gap-3 `} onClick={() => singleUserid(item?._id)}>
                                        <div className='w-[20%]'>
                                            {item && item?.avatar ? <>
                                                <img src={item?.avatar} alt="no image" className='w-[40px] h-[40px] rounded-full object-cover' />
                                            </> : <>
                                                <img src={"https://static.vecteezy.com/system/resources/previews/027/312/393/original/portrait-of-a-call-center-woman-customer-service-isolated-essential-workers-avatar-icons-characters-for-social-media-user-profile-website-and-app-3d-render-illustration-png.png"} alt="no image" className='w-[40px] h-[40px] rounded-full object-cover' />
                                            </>}
                                        </div>
                                        <div className='w-[80%]'>
                                            <div className='flex justify-between w-[100%] '>
                                                <div>
                                                    {item?.username}
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-[70%] border '>
                        <div className='w-[100%] h-[100vh]'>
                            <div className='p-3'>
                                {currentusers?.username}
                            </div>
                            <div className='h-[52%] border overflow-auto right-chat-box'>
                                {currentuserChat?.map((item, index) => {
                                    return (
                                        <div className='w-[100%]' key={index}>
                                            <div className={`${item?.type === "sender" ? "sender-message" : "receiver-message"}`} key={index}>
                                                <div className={`${item?.type === "sender" ? "sender-messagess" : "receiver-messagess"}`}>
                                                    {item?.message}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                {currentuserChat?.length === 0 ? <div className='text-center d-flex align-items-center justify-center h-[100%]'>No Chat Here!!!</div> : null}
                            </div>
                            <div className='h-[10%] mt-2'>
                                <div className='flex w-[100%] content-center align-items-center justify-center text-center'>
                                    <div className='w-[90%]'>
                                        <input type="text" placeholder='Message here!!!...'
                                            className='border w-[90%] rounded-full'
                                            value={message}
                                            onChange={(e) => setMessages(e?.target?.value)}
                                        />
                                    </div>
                                    <div onClick={handleSumitmessage} className=' cursor flex align-items-center justify-center h-[100%] border content-center'>
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

export default Chat
