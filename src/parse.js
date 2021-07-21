import { compile } from 'stylis';

export const rules = [];
let cache = {};

let insert = (rule) => {
  rules.push(rule.join(''));
};

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(
    document.createElement('style')
  ).sheet;
  insert = (rule) => {
    rules.push(rule.join(''));
    rule.forEach((r) => {
      sheet.insertRule(r, sheet.cssRules.length);
    });
  };
}

// https://github.com/darkskyapp/string-hash
// function hashCode(str) {
//   var hash = 5381,
//     i = str.length

//   while (i) {
//     hash = (hash * 33) ^ str.charCodeAt(--i)
//   }

//   /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
//    * integers. Since we want the results to be always positive, convert the
//    * signed int to an unsigned by doing an unsigned bitshift. */
//   return hash >>> 0
// }
function hashCode(str) {
  for (var h = 5381 | 0, i = 0, l = x.length | 0; i < l; i++) {
    h = (h << 5) + h + x.charCodeAt(i);
  }
  return h >>> 0;
}

export const parse = (styleString) => {
  const hash = hashCode(styleString);
  if (cache[hash]) {
    if (rules.indexOf(cache[hash].value.join('')) > -1) {
      return `S${hash}`;
    }
    insert(cache[hash].value);
    return `S${hash}`;
  }
  const res = compile(`.S${hash}{${styleString}}`);
  const result = [];
  function parseChildren(node) {
    const { children, props } = node;

    if (children.length === 0) {
      return;
    }
    if (props.length > 0) {
      props.forEach((prop) => {
        result.push(`${prop} {${children.map((o) => o.value).join('')}}`);
      });
    }
  }

  res.forEach(parseChildren);
  cache[hash] = {
    value: result,
  };

  insert(result);

  return `S${hash}`;
};

export const ruleStrings = () => rules;
export const reset = () => (rules = []);
