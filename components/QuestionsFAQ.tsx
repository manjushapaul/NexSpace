'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface FAQItem {
  id: string
  number: string
  question: string
  answer: string
  readTermsLink?: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    number: '01',
    question: 'How much does a co-working space cost?',
    answer:
      'Our co-working spaces offer flexible pricing options to suit your needs. Daily passes start from ₹3,000 per day, while monthly memberships are available from ₹15,000 per month. We also offer hourly rates for short-term use, starting at ₹500 per hour. Pricing varies by location and amenities, with premium spaces featuring additional facilities at higher rates. All plans include high-speed Wi-Fi, access to meeting rooms, and complimentary refreshments.',
  },
  {
    id: '2',
    number: '02',
    question: 'Can I book a co-working desk for a day?',
    answer:
      'Yes, absolutely! We offer daily passes that allow you to book a co-working desk for a full day. Daily passes give you access to our shared workspace from 9 AM to 6 PM, including high-speed internet, comfortable seating, and access to common areas. You can book a day pass online through our website or mobile app, or simply walk in and purchase one at the reception. Day passes are perfect for occasional users, freelancers, or those who need a professional workspace for a short project.',
  },
  {
    id: '3',
    number: '03',
    question: 'Is there a minimum rental term?',
    answer:
      'There is no minimum rental term when using our co-working spaces. You can use a co-working space in any of our centres around the world for a minimum of one hour or reserve a dedicated desk for as long as you need.',
    readTermsLink: '/terms',
  },
  {
    id: '4',
    number: '04',
    question: 'Do I need to book a co-working space in advance?',
    answer:
      'While walk-ins are welcome subject to availability, we highly recommend booking in advance to guarantee your spot, especially during peak hours and busy periods. You can book online through our website or mobile app up to 30 days in advance. Same-day bookings are also available if space permits. For dedicated desks and private offices, advance booking is required. Members with monthly plans have priority access and can reserve spaces up to 60 days in advance.',
  },
]

export default function QuestionsFAQ() {
  const [openItem, setOpenItem] = useState<string | null>('3')
  const { ref, isVisible } = useScrollAnimation()

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      ref={ref}
      className={`w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black">
            Questions.
          </h2>
          <a
            href="#more-questions"
            className="text-black text-base sm:text-lg font-medium hover:opacity-70 transition-opacity flex items-center gap-2"
            aria-label="See more questions"
          >
            See More
            <svg
              className="w-5 h-5"
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
          </a>
        </div>

        {/* FAQ List */}
        <div className="space-y-0">
          {faqData.map((item, index) => {
            const isOpen = openItem === item.id
            const isLast = index === faqData.length - 1

            return (
              <div key={item.id}>
                <button
                  id={`faq-question-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-4 sm:py-5 lg:py-6 flex items-start sm:items-center gap-4 s
                  m:gap-6 text-left hover:opacity-80 transition-opacity focus:outline-none 
               rounded-sm"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  {/* Question Number */}
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-black flex-shrink-0 min-w-[2.5rem] sm:min-w-[3rem]">
                    {item.number}.
                  </span>

                  {/* Question Text */}
                  <span className="text-base sm:text-lg lg:text-xl font-semibold text-black flex-grow">
                    {item.question}
                  </span>

                  {/* Arrow Icon */}
                  <span className="flex-shrink-0 transition-transform duration-300 ease-in-out" aria-hidden="true">
                    <svg
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-black transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-90' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen && item.answer ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.answer && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="pl-0 sm:pl-14 lg:pl-20 pr-0 sm:pr-16 lg:pr-20 pb-4 sm:pb-5 
                      lg:pb-6"
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                    >
                      <p className="text-sm sm:text-xs lg:text-base text-gray-500 font-normal leading-relaxed mb-3 sm:mb-4">
                        {item.answer}
                      </p>
                      {item.readTermsLink && (
                        <a
                          href={item.readTermsLink}
                          className="text-sm sm:text-base text-black font-medium hover:opacity-70 transition-opacity underline inline-flex items-center gap-2"
                          aria-label="Read terms and conditions"
                        >
                          Read Terms
                          <svg
                            className="w-4 h-4"
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
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                {!isLast && (
                  <div className="border-b border-gray-200" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

