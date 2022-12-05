import api from "./api.service";

const User = {
    getUserSelfData() {
        return api.get(`/user`);
    }
};
export default User;
