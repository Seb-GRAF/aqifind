import { useEffect, useState } from 'react'
const facts = [
  'An average American breathes 2 gallons of air per minute, which means around 3400 gallons of air each day.',
  'Inhaling air pollution takes away at least 1-2 years of a typical human life.',
  'It has effects as small as burning eyes and itchy throat to as large as breathing problems and death.',
  'Pollutants that are released into the air, as opposed to land and water pollutants, are the most harmful.',
  'Rising levels of air pollution in Beijing has brought a new disease – Beijing cough.',
  'Air pollution is not a recent occurrence. In 1952, the Great Smog of London killed 8000 people.',
  'Deaths caused by air pollution cost the European Union €161 billion.',
  'Electric vehicles produce fewer air pollutants. They stir up dirt but without producing gases.',
  'Producing heavy crude oil increases the chances of air pollution by 40% than producing light crude oil.',
  'According to the Lancet journal, air pollution caused by waiting in traffic increases the chances of death caused due to heart attack.',
  'Toxic air pollution poses a greater threat to children due to their smaller physical size and lung capacity.',
  'Air pollution and resulting deaths are increasing fastest in Asia.',
  'Air pollution that causes smog affects dolphins and makes them suffer from black lung diseases.',
  '70% of the air pollution caused in Chinese cities is due to tailpipes.',
  '5,000 premature deaths in Southern California are caused due to pollution from diesel trucks.',
  'Travels at Grand Canyon are unable to see the other side due to air pollution, which is 1000 miles away.',
  'The most hazardous pollutants are released from the air and less from the water and land together.',
  'The best ways to reduce air pollution are by walking and riding a bicycle.',
  'A single bus carries passengers who are likely to drive 40 cars.',
  '28% of Americans believe they are most affected by air pollution caused by vehicles.',
  'Air pollution in China can travel up to Central Valley of California.',
  'Outdoor air pollution ranks among the top ten killers on earth.',
  '65% of the deaths in Asia and 25% of deaths in India is due to air pollution.',
  'Around 2 million cars in Manila and the Philippines cause 80% of air pollution.',
  'Air pollution in India is estimated to cause 527, 700 deaths every year.',
  'The number of people who die in America every year due to air pollution is above 50,000.',
  '80% of lung diseases is caused due to pollution from other cars, buses, trucks and other vehicles.',
  'It is estimated that 750,000 people die in china prematurely due to air pollution.',
  'Research by MIT proves that around 13000 British citizens die due to air pollution from vehicles and power plants.',
  'Air pollution in California kills 25,000 people per year and costs $200 million worth of medical expenses.',
  '300,000 in China die every year due to heart disease and lung cancer caused by air pollution.',
  'People in many cities wear masks continually to save themselves from air pollution.',
  'Heavy crude oil increases air pollution by 40% more than light crude oil.',
  'Air pollution caused in traffic increase the chances of heart attack.',
  'By 2050, 6 million people will die per year due to air pollution.',
  'During a heavy traffic jam, pollutants outside can seep into your car, making the air inside your car 10 times more polluted than typical city air.',
  'According to the California Department of Education, Asthma is a leading cause of school absenteeism.',
  'Indoor air pollution is 2-5 times worse than the air outdoors.',
  'People who live near high traffic roads face a greater risk of cancer, heart disease, asthma and bronchitis as these places contain more concentrated levels of air pollution.',
  'Switching to more efficient and cleaner fuels from solid fuels(wood, biomass) can help you to reduce indoor air pollution.',
  'The US Environmental Protection Agency(EPA) has been authorized through the Clean Air Act to regulate the amount of emissions made in order to protect public health.',
  'Children’s IQ could also turn out to be deteriorated with excess exposure to air pollutants.',
  'In many parts of the United States, air pollution has reduced the distance of visibility by almost 70%. This is alarmingly dangerous because, with such reduced rates of visibility, it is quite natural that the number of road accidents too would increase alarmingly.',
  'The tiniest of the airborne particles in the air can enter our lungs through our bloodstream and can cause several fatal diseases.',
  'Polycyclic aromatic hydrocarbons, also known as PAH, are released from the vehicular exhausts. When human beings are exposed to excessive quantities of the same, it can adversely affect their liver and can also permanently damage the same.',
  'Polycyclic aromatic hydrocarbons or PAH can also cause Attention Deficiency Disorder in children. It could also worsen up any possible symptoms of ADHD.',
  'According to the 2014 reports of the Environment Protection Agency (EPA), carbon dioxide accounts for a total of 81 percent of the greenhouse gas emissions, while methane accounts for approximately 11 percent.',
  'Pollens also add to the contributing factors to air pollution. In fact, it is one of the sources that have the most allergens and triggers allergic reactions in many.',
  'The climate change that is caused due to air pollution results in the change of the season of pollination. This, in turn, harms the ecological balance of the earth.',
  'NRDC’s Climate and Clean Air program estimates that they can make an HFC phase-down that would help curtail about 80 billion tons of carbon dioxide over the period of the next 35 years.',
  'Deforestation is one of the major causes of air pollution too. With a decreased number of plants and trees to absorb the harmful carbon dioxide emissions for the purpose of photosynthesis, the extent of air pollution increases manifold.',
  'Air pollution is the biggest cause of death in the United Kingdom. In fact, it is one of the major causes that kill people worldwide.',
  'A study claims that a child who has been born today might not be able to breathe proper fresh air until they turn about 8 years old.',
  'Annually, air pollution causes approximately 36,000 premature deaths in the United Kingdom alone.',
  'Pollution caused by the fine particles suspended in air results in about 29,000 premature deaths annually.',
  'The air pollution situation is so bad now that in London alone, 9000 deaths are caused annually just because of some invisible air pollution.',
  'In the whole of Europe, it is claimed that among some other cities, London has the filthiest air.',
  'Sitting inside a car exposes a person to huge amounts of air pollutants. While sitting in a car, a person is exposed to 8 times more pollutants than a cyclist who is riding past it.',
  'In the last 4 years alone, the United Kingdom has seen a staggering 26 times increase in the use of electric vehicles.',
]

export default function RandomFacts({ bg }) {
  const [fact, setFact] = useState('')
  const formattedFacts = facts.map((fact, index) => {
    return {
      index,
      text: fact,
    }
  })

  const randomFact = () => {
    const randomIndex = Math.floor(Math.random() * formattedFacts.length)
    setFact(formattedFacts[randomIndex])
  }

  useEffect(() => {
    randomFact()
  }, [])

  return (
    <div>
      <div
        className={`relative flex flex-col items-center justify-center gap-4 w-full rounded-lg p-4 mt-6 ${bg}`}>
        <h3 className='w-full text-center opacity-70 text-lg'>
          Random facts about air pollution
        </h3>
        <p className='flex gap-4 p-4 justify-center items-start h-auto'>
          <span className='font-bold whitespace-nowrap'>
            Fact n°{fact.index + 1}:
          </span>
          <span className='max-w-[30rem] w-full'>{fact.text}</span>
        </p>
        <button
          onClick={randomFact}
          className='absolute bottom-0 right-0 text-3xl font-thin w-12 h-12 text-black'>
          ↺
        </button>
      </div>
    </div>
  )
}
