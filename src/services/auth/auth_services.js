import instanceBaseurl from "../../Config/AxiosUrl";





export async function Loginservice(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/login`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}




export async function getuserService(id) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/get`, id);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getuserPortfolioChatService(id) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/get/portfolio`, id);
        return response.data;
    } catch (err) {
        throw err;
    }
}
export async function updateService(data) {
    try {
        const response = await instanceBaseurl.put(`/admin/auth/update`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function getAllusersService() {
    try {
        const response = await instanceBaseurl.get(`/admin/auth/getall/users`);
        return response.data;
    } catch (err) {
        throw err;
    }
}


export async function chatUserService(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/chat/admin-to-seller`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function chatUserFilterService(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/chat/user/filter`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function chatPortfoliusers(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/chat/admin-to-portfolio`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function chatPortfoliusersUpdateStatus(data) {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/chat/user/status/update`, data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getPortfolioUsers() {
    try {
        const response = await instanceBaseurl.post(`/admin/auth/get/allportfoiousers`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

