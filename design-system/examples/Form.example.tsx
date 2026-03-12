/**
 * Complete Form Example
 * Shows how to build forms using multiple components
 */
import React from 'react';
import {
  Textfield,
  Button,
  Select,
  Checkbox,
  RadioButton,
  Switch,
  Card
} from '@npm_leadtech/cv-ui-kit';
interface FormData {
  name: string;
  email: string;
  country: string;
  jobTitle: string;
  newsletter: boolean;
  notifications: boolean;
}
export function CompleteFormExample() {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    email: '',
    country: '',
    jobTitle: '',
    newsletter: false,
    notifications: false
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.country) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };
  return (
    <Card
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: 'var(--spacing-lg)'
      }}
    >
      <h1
        style={{
          color: 'var(--color-text-default)',
          marginBottom: 'var(--spacing-lg)'
        }}
      >
        User Registration
      </h1>
      {submitted && (
        <div
          style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--color-background-weakest)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--color-text-system-success)'
          }}
        >
          ✅ Form submitted successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Textfield
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          error={!!errors.name}
          errorMessage={errors.name}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        {/* Email Field */}
        <Textfield
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          error={!!errors.email}
          errorMessage={errors.email}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        {/* Country Select */}
        <Select
          label="Country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          options={[
            { value: '', label: 'Select a country' },
            { value: 'us', label: 'United States' },
            { value: 'mx', label: 'Mexico' },
            { value: 'es', label: 'Spain' },
            { value: 'ar', label: 'Argentina' }
          ]}
          error={!!errors.country}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        {/* Job Title - Radio Buttons */}
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <p style={{ color: 'var(--color-text-default)', marginBottom: 'var(--spacing-sm)' }}>
            Job Title
          </p>
          <RadioButton
            name="jobTitle"
            value="developer"
            label="Developer"
            checked={formData.jobTitle === 'developer'}
            onChange={() => setFormData({ ...formData, jobTitle: 'developer' })}
          />
          <RadioButton
            name="jobTitle"
            value="designer"
            label="Designer"
            checked={formData.jobTitle === 'designer'}
            onChange={() => setFormData({ ...formData, jobTitle: 'designer' })}
          />
        </div>
        {/* Checkboxes */}
        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
          style={{ marginBottom: 'var(--spacing-md)' }}
        />
        {/* Switch */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <Switch
            label="Enable notifications"
            checked={formData.notifications}
            onChange={(e) => setFormData({ ...formData, notifications: e })}
          />
        </div>
        {/* Submit Button */}
        <Button variant="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
    </Card>
  );
}
export function SimpleFormExample() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  return (
    <Card style={{ padding: 'var(--spacing-lg)' }}>
      <Textfield
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 'var(--spacing-md)' }}
      />
      <Textfield
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 'var(--spacing-lg)' }}
      />
      <Button variant="primary">
        Submit
      </Button>
    </Card>
  );
}