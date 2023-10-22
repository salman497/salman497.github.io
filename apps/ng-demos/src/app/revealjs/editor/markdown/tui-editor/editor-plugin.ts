// custom-plugin.ts
import { PluginContext, PluginInfo } from '@toast-ui/editor';

export default function editorPlugin(context: PluginContext): PluginInfo {
  const container = document.createElement('div');
  const editorPluginComponent = document.createElement('editor-plugin');
  container.appendChild(editorPluginComponent);

  editorPluginComponent.addEventListener('markdownSelected', (event: any) => {
    const payload = event.detail;
    context.eventEmitter.emit('command', 'markdownCmd', { markdown: payload });
  });

  return {
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 3,
        item: {
          name: 'markdown dropdown',
          tooltip: 'Select markdown',
          className: 'editor-button fas fa-solid fa-plus',
          popup: {
            body: container,
            style: { width: '200px' }
          }
        }
      }
    ],
    markdownCommands: {
      markdownCmd: (payload, state, dispatch) => {
        const { markdown } = payload;
        const { from, to } = state.selection;
        const tr = state.tr.insertText(markdown, from, to);
        dispatch(tr);
        return true;
      }
    },
    wysiwygCommands: {
      markdownCmd: (payload, state, dispatch) => {
        const { markdown } = payload;
        const { from, to } = state.selection;
        const tr = state.tr.insertText(markdown, from, to);
        dispatch(tr);
        return true;
      }
    }
  };
}
