/**
 * Textfield Component Examples
 * Demonstrates all Textfield variants and usage patterns
 */
import React from 'react';
import { Textfield, Icon } from '@npm_leadtech/cv-ui-kit';
export function TextfieldBasicExample() {
  const [value, setValue] = React.useState('');
  return (
    <Textfield
      label="Full Name"
      placeholder="Enter your name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
export function TextfieldTypesExample() {
  const [text, setText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <Textfield
        label="Text"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Textfield
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textfield
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
export function TextfieldWithValidationExample() {
  const [email, setEmail] = React.useState('');
  const isValidEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  return (
    <Textfield
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={email.length > 0 && !isValidEmail}
      errorMessage={email.length > 0 && !isValidEmail ? 'Invalid email format' : ''}
    />
  );
}
export function TextfieldWithHelpTextExample() {
  const [bio, setBio] = React.useState('');
  return (
    <Textfield
      label="Bio"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      placeholder="Tell us about yourself"
      assistiveText="Maximum 500 characters"
      maxLength={500}
    />
  );
}
export function TextfieldWithDecoratorExample() {
  const [password, setPassword] = React.useState('');
  return (
    <Textfield
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      prefix={<Icon name="lock" size="sm" />}
      suffix={<Icon name="eye" size="sm" />}
    />
  );
}
export function TextfieldMultilineExample() {
  const [description, setDescription] = React.useState('');
  return (
    <Textfield
      label="Description"
      multiline
      rows={4}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter a detailed description"
    />
  );
}
export function TextfieldDisabledExample() {
  return (
    <Textfield
      label="Disabled Field"
      value="This field is disabled"
      disabled
    />
  );
}
export function TextfieldStateExample() {
  const [email, setEmail] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const errors: Record<string, string> = {};
  if (touched && !email) {
    errors.email = 'Email is required';
  }
  if (touched && email && !email.includes('@')) {
    errors.email = 'Invalid email';
  }
  return (
    <Textfield
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => setTouched(true)}
      error={!!errors.email}
      errorMessage={errors.email}
    />
  );
}