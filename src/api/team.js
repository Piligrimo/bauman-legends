import {BASEURL} from './config'
import Axios from 'axios'

export const getTeam = async () => {
    return await Axios.get(BASEURL+'/team/info', {withCredentials: true})
}

export const getTeamMembers = async () => {
    return await Axios.get(BASEURL+'/team/members', {withCredentials: true})
}

export const joinTeam = async (args) => {
    return await Axios.post(BASEURL+'/team/join', args, {withCredentials: true})
}

export const createTeam = async (args) => {
    return await Axios.post(BASEURL+'/team/create', args, {withCredentials: true})
}