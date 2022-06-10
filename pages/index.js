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
      <Hero />
      <Intro />
      <Divider />
      <Intro2 />
      <Divider2 />
      <Intro3 />
    </Layout>
  )
}
