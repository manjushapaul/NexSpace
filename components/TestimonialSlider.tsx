'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'This coworking space has transformed my productivity, The atmosphere is inspiring. and the community is incredibly supportive',
    name: 'Alejandro Garnacho',
    title: 'UI Designer',
    company: 'Shopify',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '2',
    quote: 'The best workspace I\'ve ever used. The facilities are top-notch and the environment fosters creativity and collaboration.',
    name: 'Sarah Johnson',
    title: 'Product Manager',
    company: 'Google',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '3',
    quote: 'An exceptional space that balances professionalism with comfort. I highly recommend it to any remote worker or freelancer.',
    name: 'Michael Chen',
    title: 'Software Engineer',
    company: 'Microsoft',
    image: '/images/testimonial-3.jpg',
  },
  {
    id: '4',
    quote: 'The perfect blend of professional amenities and a welcoming community. My productivity has increased significantly since joining.',
    name: 'Emma Rodriguez',
    title: 'Marketing Director',
    company: 'Adobe',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '5',
    quote: 'Outstanding facilities and an inspiring environment. The networking opportunities here are unmatched, and the community is fantastic.',
    name: 'David Kim',
    title: 'UX Researcher',
    company: 'Meta',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '6',
    quote: 'A game-changer for my business. The space is beautiful, the amenities are excellent, and the community support is incredible.',
    name: 'Lisa Thompson',
    title: 'Startup Founder',
    company: 'TechVenture',
    image: '/images/testimonial-3.jpg',
  },
  {
    id: '7',
    quote: 'I\'ve worked in many coworking spaces, but this one stands out. The attention to detail and the supportive community make it exceptional.',
    name: 'James Wilson',
    title: 'Data Scientist',
    company: 'Amazon',
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '8',
    quote: 'The creative energy here is palpable. It\'s the ideal space for collaboration, innovation, and building meaningful professional relationships.',
    name: 'Maria Garcia',
    title: 'Graphic Designer',
    company: 'Nike',
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '9',
    quote: 'This space has everything I need to succeed. From high-speed internet to inspiring surroundings, it\'s perfect for focused work and networking.',
    name: 'Robert Taylor',
    title: 'Consultant',
    company: 'McKinsey',
    image: '/images/testimonial-3.jpg',
  },
]

export default function TestimonialSlider() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={`w-full bg-[#fafbfc] py-10 lg:pb-8 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative text-center">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            speed={800}
            spaceBetween={30}
            slidesPerView={1}
            allowTouchMove={true}
            touchRatio={1}
            touchAngle={45}
            grabCursor={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row relative min-h-[500px] lg:min-h-[600px]">
                  {/* Left Section - Image */}
                  <div className="w-full lg:w-1/3 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-md rounded-xl overflow-hidden bg-purple-100">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Section - Testimonial Text */}
                  <div className="w-full lg:w-2/3 flex flex-col justify-center px-6 sm:px-8 lg:px-12">
                    {/* Quote */}
                    <div className="mb-6 lg:mb-8">
                      <div className="relative">
                        {/* Opening Quote SVG */}
                        
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black font-normal l
                        eading-relaxed relative z-10 pl-8 lg:pl-16 pr-8 lg:pr-16 max-lg:p-0 max-lg:pt-5">
                        {testimonial.quote}
                       
                        
                        {/* Closing Quote SVG */}
                        </p>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="pt-4">
                      <h3 className="text-base sm:text-sm lg:text-lg font-bold text-black">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-base sm:text-sm font-normal">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls - Fixed Position Outside Swiper */}
          <div className="flex items-center justify-center gap-2 relative top-[-20px] max-lg:top-[10px]">
            <button
              className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            
           
            
            <button
              className="swiper-button-next-custom w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
