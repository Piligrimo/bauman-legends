import {BASEURL} from './config'
import Axios from 'axios'

export const signUp = async (args) => {
  await Axios.post('http://testing.legends.bmstu.ru:80/user/sign_up', args)
}

export const signIn = async (args) => {
  console.log('args', args)
  await fetch(BASEURL+'/user/sign_in', {
    headers: {
      "content-type": "application/json"
    },
    mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify(args)
  })
}