import Image from 'next/image'

export const FixedImage = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex h-screen items-end justify-end">
      <Image
        height={865}
        width={549}
        src="/images/meditating-crop.webp"
        alt="Meditating person"
        loading="eager"
        className="h-[80dvh] w-auto max-w-full object-contain"
      />
    </div>
  )
}
