declare module "editorjs-alert";
declare module "editorjs-undo" {
  export default class Undo {
    constructor(options: { editor: any });
    initialize(data: any): void;
  }
}
declare module "editorjs-drag-drop" {
  export default class DragDrop {
    constructor(editor: any);
  }
}
declare module "@editorjs/checklist";
declare module "@editorjs/attaches";
declare module "@editorjs/link";
declare module "@editorjs/embed";
declare module "editorjs-latex";
declare module "@editorjs/raw";
declare module "@editorjs/marker";
