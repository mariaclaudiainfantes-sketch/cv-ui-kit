# Design System Documentation
Este directorio contiene toda la documentación del Design System CV UI Kit.
## 📁 Estructura
### `tokens/` - Design Tokens
Sistema de valores de diseño reutilizables.
- **colors.json** - Tokens de color (background, text, border, icons, fill)
- **typography.json** - Estilos de tipografía (font families, weights)
- **spacing.json** - Sistema de espaciado (4px base)
- **radius.json** - Border radius values
- **shadows.json** - Sombras y elevaciones
### `components/` - Componentes
Catálogo completo de componentes disponibles.
- **loaders.json** - Componentes de carga (AISpinner, CircularProgress, LoadingSteps)
- **cards.json** - Componentes de tarjetas (8 variantes)
- **components.json** - Componentes generales (Badge, Button, Dialog, etc.)
- **forms.json** - Componentes de formularios (Textfield, Select, Checkbox, etc.)
- **layout.json** - Componentes de layout (ContentHeader)
- **score.json** - Componentes de puntuación (ScoreCard, ScoreProgress, etc.)
## 🎯 Cómo usar estos archivos
### En Claude Code
1. **Verifica si un componente existe:**
```javascript
   const components = require('./design-system/components/components.json');
   const button = components.Button;
```
2. **Valida props de un componente:**
```javascript
   const validProps = Object.keys(button.props);
   console.log(validProps); // ['variant', 'size', 'disabled', ...]
```
3. **Usa tokens en tu CSS:**
```css
   .myComponent {
     background-color: var(--color-background-brand);
     padding: var(--spacing-md);
     border-radius: var(--radius-md);
     color: var(--color-text-default);
   }
```
### En JavaScript/TypeScript
```typescript
import components from './design-system/components/index.json';
import tokens from './design-system/tokens/index.json';
// Obtener lista de todos los componentes
const allComponents = Object.values(components.categories)
  .flatMap(cat => cat.components);
// Obtener todos los colores
const colorTokens = require('./design-system/tokens/colors.json');
```
## ✅ Validación
Cada archivo JSON está validado contra su schema. Los validadores se encuentran en `/validators`.
Ejecuta validación:
```bash
npm run validate
```
## 📚 Referencia
- **Storybook**: https://storybooks.1eres.net/cv-ui-kit-storybook/
- **Repository**: https://github.com/tunombre/cv-ui-kit
- **Package**: @npm_leadtech/cv-ui-kit