import {BASEURL} from './config'


export const signUp = async (args) => {
  console.log('args', args)
  await fetch(BASEURL+'/user/sign_up', {
    method: 'POST',
    body: JSON.stringify(args)
  })
}

export const signIn = async (args) => {
  console.log('args', args)
  await fetch(BASEURL+'/user/sign_in', {
    method: 'POST',
    body: JSON.stringify(args)
  })
}