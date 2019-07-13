
expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});

test('numeric ranges', () => {
    expect(100).toBeWithinRange(90, 110);
    expect(101).not.toBeWithinRange(0, 100);
    expect({ apples: 6, bananas: 3 }).toEqual({
        apples: expect.toBeWithinRange(1, 10),
        bananas: expect.not.toBeWithinRange(11, 20),
    });
});

describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
    const expected = [1, 2, 3, 4, 5, 6];
    it('matches even with an unexpected number 7', () => {
        expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
            expect.arrayContaining(expected),
        );
    });
    it('does not match without an expected number 2', () => {
        expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
            expect.arrayContaining(expected),
        );
    });
});

describe('not.objectContaining', () => {
    const expected = { foo: 'bar' };

    it('matches if the actual object does not contain expected key: value pairs', () => {
        expect({ bar: 'baz' }).toEqual(expect.not.objectContaining(expected));
    });
});

function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

test('try mock ', () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // 此 mock 函数被调用了两次
    expect(mockCallback.mock.calls.length).toBe(2);

    // 第一次调用函数时的第一个参数是 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // 第二次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // 第一次函数调用的返回值是 42
    expect(mockCallback.mock.results[0].value).toBe(42);
});

test('try mock2', () => {
    const myMock = jest.fn();

    const a = new myMock();

    console.log(myMock.mock.instances.length);
});