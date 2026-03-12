/**
 * Button Component Examples
 * Demonstrates all Button variants and usage patterns
 */
import React from 'react';
import { Button, Icon } from '@npm_leadtech/cv-ui-kit';
export function ButtonPrimaryExample() {
  return (
    <Button variant="primary" size="M">
      Click me
    </Button>
  );
}
export function ButtonVariantsExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
      <Button variant="primary" size="M">
        Primary
      </Button>
      <Button variant="secondary" size="M">
        Secondary
      </Button>
      <Button variant="gradient" size="M">
        Gradient
      </Button>
    </div>
  );
}
export function ButtonSizesExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
      <Button variant="primary" size="S">
        Small
      </Button>
      <Button variant="primary" size="M">
        Medium
      </Button>
    </div>
  );
}
export function ButtonWithIconExample() {
  return (
    <Button variant="primary" size="M">
      <Icon name="plus" size="sm" />
      Add Item
    </Button>
  );
}
export function ButtonShapesExample() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
      <Button variant="primary" size="M" shape="square">
        Square
      </Button>
      <Button variant="primary" size="M" shape="rounded">
        Rounded
      </Button>
    </div>
  );
}
export function ButtonFullWidthExample() {
  return (
    <Button variant="primary" fullWidth>
      Submit Form
    </Button>
  );
}
export function ButtonStatesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" loading>
        Loading
      </Button>
    </div>
  );
}
export function ButtonOnClickExample() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div>
      <Button
        variant="primary"
        onClick={() => setClicked(true)}
      >
        Click me
      </Button>
      {clicked && <p>✅ Button was clicked!</p>}
    </div>
  );
}