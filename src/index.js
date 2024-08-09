import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Bufferbloat from 'bufferbloat';
import Reactsume from './Reactsume';

const json_data = './resume.json';
const loadResumeData = async () => {
    try {
        const response = await fetch(json_data);
        if (!response.ok) {
            throw new Error(`Couldn't load resume: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      loadResumeData().then((data) => data && setData(data));
  }, []);

  if (data === null)
      return <div>Loading resume data...</div>;
  if (data === undefined)
      return <div>Error loading resume data</div>;

  return <Reactsume data={data} theme={Bufferbloat} pdf={pdf} />;
};

ReactDOM.createRoot(
  document.getElementById('root'),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);