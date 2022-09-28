import {BASEURL} from './config'
import Axios from 'axios'

export const getFeed = async () => {
  return await Axios.get(BASEURL+'/updates', {withCredentials: true})
}
