/**
 * Token Validator
 * Valida que se usen tokens en lugar de valores hardcodeados
 */
import * as fs from 'fs';
import * as path from 'path';
interface TokenSchema {
  [key: string]: {
    token: string;
    value: string;
    description?: string;
    [key: string]: any;
  };
}
class TokenValidator {
  private tokensPath: string;
  private tokens: Map<string, string> = new Map();
  private tokensList: string[] = [];
  constructor(designSystemPath: string = './design-system') {
    this.tokensPath = path.join(designSystemPath, 'tokens');
    this.loadAllTokens();
  }
  /**
   * Carga todos los tokens desde los JSONs
   */
  private loadAllTokens(): void {
    const tokenFiles = [
      'colors.json',
      'typography.json',
      'spacing.json',
      'radius.json',
      'shadows.json'
    ];
    for (const file of tokenFiles) {
      const filePath = path.join(this.tokensPath, file);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.extractTokens(content);
      }
    }
    console.log(`✅ Loaded ${this.tokens.size} tokens`);
  }
  /**
   * Extrae tokens recursivamente de un objeto
   */
  private extractTokens(obj: any): void {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        const item = value as any;
        if (item.token) {
          // Es un token
          this.tokens.set(item.token, item.value);
          this.tokensList.push(item.token);
        } else if (!Array.isArray(value)) {
          // Continúa buscando recursivamente
          this.extractTokens(value);
        }
      }
    }
  }
  /**
   * Valida que un token existe
   */
  validateToken(tokenName: string): { valid: boolean; value?: string; error?: string } {
    if (this.tokens.has(tokenName)) {
      return { valid: true, value: this.tokens.get(tokenName) };
    }
    return {
      valid: false,
      error: `❌ Token "${tokenName}" not found`
    };
  }
  /**
   * Valida un valor CSS - sugiere si debería ser un token
   */
  validateCSSValue(value: string, property: string): { valid: boolean; suggestion?: string; warning?: string } {
    // Colores hardcodeados
    const colorRegex = /#[0-9a-f]{6}|rgb\\(/i;
    if (colorRegex.test(value) && (property.includes('color') || property.includes('background'))) {
      return {
        valid: false,
        suggestion: `Use color token instead of "${value}". Example: var(--color-background-brand)`
      };
    }
    // Espacios hardcodeados
    const spacingRegex = /^\\d+(px|em|rem)$/;
    if (spacingRegex.test(value) && (property.includes('padding') || property.includes('margin') || property.includes('gap'))) {
      const px = parseInt(value);
      if (px % 4 === 0) {
        return {
          valid: false,
          suggestion: `Use spacing token for "${value}". Example: var(--spacing-md)`
        };
      }
    }
    // Border radius hardcodeado
    if (spacingRegex.test(value) && property.includes('border-radius')) {
      return {
        valid: false,
        suggestion: `Use radius token for "${value}". Example: var(--radius-md)`
      };
    }
    return { valid: true };
  }
  /**
   * Obtiene lista de todos los tokens
   */
  getAllTokens(): string[] {
    return this.tokensList.sort();
  }
  /**
   * Obtiene valor de un token
   */
  getTokenValue(tokenName: string): string | null {
    return this.tokens.get(tokenName) || null;
  }
  /**
   * Genera reporte de tokens
   */
  generateReport(): string {
    const colorTokens = this.tokensList.filter(t => t.includes('color')).length;
    const spacingTokens = this.tokensList.filter(t => t.includes('spacing')).length;
    const radiusTokens = this.tokensList.filter(t => t.includes('radius')).length;
    const shadowTokens = this.tokensList.filter(t => t.includes('shadow')).length;
    const typographyTokens = this.tokensList.filter(t => t.includes('font') || t.includes('text')).length;
    const report = `
╔════════════════════════════════════════════╗
║      TOKEN VALIDATOR REPORT                ║
╚════════════════════════════════════════════╝
Total Tokens: ${this.tokensList.length}
By Category:
  • Colors:       ${colorTokens} tokens
  • Spacing:      ${spacingTokens} tokens
  • Radius:       ${radiusTokens} tokens
  • Shadows:      ${shadowTokens} tokens
  • Typography:   ${typographyTokens} tokens
Common Color Tokens:
  • var(--color-background-brand)    = ${this.tokens.get('--color-background-brand')}
  • var(--color-text-default)        = ${this.tokens.get('--color-text-default')}
  • var(--color-background-default)  = ${this.tokens.get('--color-background-default')}
Common Spacing Tokens:
  • var(--spacing-xs)  = ${this.tokens.get('--spacing-xs')}
  • var(--spacing-sm)  = ${this.tokens.get('--spacing-sm')}
  • var(--spacing-md)  = ${this.tokens.get('--spacing-md')}
  • var(--spacing-lg)  = ${this.tokens.get('--spacing-lg')}
    `;
    return report;
  }
}
export default TokenValidator;
// Uso:
if (require.main === module) {
  const validator = new TokenValidator();
  console.log(validator.generateReport());
  // Ejemplos de validación
  console.log('\\n--- Validating Tokens ---');
  console.log(validator.validateToken('--color-background-brand'));
  console.log(validator.validateToken('--invalid-token'));
  console.log('\\n--- Validating CSS Values ---');
  console.log(validator.validateCSSValue('#006dcc', 'background-color'));
  console.log(validator.validateCSSValue('16px', 'padding'));
  console.log(validator.validateCSSValue('8px', 'border-radius'));
}