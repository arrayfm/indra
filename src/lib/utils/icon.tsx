import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaTiktok,
} from 'react-icons/fa6'
import { BsGlobe } from 'react-icons/bs'

export type IconMap = typeof allIconMap
export type Icon = keyof IconMap

export const socialIconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  globe: BsGlobe,
  tiktok: FaTiktok,
}

export const statIconMap = {}

export const allIconMap = { ...socialIconMap, ...statIconMap }

export const mapIconsToSanityListOptions = (map: Partial<IconMap>) => {
  return [
    { value: '' },
    ...Object.entries(map).map(([key, value]) => {
      return { value: key, icon: value }
    }),
  ]
}

export const renderIcon = (icon: Icon) => {
  const Icon = allIconMap[icon]
  return <Icon />
}
