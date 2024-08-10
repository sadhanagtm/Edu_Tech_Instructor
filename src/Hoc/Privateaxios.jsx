import axios from "axios"; 
const Privateaxios=axios.create({
    baseURL:"http://192.168.1.95:8080"
    
})
axiosinstance.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem("token")
axiosinstance.interceptors.request.use(
    async(config)=>{
        config.headers={Authorization:"Bearer "+localStorage.getItem("token")}
        return config
    },
    (error)=>Promise.reject(error)
    
)
export default Privateaxios;