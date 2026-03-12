import groq from 'groq'
import { link } from './get-link'

export const getBlockContent = groq`
    ...,
    _type,
    markDefs[]{
        ...,
        _type == "link" => {
            _type,
            _key,
            ${link()}
        }
    }
`
