import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadExampleData, loadingExampleDataFailure } from '../redux/store';

function DataList() {
  const dispatch = useDispatch();
  const exampleData = useSelector((state) => state.reducer.exampleData);
  const error = useSelector((state) => state.reducer.error);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    window
      .fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.status !== 200) {
          dispatch(loadingExampleDataFailure());
          setIsLoading(false);
          return;
        }
        response.json().then((data) => {
          dispatch(loadExampleData(data));
          setIsLoading(false);
        });
      })
      .catch(() => {
        dispatch(loadingExampleDataFailure());
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div>
      <h1>API DATA:</h1>
      {exampleData && !isLoading ? (
        <pre>
          <code>{JSON.stringify(exampleData, null, 2)}</code>
        </pre>
      ) : (
        <p style={{ color: 'blue' }}>Loading...</p>
      )}
      {error && <p style={{ color: 'red' }}>Error fetching data.</p>}
    </div>
  );
}

export default DataList;
