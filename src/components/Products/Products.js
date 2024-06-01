import React, { useEffect, useState } from 'react'
import { approvalproductServices, chatProductServiceadmin, getproductServices, rejectproductServices } from '../../services/product_service/product_service';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { ToastError, ToastSuccess } from '../../Middleware/Toastmodel/ToastModal';
function Products() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
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


    useEffect(() => {
        const response = async () => {
            try {
                const responseData = await getproductServices();
                if (responseData) {
                    setData(responseData?.data);
                }
            } catch (error) {
            }
        }
        response();
    }, []);






    const moveChatproduct = async (index) => {
        navigate(`/productchat`, { state: { datalist: index } })
    }


    const approvalProduct = async () => {
        try {

            const response = {
                productid: singleproductid
            }

            const data = await approvalproductServices(response);

            if (data) {
                ToastSuccess("Approval This Product");
                handleClose();
            }


        } catch (error) {
            ToastError(error)
        }
    }
    const rejectedProduct = async () => {
        try {

            const response = {
                productid: singleproductid
            }

            const data = await rejectproductServices(response);

            if (data) {
                ToastSuccess("Reject This Product");
                handleClose();

            }


        } catch (error) {
            ToastError(error)
        }
    }
    return (
        <div className='w-[100%] h-[100%]'>
            <div className='p-4 w-[90%] mx-auto'>

                <div className='mt-10 w-[100%] h-[100%] py-3 px-5'>
                    {data?.map((item, index) => {
                        return (
                            <div key={index} className='boxshadow mb-3 mt-3 p-3'>
                                <div className='flex w-[100%] content-center justify-center align-items-center'>
                                    <div className='w-[60%] flex gap-10'>
                                        <div>
                                            <img
                                                className='w-[80px] h-[80px] rounded cursor object-contain border p-2'
                                                src={item?.thumbimage} alt="no image" />
                                        </div>
                                        <div>
                                            <div className='fw-bold fs-6 text-orange-400'>
                                                {item?.productname}

                                            </div>
                                            <div className='fw-bold fs-3'>
                                                {item?.saleprice}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='w-[40%] flex gap-[30px] content-center justify-center align-items-center'>
                                        <div className='mt-5 flex gap-[30%]'>
                                            <div className='cursor hover:text-green-500 text-2xl '
                                                onClick={() => moveChatproduct(item?._id)}
                                            >
                                                <i class="fa-regular fa-comment"></i>
                                            </div>
                                            <div className='cursor hover:text-orange-500 text-2xl'>
                                                <i class="fa-solid fa-eye"></i>
                                            </div>
                                            <div className='cursor hover:text-red-500 text-2xl' onClick={() => {
                                                handleShow("approval", item?._id)
                                            }}>

                                                {item?.productStatus ? <div className='text-green-700 fw-bold'>

                                                    {/* <i class="fa-regular fa-thumbs-up color"></i> */}
                                                    <i class="fa-solid fa-circle-check"></i>

                                                </div> : <>

                                                    <i class="fa-solid fa-circle-check"></i>

                                                </>}
                                            </div>
                                            <div className='cursor hover:text-red-500 text-2xl' onClick={() => {
                                                handleShow("reject", item?._id)
                                            }}>
                                                {item?.productStatus ? <div >
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
                            {type === "approval" ? "Are You Sure Approval This Product" : "Are You Sure Reject This Product"}
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

export default Products
