import { HTML_ESCAPE_MAP } from './constants';

export function escapeForHTML(input) {
  return input.replace(/([&<>'"])/g, (char) => HTML_ESCAPE_MAP[char]);
}

export function handleNewSyntax(text) {
  const newSyntaxRegex = /\[newSyntax\](.*?)\[\/newSyntax\]/g;
  return text.replace(newSyntaxRegex, '<span class="new-syntax">$1</span>');
}
