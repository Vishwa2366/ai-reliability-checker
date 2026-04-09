import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 30000,
})

export const analyzeContent = async ({ text, url, image }) => {
  const formData = new FormData()
  if (text) formData.append('text', text)
  if (url) formData.append('url', url)
  if (image) formData.append('image', image)

  const { data } = await api.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export default api
