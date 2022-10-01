import {BASEURL} from './config'
import Axios from 'axios'

export const getFeed = async () => {
  return await Axios.get(BASEURL+'/updates', {withCredentials: true})
}

export const publish = async (args) => {
  return await Axios.post(BASEURL+'/updates/create', args, {withCredentials: true})
}

export const deleteFeed = async (id) => {
  return await Axios.delete(BASEURL+'/updates/delete/' + id, {withCredentials: true})
}
