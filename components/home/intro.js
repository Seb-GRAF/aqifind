import { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ImageAndText({ children, left, image, title, description }) {
  return (
    <div
      className={`image-and-text flex flex-col md:flex-row items-center justify-evenly gap-8 max-w-[80rem] px-[5vw] ${
        left ? 'md:flex-row-reverse' : ''
      }`}>
      <figure className='relative h-72 w-72'>
        <Image
          src={`/illustrations/${image}.png`}
          alt={title}
          layout='fill'
          objectFit='contain'
          priority={true}
        />
      </figure>
      <div className='max-w-lg flex flex-col gap-4'>
        <h3 className='text-3xl mb-2'>{title}</h3>
        {children}
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

    gsap.from('#divider', {
      scrollTrigger: {
        trigger: '#divider',
      },
      scale: 1.2,
      duration: 3,
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <section className='bg-slate-100 relative mx-auto'>
        <div className='my-0 mx-auto min-h-screen flex flex-col gap-16 pt-16 '>
          <div className='flex flex-col gap-4 items-center max-w-[80rem] px-[5vw]'>
            <h2 className='text-4xl md:text-5xl'>Air pollution</h2>
            <h3 className='text-2xl md:text-3xl opacity-60'>What is it?</h3>
          </div>
          <p className='max-w-[80rem] px-[5vw]'>
            Air pollution can be created by both manmade and natural sources.
            Natural sources include windblown or kicked-up dust, dirt and sand,
            volcanic smoke, and burning materials. Manmade sources, meaning that
            pollution is created by the actions of human beings, tend to be the
            leading contributor to air pollution in cities and are inherently
            more able to be influenced by regulations. Manmade sources primarily
            include various forms of combustion, such as from gas-powered
            transportation (planes, trains, and automobiles) and industrial
            businesses (power plants, refineries, and factories), biomass
            burning (the burning of plant matter or coal for heating, cooking,
            and energy), and agriculture.
          </p>
          <ImageAndText image='1' title='Industries & heating'>
            <p>
              The combustion of fossil fuels such as coal and oil in industrial
              processes in power plants, refineries, and factories release a
              variety of pollutants, the majority of which are identical to
              those emitted by traffic and mobility.
            </p>
            <p>
              On top of this, chemical processes and volatile industry
              byproducts also cause VOC emissions. In Europe, around 60% of
              sulfur oxides come from energy production and distribution. In the
              US, stationary fuel combustion sources like electric utilities and
              industrial boilers are responsible for 73.2% of sulfur dioxide
              pollution.
            </p>
          </ImageAndText>
          <ImageAndText image='2' title='Traffic & mobility' left>
            <p>
              Petrol and diesel engines of cars, ships, trains and other
              vehicles emit pollutants such as carbon monoxide (CO), nitrogen
              oxides (NOx), particulate matter (PM), sulfur dioxide (SO2), and
              volatile organic compounds (VOCs).
            </p>
            <p>
              Friction from tires and brake wear also create primary – i.e.
              direct – particulate matter emissions. In addition, the nitrogen
              dioxide (NO2) and VOCs released by road vehicles also undergo
              photochemical reactions to form ozone (O3).
            </p>
            <p>
              In Europe, more than 40% of NOx and almost 40% of primary PM2.5
              emissions are linked to road transport. In the United States,
              35.8% of CO and 32.8% of NOx stem from road transport.
            </p>
          </ImageAndText>
          <figure className='flex items-center justify-center my-8 w-full h-[70vh] bg-gradient-to-b from-[#8e9fde] to-emerald-400/50 overflow-hidden'>
            <div id='divider' className='relative h-full w-full '>
              <Image
                src='/pictures/1.jpg'
                alt='air pollution'
                layout='fill'
                objectFit='cover'
                priority={true}
              />
            </div>
          </figure>
          <ImageAndText image='3' title='Agriculture'>
            <p>
              A wide range of nitrogen compounds (NO, NO2, N2), including
              ammonia (NH3), can be attributed to fertilizer production, farm
              machinery, and livestock waste management in agriculture. In
              addition, methane (CH4) is released by the digestive processes of
              livestock.
            </p>
            <p>
              In Europe, agricultural activities cause approximately 90% of
              ammonia emissions and 80% of methane emissions. In the US,
              livestock and manure management are responsible for 46% of methane
              emissions. transport.
            </p>
          </ImageAndText>
        </div>
        <div className='h-24'></div>
      </section>
    </>
  )
}
