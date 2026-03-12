import { groq } from 'next-sanity'

export const getSiteSettings = groq`
        *[_type == "siteSettings"][0]{
            title,
            description,
            "logo": logo.asset->{
                alt,
                _id,
                url
            },
            phone,
            email,
            address,
            social[]{
                url,
            },
        }       
    `
