export function addFragmentToElement(element, index, visible) {
    if (element && !element.hasAttribute('data-fragment-index')) {
      element.setAttribute('data-fragment-index', String(index));
      if (!element.classList.contains('fragment')) {
        element.classList.add('fragment');
        if(visible) {
          element.classList.add('visible');
        }
      }
    }
  }