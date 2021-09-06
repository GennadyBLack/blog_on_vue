import settingsApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  data : null,
  isLoading:false
}

export const mutationTypes = {
  updateSettingsStart: '[updateSettings] update Settings start',
  updateSettingsSuccess: '[updateSettings] update Settings success',
  updateSettingsFailure: '[updateSettings] update Settings failure',

  getSettingsStart: '[updateSettings] update Settings start',
  getSettingsSuccess: '[updateSettings] update Settings success',
  getSettingsFailure: '[updateSettings] update Settings failure'
}

export const actionTypes = {
  updateSettings: '[update Settings] update Settings',
  getSettings: '[get Settings] get Settings'
}

const mutations = {
    //UPDATE
  [mutationTypes.updateSettingsStart](state) {
    state.isSubmitting = true
    state.isLoading = true
  },
  [mutationTypes.updateSettingsSuccess](state) {
    state.isSubmitting = false
    state.isLoading = false
  },
  [mutationTypes.updateSettingsFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
    state.isLoading = false
  },
//GET

  [mutationTypes.getSettingsStart](state) {
    state.isSubmitting = true
    state.isLoading = true
  },
  [mutationTypes.getSettingsSuccess](state,payload) {
    state.isSubmitting = false
    state.Settings = payload
    state.isLoading = false
  },
  [mutationTypes.getSettingsFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateSettings](context, {slug,settingsInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateSettingsStart)
      settingsApi
        .updateSettings(slug,settingsInput)
        .then(settings => {
          context.commit(mutationTypes.updateSettingsSuccess, settings)
          resolve(settings)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateSettingsFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getSettings](context, slug) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getSettingsStart)
      settingsApi
        .getSettings(slug)
        .then(settings => {
          context.commit(mutationTypes.getSettingsSuccess, settings)
          resolve(settings)
        })
        .catch(result => {
          context.commit(
            mutationTypes.getSettingsFailure,
            result.response.data.errors
          )
        })
    })
  }
}




export const getterTypes = {
    getSettings:'[auth] isAnonymus'
  }
  
  const getters = {
     [getterTypes.getSettings](state){
          return state.data
      },
  }

export default {
  state,
  actions,
  mutations,
  getters
}
