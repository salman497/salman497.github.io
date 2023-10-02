export const DEFAULT_SLIDE_SEPARATOR = "\r?\n---\r?\n";
export const DEFAULT_NOTES_SEPARATOR = "notes?:";
export const DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR = "\\\.element\\\s*?(.+?)$";
export const DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR = "\\\.slide:\\\s*?(\\\S.+?)$";
export const SCRIPT_END_PLACEHOLDER = "__SCRIPT_END__";
export const CODE_LINE_NUMBER_REGEX = /\[([\s\d,|-]*)\]/;
export const HTML_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
