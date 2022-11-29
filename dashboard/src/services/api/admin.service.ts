import api from "./api.service";

const Admin = {
    getUserListService() {
        return api.get(`/users`);
    }
};
export default Admin;
