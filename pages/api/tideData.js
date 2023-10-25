import fetch from 'node-fetch';

export default async function handler(req, res) {
  const station_id = '9413450';  // your station ID
  
  // Get today's date in YYYYMMDD format
  const today = new Date();
  const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

  const api_key = 'YOUR_API_KEY_HERE';
  const base_url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

  const params = new URLSearchParams({
    begin_date: formattedDate,
    end_date: formattedDate,
    station: station_id,
    product: 'predictions',
    datum: 'MLLW',
    time_zone: 'lst_ldt',
    interval: 'hilo',
    units: 'english',
    format: 'json',
    application: 'YourAppName',
    api_key: api_key
  });

  const response = await fetch(`${base_url}?${params.toString()}`);
  const data = await response.json();
  
  res.status(200).json(data);
}
