import { Node, mergeAttributes} from "@tiptap/core";

export interface UiButtonOptions {
  HTMLAttributes: Partial<HTMLButtonElement>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    uiButton: {
      insertUiButton: (attrs: { label?: string; class?: string }) => ReturnType;
    };
  }
}

export const UiButton = Node.create<UiButtonOptions>({
  name: "uiButton",

  group: "inline",
  inline: true,
  atom: true,
  selectable: true,  // allow selecting the node

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      label: {
        default: "Button",
      },
      class: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "button[data-ui-button]",
        getAttrs: (el) => {
          return {
            label: el.getAttribute("data-label") ?? undefined,
            class: el.getAttribute("data-class") ?? undefined,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "button",
      mergeAttributes(
        { "data-ui-button": "true", "data-label": HTMLAttributes.label, "data-class": HTMLAttributes.class },
        this.options.HTMLAttributes,
        HTMLAttributes,
        { class: "tiptap-ui-button" }
      ),
      HTMLAttributes.label,
    ];
  },

  addCommands() {
    return {
      insertUiButton:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },

  addNodeView() {
    return (props) => {
      const { node } = props;

      const dom = document.createElement("button");
      dom.classList.add("tiptap-ui-button");
      if (node.attrs.class) {
        dom.classList.add(node.attrs.class);
      }
      dom.setAttribute("data-ui-button", "true");
      dom.setAttribute("data-label", node.attrs.label);
      dom.setAttribute("data-class", node.attrs.class || "");
      dom.textContent = node.attrs.label;

      // prevent editing inside
      dom.contentEditable = "false";

      // Return a minimal NodeView interface
      return {
        dom,
        update: (newNode) => {
          // If attributes change, update dom
          if (newNode.attrs.label !== node.attrs.label) {
            dom.textContent = newNode.attrs.label;
          }
          return true;
        },
      };
    };
  },
});
