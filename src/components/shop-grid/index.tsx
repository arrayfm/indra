import { Section } from '../layout/section'
import { ProductCard } from './product-card'

const MOCK_PRODUCTS = [
  {
    _id: '1',
    imageUrl: '/images/products/ic-flower.webp',
    title: 'Medicinal Cannabis Flower',
    size: '10g',
    price: '£8.50 per gram',
  },
  {
    _id: '2',
    imageUrl: '/images/products/ic-pastilles.webp',
    title: 'Medicinal Cannabis Pastilles',
    price: '£35 (14 pack)',
  },
  {
    _id: '3',
    imageUrl: '/images/products/ic-oils.webp',
    title: 'Medicinal Cannabis Sublingual Oils',
    price: '£90 per 30mL',
  },
  {
    _id: '4',
    imageUrl: '/images/products/ic-vape.webp',
    title: 'Medicinal Cannabis Vape Cartridges ',
    price: '£80 per cartridge',
  },
]

const ShopGrid = ({ products }: { products?: any[] }) => {
  const displayProducts =
    products && products.length > 0 ? products : MOCK_PRODUCTS
  return (
    <Section id="products" className="pt-28">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-24 md:gap-y-36">
        {displayProducts?.map((product, index) => (
          <ProductCard key={product._id} index={index} {...product} />
        ))}
      </div>
    </Section>
  )
}

export default ShopGrid
