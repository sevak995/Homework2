class DomElement {
  constructor(type, attributes, children) {
    this.type = type;
    this.attributes = attributes;
    this.children = children;
  }

  drow() {
    const element = document.createElement(this.type);

    for (const attribute in this.attributes) {
      element.setAttribute(attribute, this.attributes[attribute]);
    }

    if (typeof this.children === 'string') {
      element.textContent = this.children;
    } else {
      this.children ? element.appendChild(this.children) : null;
    }
    return element;
  }
}

function el(type, attributes, children) {
  if (Array.isArray(children)) {
    const parentElement = document.createElement(type);
    children.forEach((child) => parentElement.appendChild(child));
    return parentElement;
  }
  const element = new DomElement(type, attributes, children);
  return element.drow();
}

const tree = el('form', { action: '/some_action' }, [
  el('label', { for: 'name' }, 'First name:'),
  el('br', {}, null),
  el(
    'input',
    { type: 'text', id: 'name', name: 'name', value: 'My name' },
    null
  ),
  el('br', {}, null),
  el('label', { for: 'last_name' }, 'Last name:'),
  el('br', {}, null),
  el(
    'input',
    {
      type: 'text',
      id: 'last_name',
      name: 'last_name',
      value: 'My second name',
    },
    null
  ),
  el('br', {}, null),
  el('input', { type: 'submit', value: 'Submit' }, null),
]);

document.getElementById('root').appendChild(tree);
