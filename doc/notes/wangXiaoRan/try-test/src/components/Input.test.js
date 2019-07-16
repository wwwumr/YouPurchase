import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import Input from './Input'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('try test', () => {
    const inputTest = shallow(<Input >你好</Input>)
    expect(inputTest.find('input').at(1).props().value).toEqual("你好")
    inputTest.find('input').at(0).simulate('change')
    expect(inputTest.find('input').at(1).props().value).toMatch("再见")    
});
