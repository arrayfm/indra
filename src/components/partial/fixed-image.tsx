import Image from 'next/image'

export const FixedImage = () => {
  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 -z-10 flex h-screen items-end justify-end overflow-hidden opacity-25 sm:right-[-25%] sm:left-[25%] sm:opacity-75">
      <Image
        height={800}
        width={800}
        src="/images/bg_blob.png"
        alt="Meditation orb"
        loading="eager"
        className="h-full w-full object-contain"
      />
    </div>
  )
}
