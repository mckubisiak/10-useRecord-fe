import React, { useState, useEffect } from 'react';

const useRecord = (init) => {
  const [current, setCurrent] = useState(init);
  const [colorRecord, setColorRecord] = useState([init]);
  let [colorIndex, setColorIndex] = useState(0);
  // TODO: Implement me!!
  const undo = () => {
    colorIndex = colorIndex - 1;
    setColorIndex(colorIndex);
    setCurrent(colorRecord[colorIndex]);
  };

  const redo = () => {
    colorIndex = colorIndex + 1;
    setColorIndex(colorIndex);
    setCurrent(colorRecord[colorIndex]);
  };

  const record = (color) => {
    colorIndex = colorIndex + 1;
    colorRecord.splice(colorIndex, 0, color);
    setColorIndex(colorIndex);
    setCurrent(colorRecord[colorIndex]);
    setColorRecord(colorRecord);
  };
  return {
    current,
    undo,
    redo,
    record,
  };
};

export default function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>

      <label>Color Picker
        <input
          type="color"
          value={current}
          onChange={({ target }) => record(target.value)}
        />
      </label>

      <div
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
        data-testid="div"
      ></div>
    </>
  );
}
