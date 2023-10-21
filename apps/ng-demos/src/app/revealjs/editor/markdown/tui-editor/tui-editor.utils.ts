import Editor from "@toast-ui/editor";

export function scrollToHeading(editor: Editor, el: HTMLDivElement, pageNumber: number) {
if(!pageNumber) {
  editor.setScrollTop(0);
  return;
}
const headingList = editor.isWysiwygMode() ? getHeadingFromWYSUSYG() : getHeadingFromMarkdown(el);
const target = headingList[pageNumber -1];
if (!target) return;
editor.setScrollTop(target.offsetTop);
}



function getHeadingFromMarkdown(el: HTMLDivElement): NodeListOf<HTMLElement> {
  return el.querySelectorAll('.toastui-editor-md-thematic-break');
}

function getHeadingFromWYSUSYG(): NodeListOf<HTMLElement> {
  const rootElement: any = document.querySelector('.ProseMirror.toastui-editor-contents');
  const hrElements: any = rootElement.querySelectorAll('div > hr');
  return hrElements;
}

export function loadCss(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      if (links.find((e: any) => e.href === href) === undefined) {
        const lnk = document.createElement('link');
        const loaded = () => {
          lnk.removeEventListener('load', loaded);
          resolve();
        };
        lnk.addEventListener('load', loaded);
        lnk.rel = 'stylesheet';
        lnk.href = href;
        document.head.appendChild(lnk);
      } else {
        resolve();
      }
    });
  }

  export function createDropdown() {
    const dropdown = document.createElement('select');

    // Create 3 options for the dropdown
    const option1 = document.createElement('option');
    option1.value = 'item1';
    option1.textContent = 'Item 1';

    const option2 = document.createElement('option');
    option2.value = 'item2';
    option2.textContent = 'Item 2';

    const option3 = document.createElement('option');
    option3.value = 'item3';
    option3.textContent = 'Item 3';

    // Add options to the dropdown
    dropdown.appendChild(option1);
    dropdown.appendChild(option2);
    dropdown.appendChild(option3);

    // Optional: Add event listener for handling the dropdown change
    dropdown.addEventListener('change', (event) => {
      console.log(`Selected item:`, event);
      // executeCustomCommand(this.editor);
    });

    return dropdown;
}

export function createLastButton() {
  const button = document.createElement('button');

  button.className = 'toastui-editor-toolbar-icons last';
  button.style.backgroundImage = 'none';
  button.style.margin = '0';
  button.innerHTML = `<i>CC</i>`;
  button.addEventListener('click', () => {
    console.log(`click`);
    // executeCustomCommand(this.editor);
   // this.editor.exec('bold');
  });

  return button;
}
