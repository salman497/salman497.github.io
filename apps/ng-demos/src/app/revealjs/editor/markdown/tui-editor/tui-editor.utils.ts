import Editor from '@toast-ui/editor';
import { ToolbarItemOptions } from '@toast-ui/editor/types/ui';

export function initEditor(
  markdown: string,
  elm: HTMLDivElement,
  onLoad: () => void,
  onChange: () => void
): Editor {
  const el = document.createElement('div');
  elm.appendChild(el);
  return new Editor({
    el,
    events: {
      load: () => {
        onLoad();
      },
      change: () => {
        onChange();
      },
    },
    // previewStyle: 'vertical',
    usageStatistics: false,
    initialEditType: 'wysiwyg', // Set to 'wysiwyg' for the WYSIWYG mode
    previewStyle: 'tab',
    initialValue: markdown,
    height: '600px',
    // plugins: [customAddCodePlugin],
    toolbarItems: getToolbars(),
  });
}



export function scrollToHeading(
  editor: Editor,
  el: HTMLDivElement,
  pageNumber: number
) {
  if (!pageNumber) {
    editor.setScrollTop(0);
    return;
  }
  const headingList = editor.isWysiwygMode()
    ? getHeadingFromWYSUSYG()
    : getHeadingFromMarkdown(el);
  const target = headingList[pageNumber - 1];
  if (!target) return;
  editor.setScrollTop(target.offsetTop);
}

function getToolbars(): (string | ToolbarItemOptions)[][] {
  return [
    ['code', 'codeblock'],
    // [{
    //   el: this.createDropdown(), //
    //   command: 'bold',
    //   tooltip: 'Custom Bold',
    //   name: 'bold'
    // }
    // ],
    ['hr', 'quote'],
    ['heading', 'bold', 'italic', 'strike'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
  ];
}

// function createLastButton() {
//   const button = document.createElement('button');

//   button.className = 'toastui-editor-toolbar-icons last';
//   button.style.backgroundImage = 'none';
//   button.style.margin = '0';
//   button.innerHTML = `<i>CC</i>`;
//   button.addEventListener('click', () => {
//     console.log(`click`);
//     // executeCustomCommand(this.editor);
//     // this.editor.exec('bold');
//   });

//   return button;
// }
// function createDropdown() {
//   const dropdown = document.createElement('select');

//   // Create 3 options for the dropdown
//   const option1 = document.createElement('option');
//   option1.value = 'item1';
//   option1.textContent = 'Item 1';

//   const option2 = document.createElement('option');
//   option2.value = 'item2';
//   option2.textContent = 'Item 2';

//   const option3 = document.createElement('option');
//   option3.value = 'item3';
//   option3.textContent = 'Item 3';

//   // Add options to the dropdown
//   dropdown.appendChild(option1);
//   dropdown.appendChild(option2);
//   dropdown.appendChild(option3);

//   // Optional: Add event listener for handling the dropdown change
//   dropdown.addEventListener('change', (event) => {
//     console.log(`Selected item:`, event);
//     // executeCustomCommand(this.editor);
//   });

//   return dropdown;
// }

function getHeadingFromMarkdown(el: HTMLDivElement): NodeListOf<HTMLElement> {
  return el.querySelectorAll('.toastui-editor-md-thematic-break');
}

function getHeadingFromWYSUSYG(): NodeListOf<HTMLElement> {
  const rootElement: any = document.querySelector(
    '.ProseMirror.toastui-editor-contents'
  );
  const hrElements: any = rootElement.querySelectorAll('div > hr');
  return hrElements;
}
