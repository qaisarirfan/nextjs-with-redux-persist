import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeStore } from '../src/redux/configureStore';
import { login } from '../src/redux/reducers/authentication/actionCreators';

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  }, []);

  return <p>test</p>;
}

export async function getStaticProps() {
  const store = initializeStore();

  // store.dispatch(serverRenderClock());

  return {
    props: {},
  };
}

export default Index;
