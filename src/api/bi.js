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

