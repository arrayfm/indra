export const GET_ALL_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`

export const GET_COLLECTION_PRODUCTS = `
  query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      products(first: 20) {
            edges {
                node {
                    id
                    title
                    handle
                    featuredImage {
                        url
                        altText
                    }
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }
}
`
