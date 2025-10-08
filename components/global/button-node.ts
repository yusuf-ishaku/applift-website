import { Node, mergeAttributes } from "@tiptap/core";

export interface UiLinkOptions {
  HTMLAttributes: Partial<HTMLAnchorElement>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    uiLink: {
      insertUiLink: (attrs?: { class?: string }) => ReturnType;
    };
  }
}

export const UiLink = Node.create<UiLinkOptions>({
  name: "uiLink",
  group: "inline",
  inline: true,
  atom: false,
  content: "inline*", // Allows inline content (text, other marks/nodes) inside the link
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute("href"),
      },
      class: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[data-ui-link]",
        getAttrs: (el) => {
          if (typeof el === "string") return {};
          return {
            href: el.getAttribute("href") ?? undefined,
            class: el.getAttribute("data-class") ?? undefined,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(
        {
          "data-ui-link": "true",
          target: "_blank", // Open in new tab
          rel: "noopener noreferrer", // Security best practice
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
        { class: "tiptap-ui-link btn" },
      ),
      0,
    ];
  },

  addCommands() {
    return {
      insertUiLink:
        (attrs) =>
        ({ commands }) => {
          const href = window.prompt("Enter the URL for the link:");
          if (!href) {
            return false;
          }
          return commands.insertContent({
            type: this.name,
            attrs: { ...attrs, href },
            content: [{ type: "text", text: "Your Link Text" }],
          });
        },
    };
  },
});
