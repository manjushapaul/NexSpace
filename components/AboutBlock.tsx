'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function AboutBlock() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={`w-full bg-gray-100 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Line 1: "We're Building A Community" [image] "Of Like-Minded." */}
          <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
          font-normal leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>We&apos;re Building A Community</span>
            <Image
              src="/images/community-image.jpg"
              alt="Community of professionals collaborating"
              width={180}
              height={40}
              className="inline-block h-10 w-auto  object-cover rounded"
              style={{ verticalAlign: 'middle' , transform: 'rotate(20deg)'}}
            />
            <span>Of Like-Minded.</span>
          </p>

          {/* Line 2: "Professionals Who Inspire And Support Each Other." */}
          <p className="text-black  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
           font-normal leading-tight">
            Professionals Who Inspire And Support Each Other.
          </p>

          {/* Line 3: "Our Space Is Designed To Foster Collaboration," */}
          <p className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
          font-normal leading-tight">
            Our Space Is Designed To Foster Collaboration,
          </p>

          {/* Line 4: Soft gray: "Creativity" [image] "And Growth." */}
          <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 
          font-light leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>Creativity</span>
            <Image
              src="/images/creativity-image.jpg"
              alt="Abstract creative design representing creativity and growth"
              width={180}
              height={80}
              className="inline-block h-10 w-auto object-cover rounded rotate-[3.142rad]"
              style={{ verticalAlign: 'middle' , transform: 'rotate(-20deg)' }}
            />
            <span>And Growth.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
