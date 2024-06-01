import instanceBaseurl from "../../Config/AxiosUrl";



export async function getproductServices() {
    try {
        const response = await instanceBaseurl.post(`/admin/approval/products`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function approvalproductServices(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/approval/product/approval`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function rejectproductServices(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/approval/product/reject`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}



export async function chatProductServiceadmin(data) {
    try {
        const response = await instanceBaseurl.put(`/admin/approval/product/chat/`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function getCurrentsingleproductServices(id) {
    try {
        const response = await instanceBaseurl.get(`/admin/approval/get/product/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}