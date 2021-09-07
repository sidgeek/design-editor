import axios from 'axios'
import { TemplateData } from '@common/interfaces'

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

export async function getTemplateV2(): Promise<TemplateData> {
  const response = await axios.get(`${baseURL}/api/photo/v1/manager/photo/findById?id=74456`, {
    withCredentials: true,
  })

  const { data: dataStr, ...others } = (response.data as any).results
  const jsonData = JSON.parse(dataStr)

  return Promise.resolve({ data: jsonData, others })
}
