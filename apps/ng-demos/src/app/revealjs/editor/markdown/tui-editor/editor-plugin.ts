// custom-plugin.ts
import { PluginContext, PluginInfo } from '@toast-ui/editor';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

export default function editorPlugin(context: PluginContext): PluginInfo {
  const container = document.createElement('div');
 // container.appendChild(createSlideButton());
  const editorPluginComponent = document.createElement('editor-plugin');
  container.appendChild(editorPluginComponent);

  editorPluginComponent.addEventListener('markdownSelected', (event: any) => {
    const payload = event.detail;
    context.eventEmitter.emit('command', 'markdownCmd', {  markdown: payload.markdown, html: payload.html });
  });

  return {
    toolbarItems: [
      {
        groupIndex: 0,
        itemIndex: 0,
        item: {
          name: 'example plugin',
          tooltip: 'Add',
          el: container,
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
        const { html } = payload;
        const { from, to } = state.selection;
    
        const parser = ProseMirrorDOMParser.fromSchema(state.schema);
        const contentNode = parser.parse(new DOMParser().parseFromString(html, 'text/html').body);
    
        const tr = state.tr.replaceWith(from, to, contentNode.content);
        dispatch(tr);
        return true;
      }
    }
  };
}

function createSlideButton() {
  const button = document.createElement('button');
  button.className = 'toastui-editor-toolbar-icons last';
  button.style.backgroundImage = 'none';
  button.style.margin = '0';
  button.setAttribute('matMenuTriggerFor','#menu');
  button.innerHTML = `<i>CC</i>`;
  return button;
}
