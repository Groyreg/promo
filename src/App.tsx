import { ReactElement, useState } from 'react';
import ReactLogo from '@assets/react.svg?react';

import './App.css';

const App = (): ReactElement => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <ReactLogo />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={() => setCount((count: number) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default App;
