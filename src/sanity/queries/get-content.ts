import { groq } from 'next-sanity'

export const getContent = groq`
    content[] {
    _type,
    _type == 'textBlock' => {
        _type,
        _key,
        title,
        lead,
        description
    },    
}
`
