import {BASEURL} from './config'
import Axios from 'axios'

export const getDecision = async () => {
    return await Axios.get(BASEURL+'/witness/decision', {withCredentials: true})
}

export const decide = async (args) => {
    return await Axios.post(BASEURL+'/witness/decision',args, {withCredentials: true})
}

export const getWitnesses = async () => {
    return await Axios.get(BASEURL+'/witness/inspect', {withCredentials: true})
}

export const checkCode = async (args) => {
    return await Axios.post(BASEURL+'/witness/inspect', args, {withCredentials: true})
}