
const calcButtons = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 'c', 0, '=', '/'];

//Helper to create DOM node
const createDOMNode = (tagName, content = '', attribute = []) => {
    const elem = document.createElement(tagName);
    elem.innerText = content;
    if (Array.isArray(attribute) && attribute.length) {
        attribute.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }
    return elem;
};


const calcContainerNode = createDOMNode('div', '', [{ name: 'class', value: 'calc-container' }]);
const userDisplayNode = createDOMNode('div', '', [{ name: 'class', value: 'user-display' }]);

const buttonNodes = calcButtons.map((buttonText) => {
    const buttonClass = typeof (buttonText) === 'string' ? 'operator' : 'number';
    return createDOMNode('button', buttonText, [
        { name: 'class', value: buttonClass },
        { name: 'data-value', value: buttonText },
        { name: 'onclick', value: 'handleButtonClick(this)' },
    ]);
});

calcContainerNode.append(userDisplayNode, ...buttonNodes);

document.body.append(calcContainerNode);