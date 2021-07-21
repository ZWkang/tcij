import React from 'react';
import { parse, rules, ruleStrings } from './parse';

let id = 0;

const base = {
  custom:
    (tag) =>
    (attrs) =>
    (strings, ...exps) => {
      id++;
      const MarkComponent = React.memo(
        React.forwardRef((props, ref) => {
          const { className: _className = '' } = props;
          let cssText = '';
          if (strings.length >= exps.length) {
            strings.forEach((string, index) => {
              cssText += string;
              cssText += exps[index] ? exps[index](props) : '';
            });
          } else {
            exps.forEach((exp, index) => {
              cssText += strings[index] || '';
              cssText += exp(props);
            });
          }
          const className = parse(cssText);

          return React.createElement(tag, {
            ref,
            ...attrs(props),
            className: `${className} ${_className}`,
            children: props.children,
          });
        })
      );
      if (tag && typeof tag.displayName === 'undefined') {
        MarkComponent.displayName = tag.displayName ? tag.displayName : tag;
      }
      return MarkComponent;
    },
};

function wrapperBaseComponent(C) {
  const D = base.custom(C)(() => {});
  D.attrs = base.custom(C);
  return D;
}

const styled = {
  div: wrapperBaseComponent('div'),
  span: wrapperBaseComponent('span'),
  img: wrapperBaseComponent('img'),
  rules,
  parse,
  ruleStrings,
};

export default styled;
