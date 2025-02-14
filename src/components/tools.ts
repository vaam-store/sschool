import Alert from "editorjs-alert";
import ColorPicker from "editorjs-color-picker";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import { type ToolConstructable, type ToolSettings } from "@editorjs/editorjs";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import RawTool from "@editorjs/raw";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
import EJLaTeX from "editorjs-latex";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import AttachesTool from "@editorjs/attaches";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import EditorjsList from "@editorjs/list";
import AIText from "@alkhipce/editorjs-aitext";

export interface ToolOptions {
  uploadFile: (file: File) => Promise<{ publicUrl: string }>;
  uploadFileByUrl: (fileUrl: string) => Promise<{ publicUrl: string }>;
}

export const makeTools: (
  options: ToolOptions,
) => Record<string, ToolConstructable | ToolSettings> = ({
  uploadFile,
  uploadFileByUrl,
}) => ({
  aiText: {
    // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
    // type ToolConstructable imported from @editorjs/editorjs package
    class: AIText,
    config: {
      // here you need to provide your own suggestion provider (e.g., request to your backend)
      // this callback function must accept a string and return a Promise<string>
      callback: (text: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("AI: " + text);
          }, 1000);
        });
      },
    },
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  raw: {
    class: RawTool,
    inlineToolbar: true,
  },
  underline: {
    class: Underline,
    inlineToolbar: true,
  },
  code: {
    class: CodeTool,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    inlineToolbar: true,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        uploadByFile: async (file: File) => {
          const { success, url } = await uploadFile(file)
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              // any other image data you want to store, such as width, height, color, extension, etc
            },
          };
        },
        uploadByUrl: async (fileUrl: string) => {
          const { success, url } = await uploadFileByUrl(fileUrl)
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              // any other image data you want to store, such as width, height, color, extension, etc
            },
          };
        },
      },
    },
  },
  attaches: {
    class: AttachesTool,
    inlineToolbar: true,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          const { success, url } = await uploadFile(file)
            .then(({ publicUrl: url }) => ({ url, success: 1 }))
            .catch((err) => ({ url: undefined, success: 0, err }));
          return {
            success,
            file: {
              url,
              name: file.name,
              size: file.size,
              extension: file.type,
            },
          };
        },
      },
    },
  },
  list: {
    class: EditorjsList as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
    },
  },
  Math: {
    class: EJLaTeX,
    shortcut: "CMD+SHIFT+L",
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        github: true,
        codepen: true,
      },
    },
  },
  table: {
    class: Table as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+A",
    config: {
      alertTypes: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "light",
        "dark",
      ],
      defaultType: "primary",
      messagePlaceholder: "Enter something",
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+I",
  },
  Marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  ColorPicker: {
    class: ColorPicker as unknown as ToolConstructable,
  },
  paragraph: {
    class: Paragraph as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  header: {
    class: Header as unknown as ToolConstructable,
    shortcut: "CMD+SHIFT+H",
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+W",
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
});
