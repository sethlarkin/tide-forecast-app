// No changes here; I'm including it for context.
import React, { useEffect, useState } from 'react';
import TideChart from './TideChart';
import TideTable from './TideTable';

const TideComponent = () => {
  const [tideData, setTideData] = useState([]);

  useEffect(() => {
    fetch('/api/tideData')
      .then((res) => res.json())
      .then((data) => {
        setTideData(data.predictions || []);
      });
  }, []);

  return (
    <div className="flex flex-row justify-between space-x-4">
      <div className="w-1/2">
        <TideTable tideData={tideData} />
      </div>
      <div className="w-1/2">
        <TideChart tideData={tideData} />
      </div>
    </div>
  );
};

export default TideComponent;
