const UserToken = {
    getToken(){

        return window.localStorage.getItem("serenta-user");
    },
    setToken(token){

        return window.localStorage.setItem("serenta-user", token);
    },
    removeToken(){

        return window.localStorage.removeItem("serenta-user");
    }
};

module.exports = UserToken;