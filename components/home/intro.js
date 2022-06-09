import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ExpandableDiv({ children, left, image, title, description }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleDescription = (e) => {
    setIsExpanded(!isExpanded)
    gsap.to(e.target.querySelector('#expand-description'), {
      duration: 0.5,
      height: !isExpanded ? 'auto' : 0,
      ease: 'power3',
    })
    gsap.to(e.target.querySelector('#expand-button'), {
      duration: 0.5,
      rotate: !isExpanded ? '45deg' : 0,
      ease: 'power3',
    })
  }

  return (
    <div
      onClick={toggleDescription}
      className='md:max-w-lg max-w-full flex flex-col border-b-2 cursor-pointer hover:text-black/70 transition-all mb-4 hover:border-emerald-900/30 '>
      <div className='w-full flex justify-between gap-4 items-center pointer-events-none'>
        <h3 className='text-2xl mb-2 pointer-events-none'>{title}</h3>
        <button
          id='expand-button'
          className='w-12 h-12 text-5xl pointer-events-none font-extralight leading-0'>
          +
        </button>
      </div>
      <div
        id='expand-description'
        className='h-0 overflow-hidden origin-top text-black cursor-auto'>
        {children}
        <br />
      </div>
    </div>
  )
}

export default function Intro() {
  useEffect(() => {
    document.querySelectorAll('.image-and-text').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
        },
        translateY: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3',
      })
    })

    gsap.from('#divider img', {
      scrollTrigger: {
        trigger: '#divider',
      },
      scale: 1.2,
      duration: 3,
      ease: 'power3',
    })

    gsap.from('#card', {
      scrollTrigger: {
        trigger: '#card',
      },
      translateY: 100,
      duration: 1.5,
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <section className='flex flex-col items-center bg-slate-100 relative mx-auto'>
        <div className='my-0 mx-auto min-h-screen flex flex-col items-center gap-16 pt-16 '>
          <div className='flex flex-col gap-4 items-center max-w-[80rem] px-[5vw]'>
            <h2 className='text-4xl md:text-5xl'>Air pollution</h2>
            <h3 className='text-2xl md:text-3xl opacity-60'>What is it?</h3>
          </div>
          <p className='max-w-[80rem] px-[5vw] flex flex-col gap-4'>
            <span>
              Air pollution can be created by both manmade and natural sources.
              Natural sources include windblown or kicked-up dust, dirt and
              sand, volcanic smoke, and burning materials. Manmade sources,
              meaning that pollution is created by the actions of human beings,
              tend to be the leading contributor to air pollution in cities and
              are inherently more able to be influenced by regulations.
            </span>
            <span>
              Those human sources primarily include various forms of combustion,
              such as from gas-powered transportation (planes, trains, and
              automobiles) and industrial businesses (power plants, refineries,
              and factories), biomass burning (the burning of plant matter or
              coal for heating, cooking, and energy), and agriculture.
            </span>
          </p>
          <div className='max-w-[80rem] px-[5vw] flex flex-col md:flex-row justify-center items-center md:items-start md:gap-12 gap-4'>
            <figure className='relative h-52 w-52'>
              <Image
                src='/illustrations/2.png'
                alt='Air pollution'
                layout='fill'
                objectFit='contain'
                priority={true}
                className='max-w-full'
              />
            </figure>
            <div>
              <ExpandableDiv title='Industries & heating'>
                <p>
                  The combustion of fossil fuels such as coal and oil in
                  industrial processes in power plants, refineries, and
                  factories release a variety of pollutants, the majority of
                  which are identical to those emitted by traffic and mobility.
                </p>
                <p>
                  On top of this, chemical processes and volatile industry
                  byproducts also cause VOC emissions. In Europe, around 60% of
                  sulfur oxides come from energy production and distribution. In
                  the US, stationary fuel combustion sources like electric
                  utilities and industrial boilers are responsible for 73.2% of
                  sulfur dioxide pollution.
                </p>
              </ExpandableDiv>
              <ExpandableDiv title='Traffic & mobility'>
                <p>
                  Petrol and diesel engines of cars, ships, trains and other
                  vehicles emit pollutants such as carbon monoxide (CO),
                  nitrogen oxides (NOx), particulate matter (PM), sulfur dioxide
                  (SO2), and volatile organic compounds (VOCs).
                </p>
                <p>
                  Friction from tires and brake wear also create primary – i.e.
                  direct – particulate matter emissions. In addition, the
                  nitrogen dioxide (NO2) and VOCs released by road vehicles also
                  undergo photochemical reactions to form ozone (O3).
                </p>
                <p>
                  In Europe, more than 40% of NOx and almost 40% of primary
                  PM2.5 emissions are linked to road transport. In the United
                  States, 35.8% of CO and 32.8% of NOx stem from road transport.
                </p>
              </ExpandableDiv>
              <ExpandableDiv title='Agriculture'>
                <p>
                  A wide range of nitrogen compounds (NO, NO2, N2), including
                  ammonia (NH3), can be attributed to fertilizer production,
                  farm machinery, and livestock waste management in agriculture.
                  In addition, methane (CH4) is released by the digestive
                  processes of livestock.
                </p>
                <p>
                  In Europe, agricultural activities cause approximately 90% of
                  ammonia emissions and 80% of methane emissions. In the US,
                  livestock and manure management are responsible for 46% of
                  methane emissions. transport.
                </p>
              </ExpandableDiv>
            </div>
          </div>
          <div className='relative flex items-center justify-center my-8 w-[90vw] max-w-[80rem] h-[25rem] sm:h-[40rem] margin-auto'>
            <div className='w-10/12 h-2/3 sm:h-5/6 absolute left-0 top-0 '>
              <figure
                id='divider'
                className='relative w-full h-full max-h-full max-w-full '>
                <Image
                  src='/pictures/1.jpg'
                  alt='air pollution'
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />
              </figure>
            </div>
            <div
              id='card'
              className='absolute bottom-0 right-0 md:w-1/2 w-10/12 bg-emerald-400 flex flex-col gap-4 sm:gap-8 items-center justify-between py-6 px-8
              '>
              <p className='leading-8 leading font-medium text-lg sm:text-xl self-start sm:mr-8 mr-4'>
                Air pollution is one of the world’s leading risk factors for
                death. Attributed to 11.65% of death globally, which equates to
                millions of people each year.{' '}
              </p>
              <cite className='self-end ml-8'>
                <a
                  href='https://ourworldindata.org/air-pollution'
                  target='_blank'
                  rel='noreferrer'>
                  ourworldindata.org
                </a>
              </cite>
            </div>
          </div>
        </div>
        <div className='h-24'></div>
      </section>
    </>
  )
}
