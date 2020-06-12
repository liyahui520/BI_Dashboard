import request from '@/utils/request'

/**
 * 
 * @param {测试数据} data 
 */
export function gettest(data) {
  return request({
    url: '/User/sqltestc',
    method: 'post'
  })
}


/**
 * 
 * @param {宠主最近消费客户} data 
 */
export function getPcustomersCpayments(data) {
  return request({
    url: '/BI/GetPcustomersCpayments',
    method: 'post',
    data
  })
}


/**
 * 
 * @param {宠主性别统计} data 
 */
export function getBiGender(data) {
  return request({
    url: '/BI/GetBiGender',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {宠主年龄分布} data 
 */
export function getBirthDatePercent(data) {
  return request({
    url: '/BI/GetBirthDatePercent',
    method: 'post',
    data
  })
}


/**
 * 
 * @param {宠主客户来源统计} data 
 */
export function getCustomerSource(data) {
  return request({
    url: '/BI/GetCustomerSource',
    method: 'post',
    data
  })
}



/**
 * 
 * @param {宠物相关数据统计} data 
 */
export function getPPetsData(data) {
  return request({
    url: '/BI/GetPPets',
    method: 'post',
    data
  })
}


/**
 * 
 * @param {消费频次数据统计} data 
 */
export function getCpaymentNum(data) {
  return request({
    url: '/BI/GetCpaymentNum',
    method: 'post',
    data
  })
}
/**
 * 
 * @param {活跃客户数据统计} data 
 */
export function getLateCpayments(data) {
  return request({
    url: '/BI/GetLateCpayments',
    method: 'post',
    data
  })
}
/**
 * 
 * @param {流失客户数据统计} data 
 */
export function getRunCpayments(data) {
  return request({
    url: '/BI/GetRunCpayments',
    method: 'post',
    data
  })
}