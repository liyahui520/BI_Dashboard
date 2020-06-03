import { gettest } from '@/api/bi'
import router, { resetRouter } from '@/router'
import {cleanArray} from '@/utils/index'

const state = {
  logData: [],
  params: {
    currentPage: 1,
    pageSize: 10

  },
  currentPage: 1,
  pageSize: 10
}

const mutations = {
  SET_LOGDATA: (state, logData) => {
    state.logData = logData
  },
  SET_CURRENTPAGE: (state, currentPage) => {
    state.currentPage = currentPage
  },
  SET_PAGESIZE: (state, pageSize) => {
    state.pageSize = pageSize
  }
}

const actions = {
  // get user info
  gettest({ commit  }) {
    return new Promise((resolve, reject) => {
      gettest().then(response => {
        const { data } = response 
        console.log(data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
