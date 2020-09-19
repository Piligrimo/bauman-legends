import {BASEURL} from './config'
import Axios from 'axios'

export const signUp = async (args) => {
  return await Axios.post(BASEURL+'/user/sign_up', args, {withCredentials: true})
}

export const signIn = async (args) => {
  return await Axios.post(BASEURL+'/user/sign_in', args, {withCredentials: true})
}

export const getUser = async () => {
  return await Axios.get(BASEURL+'/user/info', {withCredentials: true})
}

export const logOut = async () => {
  return await Axios.get(BASEURL+'/user/logout', {withCredentials: true})
}