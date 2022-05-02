class DomElement {
  constructor(type, attributes, children) {
    this.type = type;
    this.attributes = attributes;
    this.children = children;
  }

  draw() {
    const element = document.createElement(this.type);

    for (const attribute in this.attributes) {
      element.setAttribute(attribute, this.attributes[attribute]);
    }

    if (typeof this.children === 'string') {
      element.textContent = this.children;
    } else if (Array.isArray(this.children)) {
      this.children.forEach((child) => {
        element.appendChild(child.draw());
      });
    } else if (this.children && typeof this.children === 'object') {
      const { type, attributes, children } = this.children;
      const child = new DomElement(type, attributes, children);
      element.appendChild(child.draw());
    }
    return element;
  }
}

function el(type, attributes, children) {
  return new DomElement(type, attributes, children);
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

document.getElementById('root').appendChild(tree.draw());
