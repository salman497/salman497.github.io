import type { PluginContext, PluginInfo } from '@toast-ui/editor';

const PREFIX = 'toastui-editor-';

function createToolbarItemOption() {
  return {
    name: 'addCustomCode',
    tooltip: 'Add custom code',
    className: `${PREFIX}toolbar-icons addCustomCode`,
    command: 'addCustomCode',
    text: 'add'
  };
}

export default function customAddCodePlugin(): PluginInfo {


  const toolbarItem = createToolbarItemOption();

  return {
    markdownCommands: {
      addCustomCode: (state, { tr, selection, schema }, dispatch) => {
        const text = 'custom code rendered here';
        const node = schema.text(text);
        tr.replaceSelectionWith(node);
        dispatch!(tr);
        return true;
      },
    },
    wysiwygCommands: {
      addCustomCode: (state, { tr, selection, schema }, dispatch) => {
        const text = 'custom code rendered here';
        const node = schema.text(text);
        tr.replaceSelectionWith(node);
        dispatch!(tr);
        return true;
      },
    },
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 4,
        item: toolbarItem,
      },
    ],
  };
}
