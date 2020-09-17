export interface Build {
  description: string
}

export interface Slider {
  img_path: string
}

export interface Contact {
  address: string
  phone: string
  email: string
}

export interface Categories {
  id: number
  name: string
  description: string
  img_path: string
  callback: boolean
}

export interface Products {
  id: number
  name: string
  img_path: string
}