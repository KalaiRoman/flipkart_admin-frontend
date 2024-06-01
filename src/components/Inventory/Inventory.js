import React, { useEffect, useState } from 'react'
import { getAllusersService } from '../../services/auth/auth_services';
import { Modal, Button } from 'react-bootstrap';
import { ToastError, ToastSuccess } from '../../Middleware/Toastmodel/ToastModal';
import { sellerApproval, sellerReject } from '../../services/seller_service/seller_service';

function Inventory() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [message, setMessage] = useState("");
    const [singleproductid, setSingleProductid] = useState("");
    const [type, setType] = useState("")
    const handleShow = (data, id) => {
        setShow(true)
        setType(data);
        setSingleProductid(id)
    };
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

    const approvalProduct = async () => {
        try {

            const response = {
                sellerid: singleproductid
            }

            const data = await sellerApproval(response);

            if (data) {
                ToastSuccess("Approval This Seller");
                handleClose();
            }


        } catch (error) {
            ToastError(error)
        }
    }
    const rejectedProduct = async () => {
        try {

            const response = {
                sellerid: singleproductid
            }

            const data = await sellerReject(response);

            if (data) {
                ToastSuccess("Reject This Seller");
                handleClose();

            }


        } catch (error) {
            ToastError(error)
        }
    }
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='p-4 w-[100%] mx-auto'>
                <div className=' mt-10 w-[100%] h-[100%] py-3 px-5'>
                    {users?.map((item, index) => {
                        return (
                            <div key={index} className='boxshadow mb-3 mt-3 p-3'>
                                <div className='flex w-[100%] content-center justify-center align-items-center'>
                                    <div className='w-[100%] flex gap-10'>
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

                                            <div className='cursor hover:text-orange-500 text-2xl'>
                                                <i class="fa-solid fa-eye"></i>
                                            </div>
                                            <div className='cursor hover:text-green-500 text-2xl' onClick={() => {
                                                handleShow("approval", item?._id)
                                            }}>

                                                {item?.sellerStatus ? <div className='text-green-700 fw-bold'>

                                                    <i class="fa-solid fa-circle-check"></i>

                                                </div> : <>

                                                    <i class="fa-solid fa-circle-check"></i>

                                                </>}
                                            </div>
                                            <div className='cursor hover:text-red-500 text-2xl' onClick={() => {
                                                handleShow("reject", item?._id)
                                            }}>
                                                {item?.sellerStatus ? <div>
                                                    <i class="fa-solid fa-circle-xmark"></i>


                                                </div> : <div className='text-red-700'>
                                                    <i class="fa-solid fa-circle-xmark"></i>


                                                </div>}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            {type === "approval" ? "Approval" : "Reject"}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            {type === "approval" ? "Are You Sure Approval This Seller" : "Are You Sure Reject This Seller"}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={type === "approval" ? approvalProduct : rejectedProduct}>
                        {type === "approval" ? "Approval" : "Reject"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Inventory
