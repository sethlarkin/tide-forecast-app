import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Navbar from '../components/Navbar';
import TideComponent from '../components/TideComponent';

export default function Home() {  

  return (
    <div>
      <Navbar />
      <TideComponent />
    </div>
  );
}
