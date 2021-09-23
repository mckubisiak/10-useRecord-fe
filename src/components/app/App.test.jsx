import React from 'react';
import App from './App.jsx';
import { fireEvent, screen, render } from '@testing-library/react';

describe('testing recorder', () => {
  it('tests the functionality of undo/ redo and selecting colors', () => {
    render(<App />);

    const undo = screen.getByText('undo');
    const redo = screen.getByText('redo');
    const colorPicker = screen.getByLabelText('Color Picker');
    const div = screen.getByTestId('div');

    const red = 'FF0000';
    const blue = '0000FF';
    const green = '00FF00';
    const yellow = 'FFFF00';


    fireEvent.change(colorPicker, { target: { value: red } });
    expect(div).toHaveStyle({ background: red });
    fireEvent.change(colorPicker, { target: { value: blue } });
    expect(div).toHaveStyle({ background: blue });
    fireEvent.change(colorPicker, { target: { value: green } });
    expect(div).toHaveStyle({ background: green });

    fireEvent.click(undo);
    expect(div).toHaveStyle({ background: blue });
    fireEvent.click(undo);
    expect(div).toHaveStyle({ background: red });
    fireEvent.click(redo);
    expect(div).toHaveStyle({ background: blue });

    fireEvent.change(colorPicker, { target: { value: yellow } });
    expect(div).toHaveStyle({ background: yellow });

    
    fireEvent.click(undo);
    expect(div).toHaveStyle({ background: blue });
    fireEvent.click(undo);
    expect(div).toHaveStyle({ background: red });

    fireEvent.click(redo);
    expect(div).toHaveStyle({ background: blue });
    fireEvent.click(redo);
    expect(div).toHaveStyle({ background: yellow });
    fireEvent.click(redo);
    expect(div).toHaveStyle({ background: green });


  });
});
