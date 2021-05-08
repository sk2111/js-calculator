
const calcButtons = [7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 'c', 0, '=', '/'];
let currentEquation = '';
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

//creating DOM nodes for calculator
const calcContainerNode = createDOMNode('div', '', [{ name: 'class', value: 'calc-container' }]);
const userDisplayNode = createDOMNode('div', '', [{ name: 'class', value: 'user-display' }]);
const resultDisplayNode = createDOMNode('div', '', [{ name: 'class', value: 'result-display ' }]);
const gridContainer = createDOMNode('div', '', [{ name: 'class', value: 'grid-display ' }]);

const buttonNodes = calcButtons.map((buttonText) => {
    const buttonClass = typeof (buttonText) === 'string' ? 'operator' : 'number';
    return createDOMNode('button', buttonText, [
        { name: 'class', value: buttonClass },
        { name: 'data-value', value: buttonText },
        { name: 'onclick', value: 'handleButtonClick(this)' },
    ]);
});

// Add contents to DOM
gridContainer.append(...buttonNodes);
calcContainerNode.append(userDisplayNode, resultDisplayNode, gridContainer);
document.body.append(calcContainerNode);

//handlers for button click

const handleButtonClick = (event, selectedButton) => {
    const value = selectedButton ? selectedButton : event.getAttribute('data-value');
    if (value === 'c') {
        currentEquation = '';
        userDisplayNode.innerText = '';
        resultDisplayNode.innerText = '';

    }
    else if (value === '=') {
        const output = eval(currentEquation);
        resultDisplayNode.innerText = output;
    }
    else if (isFinite(value) || isFinite(currentEquation[currentEquation.length - 1])) {
        currentEquation += value;
        userDisplayNode.innerText = currentEquation;
        resultDisplayNode.innerText = '';
    }
};