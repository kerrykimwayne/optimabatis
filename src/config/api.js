import axios from "axios"
import { deletetoken, deleteuser, settoken, setuser, store } from "./redux"
import toast from "react-hot-toast"
const url = 'https://kerrykimwayne.pythonanywhere.com/'

const Axioss = axios.create({ baseURL: url })
Axioss.interceptors.request.use((request) => {
    const token = store.getState().token
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
}, (error) => Promise.reject(error))
//refresh
Axioss.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('tokenrefresh');///////
                if (!refreshToken) {
                    store.dispatch(deletetoken())
                    return Promise.reject(error)
                }
                const { data } = await axios.post(`${url}/tokenrefresh/`, { refresh: refreshToken })
                store.dispatch(settoken(response.data.access))
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                return Axioss(originalRequest)
            } catch (refreshError) {
                store.dispatch(deletetoken())
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const login = async ({ numtelephone, password }) => {
    try {
        const response = await Axioss.post('tokenObtain/', { numtelephone, password })
        console.log(response.status)
        const users = await axios.get('https://kerrykimwayne.pythonanywhere.com/immobilierpannehelper/chageuser/', { headers: { Authorization: `Bearer ${response.data.access}` } })
        console.log(users.status)
        const getUser = users.data
        console.log(getUser, response.data)
        if (response.data && response.data.access && getUser.is_staff === true) {
            const user = response.data
            store.dispatch(settoken(user.access))
            store.dispatch(setuser(getUser))
            toast.success('vous etes connecté', { duration: 3000, })
        }
    }
    catch (error) {
        toast.error(error.message, { duration: 3000, })
    }
}
export const logout = async () => {
    try {
        store.dispatch(deleteuser())
        store.dispatch(deletetoken())
        toast.success('vous etes déconnecté', { duration: 3000, })
    }
    catch (error) {

    }
}


export default Axioss