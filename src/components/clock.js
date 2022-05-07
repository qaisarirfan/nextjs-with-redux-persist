import React from 'react';
import { useSelector } from 'react-redux';

const format = (t) => t.toJSON().slice(11, 19); // cut off except hh:mm:ss

export default function Clock() {
  const lastUpdate = useSelector((state) => state.reducer.lastUpdate);
  const light = useSelector((state) => state.reducer.light);
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
    </div>
  );
}
