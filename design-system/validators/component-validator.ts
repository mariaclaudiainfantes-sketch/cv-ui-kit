/**
 * Component Validator
 * Valida que los componentes usados en el proyecto existan en el catálogo
 */
import * as fs from 'fs';
import * as path from 'path';
interface ComponentSchema {
  name: string;
  description: string;
  props: Record<string, any>;
  variants: string[];
  [key: string]: any;
}
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  components: {
    found: string[];
    notFound: string[];
  };
}
class ComponentValidator {
  private componentsPath: string;
  private allowedComponents: Map<string, ComponentSchema> = new Map();
  constructor(designSystemPath: string = './design-system') {
    this.componentsPath = path.join(designSystemPath, 'components');
    this.loadAllComponents();
  }
  /**
   * Carga todos los componentes desde los JSONs
   */
  private loadAllComponents(): void {
    const componentFiles = [
      'loaders.json',
      'cards.json',
      'components.json',
      'forms.json',
      'layout.json',
      'score.json'
    ];
    for (const file of componentFiles) {
      const filePath = path.join(this.componentsPath, file);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.extractComponents(content);
      }
    }
    console.log(`✅ Loaded ${this.allowedComponents.size} components`);
  }
  /**
   * Extrae componentes de un objeto JSON
   */
  private extractComponents(obj: any, parentKey: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && 'props' in value) {
        // Es un componente
        this.allowedComponents.set(key, value as ComponentSchema);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Continúa buscando en objetos anidados
        this.extractComponents(value, key);
      }
    }
  }
  /**
   * Valida que un componente existe en el catálogo
   */
  validateComponent(componentName: string): { valid: boolean; error?: string } {
    if (this.allowedComponents.has(componentName)) {
      return { valid: true };
    }
    return {
      valid: false,
      error: `❌ Component "${componentName}" not found in catalog. Did you mean one of: ${Array.from(this.allowedComponents.keys()).slice(0, 5).join(', ')}`
    };
  }
  /**
   * Valida las props de un componente
   */
  validateComponentProps(componentName: string, props: Record<string, any>): { valid: boolean; errors: string[] } {
    const component = this.allowedComponents.get(componentName);
    if (!component) {
      return { valid: false, errors: [`Component "${componentName}" not found`] };
    }
    const errors: string[] = [];
    const allowedProps = Object.keys(component.props || {});
    for (const propName of Object.keys(props)) {
      if (!allowedProps.includes(propName) && propName !== 'className' && propName !== 'style') {
        errors.push(`⚠️  Unknown prop "${propName}" on component "${componentName}". Allowed: ${allowedProps.join(', ')}`);
      }
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  /**
   * Valida variantes de un componente
   */
  validateVariant(componentName: string, variant: string): { valid: boolean; error?: string } {
    const component = this.allowedComponents.get(componentName);
    if (!component) {
      return { valid: false, error: `Component "${componentName}" not found` };
    }
    if (!component.variants || component.variants.length === 0) {
      return { valid: true }; // Sin variantes definidas
    }
    if (component.variants.includes(variant)) {
      return { valid: true };
    }
    return {
      valid: false,
      error: `❌ Invalid variant "${variant}" for component "${componentName}". Allowed: ${component.variants.join(', ')}`
    };
  }
  /**
   * Obtiene info completa de un componente
   */
  getComponentInfo(componentName: string): ComponentSchema | null {
    return this.allowedComponents.get(componentName) || null;
  }
  /**
   * Lista todos los componentes disponibles
   */
  getAllComponents(): string[] {
    return Array.from(this.allowedComponents.keys()).sort();
  }
  /**
   * Genera reporte de validación
   */
  generateReport(): string {
    const components = this.getAllComponents();
    const report = `
╔════════════════════════════════════════════╗
║     COMPONENT VALIDATOR REPORT             ║
╚════════════════════════════════════════════╝
Total Components: ${components.length}
Components by Category:
${this.getComponentsByCategory()}
All Components:
${components.map(c => `  • ${c}`).join('\\n')}
    `;
    return report;
  }
  private getComponentsByCategory(): string {
    const categories = ['loaders', 'cards', 'components', 'forms', 'layout', 'score'];
    const categoryMap = new Map<string, string[]>();
    for (const comp of this.allowedComponents.values()) {
      const cat = comp.category || 'unknown';
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat)!.push(comp.name);
    }
    return Array.from(categoryMap.entries())
      .map(([cat, comps]) => `  ${cat.toUpperCase()}: ${comps.length} components`)
      .join('\\n');
  }
}
export default ComponentValidator;
// Uso:
if (require.main === module) {
  const validator = new ComponentValidator();
  console.log(validator.generateReport());
  // Ejemplo de validación
  const result = validator.validateComponent('Button');
  console.log(result);
  const propsResult = validator.validateComponentProps('Button', {
    variant: 'primary',
    size: 'M',
    unknownProp: 'test'
  });
  console.log(propsResult);
}