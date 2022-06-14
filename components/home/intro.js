import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ExpandableDiv({
  children,
  left,
  image,
  title,
  description,
  toggleDescription,
}) {
  return (
    <div
      id='expandable-div'
      onClick={toggleDescription}
      className='md:max-w-lg max-w-full flex flex-col border-b border-black/20 cursor-pointer  transition-all mb-4 hover:border-black/60 '>
      <div className='w-full flex justify-between gap-4 items-center pointer-events-none'>
        <h3 className='text-2xl mb-2 pointer-events-none'>{title}</h3>
        <button className='expand-button w-12 h-12 text-5xl font-extralight leading-0'>
          +
        </button>
      </div>
      <div
        id='expand-description'
        className='flex flex-col gap-4 h-0 pl-1 overflow-hidden origin-top text-black cursor-auto'>
        {children}
        <br />
      </div>
    </div>
  )
}

export default function Intro() {
  // passing this function to ExpandableDiv
  const toggleDescription = (e) => {
    const expanded = document
      .querySelectorAll('#expandable-div')
      .forEach((el) => {
        if (e.target === el) {
          el.classList.toggle('expanded')

          gsap.to(e.target.querySelector('#expand-description'), {
            duration: 0.75,
            height: el.classList.contains('expanded') ? 'auto' : 0,
            ease: 'power3',
            overwrite: true,
          })
          gsap.to(e.target.querySelector('.expand-button'), {
            duration: 0.75,
            rotate: el.classList.contains('expanded') ? '45deg' : 0,
            ease: 'power3',
            overwrite: true,
          })
        } else {
          if (el.classList.contains('expanded')) el.classList.remove('expanded')
          gsap.to(el.querySelector('#expand-description'), {
            duration: 1,
            height: 0,
            ease: 'power3',
          })
          gsap.to(el.querySelector('.expand-button'), {
            duration: 1,
            rotate: 0,
            ease: 'power3',
          })
        }
      })
  }

  useEffect(() => {
    gsap.from('#intro1-text', {
      scrollTrigger: {
        trigger: '#intro1-text',
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3',
    })
  }, [])

  return (
    <section className='flex flex-col items-center bg-neutral-200 relative mx-auto text-lg pb-20 pt-20 overflow-hidden'>
      <article className='max-w-[60rem] mx-[5vw] my-0 flex flex-col items-center gap-12 z-10'>
        <div className='flex flex-col gap-4 items-center px-[5vw]'>
          <h2 className='text-4xl md:text-5xl'>Air pollution</h2>
          <h3 className='text-2xl md:text-3xl opacity-60'>What is it?</h3>
        </div>
        <p id='intro1-text' className=' flex flex-col gap-4'>
          <span>
            Air pollution can be created by both manmade and natural sources.
            Natural sources include windblown or kicked-up dust, dirt and sand,
            volcanic smoke, and burning materials. Manmade sources, meaning that
            pollution is created by the actions of human beings, tend to be the
            leading contributor to air pollution in cities and are inherently
            more able to be influenced by regulations.
          </span>
          <span>
            Those human sources primarily include various forms of combustion,
            such as from gas-powered transportation (planes, trains, and
            automobiles) and industrial businesses (power plants, refineries,
            and factories), biomass burning (the burning of plant matter or coal
            for heating, cooking, and energy), and agriculture.
          </span>
        </p>
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-12'>
          <figure className='relative h-52 md:w-72 w-[90%] px-[5vw]'>
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
            <ExpandableDiv
              toggleDescription={toggleDescription}
              title='Industries & heating'>
              <p>
                The combustion of fossil fuels such as coal and oil in
                industrial processes in power plants, refineries, and factories
                release a variety of pollutants, the majority of which are
                identical to those emitted by traffic and mobility.
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
            <ExpandableDiv
              toggleDescription={toggleDescription}
              title='Traffic & mobility'>
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
            </ExpandableDiv>
            <ExpandableDiv
              toggleDescription={toggleDescription}
              title='Agriculture'>
              <p>
                A wide range of nitrogen compounds (NO, NO2, N2), including
                ammonia (NH3), can be attributed to fertilizer production, farm
                machinery, and livestock waste management in agriculture. In
                addition, methane (CH4) is released by the digestive processes
                of livestock.
              </p>
              <p>
                In Europe, agricultural activities cause approximately 90% of
                ammonia emissions and 80% of methane emissions. In the US,
                livestock and manure management are responsible for 46% of
                methane emissions. transport.
              </p>
            </ExpandableDiv>
            <ExpandableDiv
              toggleDescription={toggleDescription}
              title='Burning of Fossil Fuels'>
              <p>
                Sulfur dioxide emitted from the combustion of fossil fuels like
                coal, petroleum for energy in power plants, and other factory
                combustibles is one the major cause of air pollution. Billions
                of vehicles run on roads are powered by gasoline and diesel
                engines that burn petroleum for releasing energy. Petroleum is
                made up of hydrocarbons, and engines don’t burn them cleanly.
              </p>
              <p>
                As a result, pollutants such as PM, nitric oxide and NO2
                (together referred to as NOx), carbon monoxide, organic
                compounds, and lead emit from vehicles including trucks, jeeps,
                cars, trains, airplanes, causing a high level of pollution.
                These modes of transportation form part of our daily basic
                needs, so we rely on them heavily. But, their overuse is killing
                our environment as dangerous gases are polluting the atmosphere.
              </p>
              <p>
                Carbon Monoxide caused by improper or incomplete combustion and
                generally emitted from vehicles is another major pollutant along
                with Nitrogen Oxides, that is produced from both natural and
                man-made processes. As per the World Health Organization (WHO),
                exposure to outdoor air pollution contributes to as much as 0.6
                to 1.4 percent of the burden of disease and 4.2 million deaths
                every year.
              </p>
            </ExpandableDiv>
          </div>
        </div>
      </article>

      <figure className='absolute left-0 top-0 w-[30vw] h-[30vw] bg-blue text-blue opacity-[3%]'>
        <Image
          src='/svg/wave.svg'
          alt='decoration'
          layout='fill'
          width={96}
          height={96}
          objectFit='contain'
          priority={true}
          className='max-w-full'
        />
      </figure>
    </section>
  )
}
