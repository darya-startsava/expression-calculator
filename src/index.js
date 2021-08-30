function eval() {
    // Do not use eval!!!
    return;
}

function yard(str) {
    const openedBrackets = str.split('').filter(i => i === '(').length;
    const closedBrackets = str.split('').filter(i => i === ')').length;
    if (openedBrackets != closedBrackets) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    let arr = str.split(/(\d+|\S)/).filter(i => i && i !== ' ')

    let priority = { '+': 1, '-': 1, '*': 2, '/': 2, '(': 0 };
    let stack = [];
    let expr = [];
    arr.reverse();
    let item;
    let itemStack;
    while (arr.length > 0) {
        item = arr.pop();
        if (parseFloat(item) || item === "0") {
            expr.push(item)
        }
        else {
            if (item == '(') {
                stack.push(item);
            }
            else if (item == ')') {
                itemStack = stack.pop();
                while (itemStack != '(') {
                    expr.push(itemStack);
                    itemStack = stack.pop();
                }
            }
            else {
                while (priority[item] <= priority[stack[stack.length - 1]]) {
                    expr.push(stack.pop());
                }
                stack.push(item);
            }
        }
    };
    while (stack.length != 0) {
        expr.push(stack.pop());
    }
    return expr.join(' ');
};

function rpn(expr) {
    let stack = [];
    expr = expr.split(' ').reverse();
    let item;
    while (expr.length > 0) {
        item = expr.pop();
        const val = parseFloat(item);
        if (val || val === 0) {
            stack.push(val)
        }
        else {
            if (item == "+") {
                stack[stack.length - 2] = stack[stack.length - 2] + stack[stack.length - 1];
                stack.pop();
            }
            else if (item == "-") {
                stack[stack.length - 2] = stack[stack.length - 2] - stack[stack.length - 1];
                stack.pop();
            }
            else if (item == "*") {
                stack[stack.length - 2] = stack[stack.length - 2] * stack[stack.length - 1];
                stack.pop();
            }
            else if (item == "/") {
                if (stack[stack.length - 1] === 0) {
                    throw new Error("TypeError: Division by zero.");
                }
                stack[stack.length - 2] = stack[stack.length - 2] / stack[stack.length - 1];
                stack.pop();
            }
        }
    };
    return stack[0];
};

function expressionCalculator(expr) {
    return rpn(yard(expr))
}

module.exports = {
    expressionCalculator
}