import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000'
const hanClient = axios.create({ baseURL })

export function getTemplate(): Promise<string> {
  return new Promise((resolve, reject) => {
    hanClient
      .get(`api/photo/v1/manager/photo/findById?id=74456`)
      .then(response => {})
      .catch(err => {
        reject(err)
      })
  })
}

export async function getTemplateV2(): Promise<any> {
  const response = await axios.get(`${baseURL}/api/photo/v1/manager/photo/findById?id=74456`, {
    withCredentials: true,
  })

  const jsonStr = (response.data as any).results.data
  const jsonData = JSON.parse(jsonStr)

  return Promise.resolve(jsonData)
}
