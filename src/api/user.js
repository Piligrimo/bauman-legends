import {BASEURL} from './config'
import Axios from 'axios'

export const signUp = async (args) => {
   await Axios.post(BASEURL+'/user/sign_up', args, {withCredentials: true})
}

export const signIn = async (args) => {
  await Axios.post(BASEURL+'/user/sign_in', args, {withCredentials: true})
}

export const getUser = async () => {
  await Axios.get(BASEURL+'/user/info', {withCredentials: true})
}