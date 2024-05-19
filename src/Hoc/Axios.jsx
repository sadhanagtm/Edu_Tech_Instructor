import axios from "axios"; 
const axiosinstance=axios.create({
    baseURL:"http://192.168.100.31:8080"
    
})
axiosinstance.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem("token")
axiosinstance.interceptors.request.use(
    async(config)=>{
        config.headers={Authorization:"Bearer "+localStorage.getItem("token")}
        return config
    },
    (error)=>Promise.reject(error)
    
)
export default axiosinstance