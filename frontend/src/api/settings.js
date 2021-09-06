import axios from '@/api/axios'

const getSettings = ( id) => {
    return axios.get(`/prosile/${id}`)
}

const createSettings = SettingsInput => {
    return axios.post(`progile/`,{SettingsInput})
    .then(response=>response.data)
}

const updateSettings = (id,settingsInput) => {
    return axios.put(`settings/update/${id}`,settingsInput)
}

export default {
    updateSettings,
    createSettings,
    getSettings
}