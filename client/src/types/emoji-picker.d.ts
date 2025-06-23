// types/emoji-picker.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "emoji-picker": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      class?: string; // Allow 'class' attribute instead of 'className'
    };
  }
}