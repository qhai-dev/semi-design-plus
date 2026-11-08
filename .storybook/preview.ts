import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const previewObj: Preview = {
  parameters: {
    "@storybook/addon-themes": {
      default: "light",
      list: [
        { name: "light", class: "", color: "#ffffff" },
        { name: "dark", class: "dark", color: "#16161a" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      // Audit every story. Disabled rules are deliberate:
      // - color-contrast: the 1:1 Semi palette (e.g. white on danger #F93920)
      //   intentionally sits below axe's ratio.
      // - label-content-name-mismatch: react-day-picker renders day numbers
      //   ("27") with a full-date aria-label — a known axe false positive.
      // - nested-interactive: Base UI combobox/select composition nests a
      //   clear button inside the trigger by design.
      // - scrollable-region-focusable / aria-required-children: cmdk's
      //   internal listbox structure is not ours to restructure.
      test: "error",
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "label-content-name-mismatch", enabled: false },
          { id: "nested-interactive", enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
          { id: "aria-required-children", enabled: false },
          { id: "aria-hidden-focus", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
};

export default previewObj;
