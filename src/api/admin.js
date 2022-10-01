import {BASEURL} from './config'
import Axios from 'axios'

export const getTeams = async () => {
    return await Axios.get(BASEURL+'/team/all', {withCredentials: true})
}

export const getPuzzles = async () => {
    return await Axios.get(BASEURL+'/puzzle/all', {withCredentials: true})
}

export const getPuzzleById = async (id) => {
    return await Axios.get(BASEURL+'/puzzle/' + id, {withCredentials: true})
}

export const createPuzzle = async (args) => {
    return await Axios.post(BASEURL+'/puzzle/create', args, {withCredentials: true})
}

export const editPuzzle = async (args) => {
    return await Axios.post(BASEURL+'/puzzle/edit', args, {withCredentials: true})
}