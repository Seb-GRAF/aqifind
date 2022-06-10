import Layout from '../components/layout/layout'
import Hero from '../components/home/hero'
import Intro from '../components/home/intro'
import Intro2 from '../components/home/intro2'
import Intro3 from '../components/home/intro3'
import Divider from '../components/home/divider'
import Divider2 from '../components/home/divider2'

export default function Home() {
  return (
    <Layout>
      <div
        id='preloader'
        className='z-50 fixed w-screen h-screen bg-white top-0 left-0'></div>
      <Hero />
      <Intro />
      <Divider />
      <Intro2 />
      <Divider2 />
      <Intro3 />
    </Layout>
  )
}
