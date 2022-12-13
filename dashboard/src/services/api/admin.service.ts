import api from "./api.service";

const Admin = {
    getUserListService() {
        return api.get(`/users`);
    },

    getUserByIdService(payload: any) {
        return api.get(`/users/` + payload?._id);
    },
    getAnalytics(start: number, end: number) {
        return api.get(`/analytics?start=${start}&end=${end}`)
    }
};
export default Admin;
