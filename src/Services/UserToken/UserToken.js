const UserToken = {
    getToken(){

        return window.localStorage.getItem("serenta-user");
    },
    hasToken(){
        return this.getToken();
    },
    setToken(token){

        return window.localStorage.setItem("serenta-user", token);
    },
    removeToken(){

        return window.localStorage.removeItem("serenta-user");
    }
};

module.exports = UserToken;