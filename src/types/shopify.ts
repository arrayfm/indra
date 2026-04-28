export type ShopifyCollection = {
  id: string
  title: string
  handle: string
}

export type ShopifyCollectionProducts = {
  collectionByHandle: {
    title: string
    products: {
      edges: {
        node: {
          id: string
          title: string
          handle: string
          featuredImage?: {
            url: string
            altText?: string
          }
          priceRange?: {
            minVariantPrice: {
              amount: string
              currencyCode: string
            }
          }
        }
      }[]
    }
  } | null
}

export type Product = {
  _id: string
  url: string
  imageUrl?: string
  title?: string
  price?: string
}
