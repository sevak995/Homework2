import { createBoxes } from './utils';

const ROWS = 10;
const COLUMNS = 10;

export const sidebarElements = [
  'input',
  'button',
  'textarea',
  'select',
  'radio',
  'checkbox',
];

export const initialBoxes = createBoxes(ROWS, COLUMNS);

export const customAttributes = ['label', 'width'];
