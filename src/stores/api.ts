import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ApiAuthResponse, ApiDataResponse, Slide, User } from '~/types/api'

export const useApiStore = defineStore('api', () => {
  const apiBaseUrl = 'https://localhost:5001'
  const accessToken = ref('')

  const user: Ref<null | User> = ref(null)

  function logout() {
    accessToken.value = ''
    user.value = null
  }

  async function deleteSlide(id: number) {
    await requestApi(`${apiBaseUrl}/api/slide/${id}`, {
      method: 'DELETE',
    })
  }

  async function getSlides() {
    const response = await requestApi<Slide[]>(`${apiBaseUrl}/api/slide/list`,
      {
        method: 'GET',
        cache: 'no-cache',
      })

    return response.data
  }

  async function uploadSlide(files: FileList) {
    const formData = new FormData()

    for (let index = 0; index < files.length; index++) {
      const file = files.item(index) as File
      if (!(file.name.toLocaleLowerCase().endsWith('.jpg') || file.name.toLocaleLowerCase().endsWith('.webp') || file.name.toLocaleLowerCase().endsWith('.png')))
        throw new Error('invalid files')

      formData.append('files', file)
    }

    const response = await requestApi<Slide>(`${apiBaseUrl}/api/slide/upload`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: formData,
      })

    return response.data
  }

  async function loginWithGithub(code: string) {
    const response = await requestApi<ApiAuthResponse>(`${apiBaseUrl}/api/user/oauth2/github/${code}`,
      {
        method: 'GET',
        cache: 'no-cache',
      })

    user.value = response.data.user
    accessToken.value = response.data.accessToken

    return response.data.user
  }

  async function login(username: string, password: string) {
    const response = await requestApi<ApiAuthResponse>(`${apiBaseUrl}/api/user/login`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({
          username,
          password,
        }),
      })

    user.value = response.data.user
    accessToken.value = response.data.accessToken

    return response.data.user
  }

  async function requestApi<T>(input: RequestInfo | URL, init?: RequestInit) {
    const response = await fetch(input, {
      ...{
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      },
      ...init,
    })
    const data = await response.json() as ApiDataResponse<T>

    if (!data.succeeded)
      throw new Error(data.errors)

    return data
  }

  return {
    user,
    accessToken,
    login,
    requestApi,
    loginWithGithub,
    logout,
    getSlides,
    uploadSlide,
    deleteSlide,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiStore as any, import.meta.hot))
