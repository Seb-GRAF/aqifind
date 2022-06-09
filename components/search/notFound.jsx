import Image from 'next/image'

export default function NotFound({ cityName, suggestions }) {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className=' text-3xl font-bold tracking-wider'>
          City with name{' '}
          <b className='capitalize font-bold tracking-wider'>
            {'"'}
            {decodeURIComponent(cityName)}
            {'"'}
          </b>{' '}
          not found
        </h1>
        {suggestions && suggestions.length > 0 ? (
          <p className='opacity-70'>Maybe those suggestions might help:</p>
        ) : (
          <p className='opacity-70'>
            No station with similar name were found...
          </p>
        )}
      </div>
      {suggestions && suggestions.length > 0 && (
        <ul className='flex flex-col gap-2 mt-8 mb-12'>
          {suggestions.map((suggestion, index) => {
            if (index > 5) return null
            return (
              <li key={suggestion.uid}>
                <a
                  href={`/search?city=${suggestion.station.name}`}
                  className='underline underline-offset-1'>
                  {suggestion.station.name}
                </a>
              </li>
            )
          })}
        </ul>
      )}
      <figure className='relative h-full min-h-[40vh] md:min-h-[50vh] flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none'>
        <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
          Picture by{' '}
          <a
            className='underline'
            href='https://unsplash.com/photos/PP8Escz15d8'>
            Keith Hardy
          </a>
        </figcaption>
        <Image
          src='/pictures/desert.jpg'
          alt='sahara desert'
          layout='fill'
          objectFit='cover'
          priority={true}
        />
      </figure>
    </>
  )
}
