import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Examples from '../src/components/examples'

import { startClock, serverRenderClock, initializeStore } from '../src/redux/store'

const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setInterval(() => dispatch(startClock()), 1000)
  }, [dispatch])

  return <Examples />
}

export async function getStaticProps() {
  const store = initializeStore()

  store.dispatch(serverRenderClock())

  return {
    props: {},
  }
}

export default Index