import axios from 'axios'
import { Layer, TemplateData } from '@common/interfaces'

const baseURL = '/api/photo/v1'

// 获取防盗链
export const getImageUrlsMap = (paths: string[]) => {
  return axios.post(
    `${baseURL}/oss/getUrl`,
    { paths },
    {
      // withCredentials: true,
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',
      // },
    }
  )
}

const getAllValidPaths = (layers: { [k: number]: Layer }) => {
  return Object.values(layers)
    .filter(e => !e.is_font)
    .map(e => `/${e.path}`)
}

const patchUrlToResult = (layers, pathUrlsMap) => {
  Object.values(layers).forEach((layer: Layer) => {
    if (!layer.is_font) {
      layer.url = pathUrlsMap[`/${layer.path}`]
    }
  })
}

export async function getTemplateData(id: string): Promise<TemplateData> {
  const response = await axios.get(`${baseURL}/manager/photo/findById?id=${id}`, {
    withCredentials: true,
  })

  const { data: dataStr, ...others } = (response.data as any).results
  const jsonData = JSON.parse(dataStr)

  const paths = getAllValidPaths(jsonData.layer)
  const res = await getImageUrlsMap(paths)

  const pathUrlsMap = (res.data as any).results
  patchUrlToResult(jsonData.layer, pathUrlsMap)

  return Promise.resolve({ data: jsonData, others })
}
