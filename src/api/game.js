import {BASEURL} from './config'
import Axios from 'axios'

export const getTask = async () => {
    return await Axios.get(BASEURL+'/puzzle/current', {withCredentials: true})
}

export const getFinalTask = async () => {
    return await Axios.get(BASEURL+'/final/current', {withCredentials: true})
}

export const getStage = async () => {
    return await Axios.get(BASEURL+'/stage/current', {withCredentials: true})
}

export const nextTask = async () => {
    return await Axios.post(BASEURL+'/puzzle/start',{}, {withCredentials: true})
}

export const nextFinalTask = async () => {
    return await Axios.post(BASEURL+'/final/start',{}, {withCredentials: true})
}

export const skipTask = async () => {
    return await Axios.get(BASEURL+'/puzzle/skip', {withCredentials: true})
}

export const answer = async (args) => {
    return await Axios.post(BASEURL+'/puzzle/finish', args, {withCredentials: true})
}

export const answerFinal = async (args) => {
    return await Axios.post(BASEURL+'/final/finish', args, {withCredentials: true})
}
export const answerParnterTask = async (args) => {
    return await Axios.get(BASEURL+'/final/partner/'+args, {withCredentials: true})
}

export const buyHint = async (id) => {
    return await Axios.get(BASEURL+'/final/hint/'+id, {withCredentials: true})
}
