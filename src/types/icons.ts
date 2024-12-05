export type IIconMainGroup = {
  id: string
  name: string
  groups: IIconGroup[]
}

export type IIconGroup = {
  id: string,
  name?: string
  icons: string[]
}

export type IconScaleType = 'circle' | 'square' | false;