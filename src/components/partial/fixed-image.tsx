import Image from 'next/image'

export const FixedImage = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex h-screen items-end justify-end border-2 opacity-10 sm:opacity-50">
      <Image
        height={865}
        width={549}
        src="/images/bg.jpg"
        alt="Meditating person"
        loading="eager"
        className="h-full w-full object-cover sm:w-1/2"
      />
    </div>
  )
}
