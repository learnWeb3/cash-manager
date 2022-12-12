import api from "./api.service";

const Admin = {
    getUserListService() {
        return api.get(`/users`);
    },

    getUserByIdService(payload: any) {
        return api.get(`/users/`+payload?._id);
    }
};
export default Admin;
