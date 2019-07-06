import axios from 'axios'
import formatOptions from './formatOptions'

export default content => axios(
  formatOptions({
    url: 'https://dtplus-cn-shanghai.data.aliyuncs.com/image/tag',
    method: 'POST',
    data: JSON.stringify({
      type: 1,
      content: content.toString('base64')
    }),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      date: new Date().toUTCString()
    }
  })
)
