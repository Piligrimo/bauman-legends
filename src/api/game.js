import {BASEURL} from './config'
import Axios from 'axios'

export const getTask = async () => {
    return await Axios.get(BASEURL+'/puzzle/current', {withCredentials: true})
}
export const getStage = async () => {
    return await Axios.get(BASEURL+'/game/status', {withCredentials: true})
}

export const nextTask = async () => {
    return await Axios.post(BASEURL+'/puzzle/start',{}, {withCredentials: true})
}

export const skipTask = async () => {
    return await Axios.get(BASEURL+'/game/skip', {withCredentials: true})
}

export const answer = async (args) => {
    return await Axios.post(BASEURL+'/game/answer', args, {withCredentials: true})
}


export const getHints = async () => {
    return await Axios.get(BASEURL+'/hint/team', {withCredentials: true})
}

export const buyHint = async (id) => {
    return await Axios.get(BASEURL+'/hint/buy?hint_id='+id, {withCredentials: true})
}

export const getFact = async () => {
    return await Axios.get(BASEURL+'/game/fact', {withCredentials: true})
}

export const getDocs = async () => {
    return await Axios.get(BASEURL+'/bauman/fragments', {withCredentials: true})
}