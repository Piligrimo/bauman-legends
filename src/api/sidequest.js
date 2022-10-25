import {BASEURL} from './config'
import Axios from 'axios'


export const checkCode = async (code) => {
    return await Axios.get(BASEURL+'/final/side/'+code, {withCredentials: true})
}