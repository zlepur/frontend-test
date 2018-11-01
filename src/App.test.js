import React from 'react';
import ReactDOM from 'react-dom';
import {App, RandomColor, BLACK, TextInput} from './App';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';


it('renders without crashing', () => {
  const div = document.createElement('div');
  let tree = ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('render RandomColor with custom text', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<RandomColor text="test"/>);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
    expect(result.props.children[0]).toEqual(<label style={{color: BLACK}}>test</label>);
})

test('check if label is updated', () => {
  const app = ReactTestUtils.renderIntoDocument(<App />);
  let label = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'label');
  let textInput = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'input');
  expect(label.textContent).toBe('default');
  ReactTestUtils.Simulate.change(textInput, {target: {value: 'some_val'}});
  expect(label.textContent).toBe('some_val');
})