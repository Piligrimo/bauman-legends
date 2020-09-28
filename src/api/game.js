import {BASEURL} from './config'
import Axios from 'axios'

export const getTask = async () => {
    return await Axios.get(BASEURL+'/game/info', {withCredentials: true})
}

export const nextTask = async () => {
    return await Axios.get(BASEURL+'/game/next', {withCredentials: true})
}

export const skipTask = async () => {
    return await Axios.get(BASEURL+'/game/skip', {withCredentials: true})
}

export const answer = async (args) => {
    return await Axios.post(BASEURL+'/game/answer', args, {withCredentials: true})
}

export const changeStage = async (status) => {
    return await Axios.post(BASEURL+'/manage/stage', {status, secret: 'lb2020'}, {withCredentials: true})
}


