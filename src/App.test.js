import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
    render(<App/>);

    const colorButton = screen.getByRole('button', {name: 'Change to blue'});
    expect(colorButton).toHaveStyle({backgroundColor: 'red'});
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
    expect(colorButton.textContent).toBe('Change to red');
});

test('checkbox should be unchecked', () => {
    render(<App/>);
    const colorButton = screen.getByRole('button', {name: 'Change to blue'});
    expect(colorButton).toBeEnabled();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click', () => {
    render(<App/>);
    const colorButton = screen.getByRole('button', {name: 'Change to blue'});
    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();

    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
});

test('disable button by click on checkbox -> button is gray -> enable button by clicking checkbox -> button is red', () => {
    render(<App/>);
    const colorButton = screen.getByRole('button', {name: 'Change to blue'});
    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({backgroundColor: 'grey'})

    fireEvent.click(checkbox);
    expect(colorButton).toBeEnabled();
    expect(colorButton).toHaveStyle({backgroundColor: 'red'});
});

test('by clicking button change color, disable button -> button grey', () => {
    render(<App/>);
    const colorButton = screen.getByRole('button', { name: 'Change to blue'});
    const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

    fireEvent.click(checkbox);
    expect(colorButton).toBeDisabled();
    expect(colorButton).toHaveStyle({backgroundColor: 'grey'});

    fireEvent.click(checkbox);
    expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
});

describe('spaces before camel-case capital letters', () => {
   test('works for no inner capital letters', () => {
       expect(replaceCamelWithSpaces('Red')).toBe('Red');
   });
   test('works for one inner capital letter', () => {
        expect(replaceCamelWithSpaces('MidnightBlue')).toBe("Midnight Blue");
   });
   test("works for multiple inner capital letters", () => {
        expect(replaceCamelWithSpaces('MediumVioletRed')).toBe("Medium Violet Red");
   });
});