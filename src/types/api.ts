export interface ApiResponse {
  statusCode: number
  succeeded: boolean
  errors: string
  extras: string
  timestamp: number
}

export interface ApiDataResponse<T> extends ApiResponse {
  data: T
}

export interface ApiAuthResponse {
  user: User
  accessToken: string
}

export interface User {
  id: number
  nickName: string
  createdTime: Date
  updatedTime: Date
}

export interface Slide {
  id: number
  createdTime: string
  updatedTime: string
  creatorId: number
  name: string
  url: string
}
