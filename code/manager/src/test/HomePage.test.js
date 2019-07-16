import React from 'react';
import Homepage from '../components/HomePage';
import renderer from 'react-test-renderer';
import Enzyme, {mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/*
let changeBg = jest.fn();
let fn = jest.fn(x => x);

let homePageMount = mount(
    <Homepage changeBg={changeBg} fn={fn} logIn={false} />
);

let homePageShallow = shallow(
    <Homepage changeBg={changeBg} fn={fn} logIn={false} />
);
*/

describe('测试HomePage组件', () => {

    test('测试父组件传值', () => {
        let changeBg = jest.fn();
        let fn = jest.fn(x => x);

        let homePageShallow = shallow(
            <Homepage changeBg={changeBg} fn={fn} logIn={false} />
        );
        // componentDidMount时使用changeBg
        expect(changeBg).toHaveBeenCalledTimes(1);
        expect(fn).not.toHaveBeenCalled();
        expect(homePageShallow.props().logIn).toBeFalsy();
    })

    test('测试子组件构成', () => {
        let changeBg = jest.fn();
        let fn = jest.fn(x => x);

        let homePageMount = mount(
            <Homepage changeBg={changeBg} fn={fn} logIn={false} />
        );
        // 测试changeBg可正常使用
        expect(changeBg).toHaveBeenCalledTimes(1);
        homePageMount.props().changeBg()
        expect(changeBg).toHaveBeenCalledTimes(2);
        // 测试fn
        homePageMount.props().fn("步惊云");
        expect(fn.mock.calls[0][0]).toMatch("步惊云");
        
        expect(homePageMount.find('Title').length).toBe(1);
        expect(homePageMount.find('Title').props().children).toEqual(" 欢迎登录优邻购管理系统 ");
        expect(homePageMount.find('LogInForm').exists).toBeTruthy();
    });


});


