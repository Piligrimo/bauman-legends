import {BASEURL} from './config'
import Axios from 'axios'

export const signUp = async (data) => {
  // await Axios.post(BASEURL+'/user/sign_up', args)
  await Axios({
    method: 'POST',
    url: BASEURL+'/user/sign_up',
    data
  })
}

export const signIn = async (args) => {
  await Axios.post(BASEURL+'/user/sign_in', args)
}