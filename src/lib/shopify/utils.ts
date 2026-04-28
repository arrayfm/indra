import { ShopifyCollectionProducts } from '../../types/shopify'

const formatPrice = (amount: string, currency: string) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(Number(amount))
}

export function mapShopifyProducts(data: ShopifyCollectionProducts) {
  return (
    data?.collectionByHandle?.products?.edges
      ?.map((e) => e.node)
      .slice(0, 3)
      .map((p) => ({
        _id: p.id,
        url: `${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CUSTOM_DOMAIN}/products/${p.handle}`,
        imageUrl: p.featuredImage?.url,
        title: p.title,
        price: p.priceRange
          ? formatPrice(
              p.priceRange.minVariantPrice.amount,
              p.priceRange.minVariantPrice.currencyCode
            )
          : undefined,
      })) || []
  )
}
