import { groq } from 'next-sanity'
import { link } from './get-link'

export const getMenus = groq`
        *[_type == "menus"][]{
            title,
            "slug": slug.current,
            items[]{
                _key,
                "label": link.label,
                ${link(true)},
                    "subItems": items[]{
                    "label": link.label,
                        ${link(true)},
                        description
                    }
            }
        }       
    `
