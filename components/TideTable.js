import React from 'react';

const TideTable = ({ tideData }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border">DateTime</th>
          <th className="py-2 px-4 border">Tide Level (ft.)</th>
        </tr>
      </thead>
      <tbody>
        {tideData.map((data, index) => {
          const dateObj = new Date(data.t); // Assuming data.t contains the timestamp
          const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
          const formattedLevel = parseFloat(data.v).toFixed(2) + " ft."; // Assuming data.v contains the tide level

          return (
            <tr key={index}>
              <td className="py-2 px-4 border">{formattedDate}</td>
              <td className="py-2 px-4 border">{formattedLevel}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TideTable;
