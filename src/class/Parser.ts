import * as DOMPurify from 'dompurify';

const showdown = require('showdown');
const parser: showdown.Converter = new showdown.Converter();
parser.setFlavor('github');

export function marked(input: string): string {
  return DOMPurify.sanitize(parser.makeHtml(input));
}

export default {
  marked
};
