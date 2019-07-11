import React from 'react';
import Homepage from '../components/HomePage';
import renderer from 'react-test-renderer';

test('should ', () => {
    const components = renderer.create(
        <Homepage 
            fn={(userName) => {
                    this.setState({
                        userName : userName,
                        logIn: true
                    });
                }
            }
            logIn={false}
        >
        </Homepage>
    )

    let tree = components.toJSON();
    expect(tree).toMatchSnapshot();
})
