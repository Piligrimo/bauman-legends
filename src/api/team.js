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

export const setLeader = async (args) => {
    return await Axios.get(BASEURL+'/team/change?new_captain='+args, {withCredentials: true})
}

export const kickMember = async (args) => {
    return await Axios.delete(BASEURL+'/team/kick?user_id='+args, {withCredentials: true})
}

export const leave =  async () => {
    return await Axios.delete(BASEURL+'/team/leave', {withCredentials: true})
}