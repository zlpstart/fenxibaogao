import uuidv1 from 'uuid/v1'
import axios from '../../utils/request'
import { login } from '../../api/Login/index'
import { getToken, setToken, removeToken } from '../../utils/auth'

const state = {
    token: '',
    loginState:false
}

const getters = {
    getToken: state => state.token,
    getLoginState:state => state.loginState
}

const mutations = {
    changeToken: (state, e) => state.token = e,
    changeLoginState:(state,e) => state.loginState = e
}

const actions = {
    login({ commit, state }, ruleForm) {
        const { loginName, password } = ruleForm
        console.log("我发过来了")
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: "/systemservice/v1/sys/login",
                headers: {
                    "sessionToken": uuidv1(),
                    "accessKey": "db92d25ba03d4239a5106d01ad255a29"
                },
                data: {
                    "loginName": loginName,
                    "password": password,
                    "sessionToken": uuidv1()
                }
            })
                .then(res => {
                    setToken(res.sessionToken)
                    commit("changeToken", res.sessionToken)
                    commit("changeLoginState",true)
                    resolve()
                })
                .catch(err => {
                    reject(error)
                })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}