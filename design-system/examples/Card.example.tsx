/**
 * Card Component Examples
 */
import React from 'react';
import { Card, Button, Badge, Icon } from '@npm_leadtech/cv-ui-kit';
export function BasicCardExample() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>This is the card content</p>
    </Card>
  );
}
export function CardVariantsExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
      <Card variant="default">
        <h3>Default</h3>
        <p>Default card variant</p>
      </Card>
      <Card variant="elevated">
        <h3>Elevated</h3>
        <p>Card with shadow</p>
      </Card>
      <Card variant="outlined">
        <h3>Outlined</h3>
        <p>Card with border</p>
      </Card>
    </div>
  );
}
export function ProductCardExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)' }}>
      <Card
        style={{
          padding: 'var(--spacing-lg)',
          textAlign: 'center'
        }}
      >
        <img
          src="https://via.placeholder.com/200"
          alt="Product"
          style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }}
        />
        <h3>Product Name</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>$99.99</p>
        <Button variant="primary" fullWidth>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
}
export function CardWithActionsExample() {
  return (
    <Card style={{ padding: 'var(--spacing-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3>Task Title</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>Description here</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-sm)' }}>
        <Button variant="primary" size="S">
          Edit
        </Button>
        <Button variant="secondary" size="S">