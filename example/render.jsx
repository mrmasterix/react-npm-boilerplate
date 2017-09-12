import React from 'react';
import { render } from 'react-dom';
import Component from '../src';
import '../src/css/style.scss';

const node = document.querySelector(commonConfig.appRoot);

try {
  render(
    <Component />,
    node
  );
} catch (e) {
  render(
    <div>No component yet</div>,
    node
  );
}
