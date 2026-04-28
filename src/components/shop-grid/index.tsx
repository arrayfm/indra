import { cn } from '@/lib/utils/class-name'
import { Section } from '../layout/section'
import { ProductCard } from './product-card'
import { Product } from '@/types/shopify'

const ShopGrid = ({ products }: { products?: Product[] }) => {
  return (
    <Section id="products" className="pt-28">
      <div className="container grid grid-cols-10 gap-2.5 gap-y-24 md:gap-y-36">
        {products?.map((product, index) => (
          <div
            key={product._id}
            className={cn('col-span-7 sm:col-span-3', {
              'sm:col-start-6': index % 2 === 1,
            })}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ShopGrid
