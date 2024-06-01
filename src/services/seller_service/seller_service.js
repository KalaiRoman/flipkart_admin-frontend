import instanceBaseurl from "../../Config/AxiosUrl";



export async function sellerApproval(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/approval/update/seller`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function sellerReject(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/approval/update/seller/reject`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}