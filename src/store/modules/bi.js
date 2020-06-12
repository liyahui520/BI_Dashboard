import { gettest,getPcustomersCpayments,getBiGender,getBirthDatePercent,getCustomerSource,getPPetsData } from '@/api/bi'


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
  },
  getPcustomersCpayments({ commit  },params) {
    return new Promise((resolve, reject) => {
      getPcustomersCpayments(params).then(response => {
        const { data } = response 
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBiGender({ commit  }) {
    return new Promise((resolve, reject) => {
      getBiGender().then(response => {
        const { data } = response 
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBirthDatePercent({ commit  }) {
    return new Promise((resolve, reject) => {
      getBirthDatePercent().then(response => {
        const { data } = response 
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCustomerSource({ commit  }) {
    return new Promise((resolve, reject) => {
      getCustomerSource().then(response => {
        const { data } = response 
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPPetsData({ commit  }) {
    return new Promise((resolve, reject) => {
      getPPetsData().then(response => {
        const { data } = response 
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
