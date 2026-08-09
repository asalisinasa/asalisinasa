# Container Component Documentation

A flexible layout wrapper for constraining content width and providing consistent horizontal padding. The `Container` component is designed to help structure your UI by centering and containing its children within a maximum width, while allowing for custom styles and class names.

## Key Features

- Centers and constrains content to a maximum width
- Applies consistent horizontal padding
- Accepts custom class names and inline styles
- Forwards refs to the underlying `<div>`

## Usage

```tsx
import { Container } from "@repo/ui/container";

export default function Example() {
  return (
    <Container className="my-custom-class">
      <h1>Hello, world!</h1>
      <p>This content is centered and constrained.</p>
    </Container>
  );
}
```

## Props

| Name      | Type                         | Description                                  |
| --------- | ---------------------------- | -------------------------------------------- |
| children  | `React.ReactNode`            | Content to be rendered inside the container. |
| className | `string?`                    | Additional CSS class names to apply.         |
| style     | `React.CSSProperties?`       | Inline styles for the container.             |
| ref       | `React.Ref<HTMLDivElement>?` | Ref forwarded to the container div.          |
