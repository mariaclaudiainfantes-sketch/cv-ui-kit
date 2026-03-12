/**
 * Compliance Report Generator
 * Genera reporte completo de compliance del proyecto
 */
import * as fs from 'fs';
import * as path from 'path';
import ComponentValidator from './component-validator';
import TokenValidator from './token-validator';
interface ComplianceIssue {
  type: 'error' | 'warning' | 'info';
  file: string;
  line?: number;
  message: string;
}
class ComplianceReporter {
  private componentValidator: ComponentValidator;
  private tokenValidator: TokenValidator;
  private issues: ComplianceIssue[] = [];
  private sourcePath: string;
  constructor(sourcePath: string = './src', designSystemPath: string = './design-system') {
    this.sourcePath = sourcePath;
    this.componentValidator = new ComponentValidator(designSystemPath);
    this.tokenValidator = new TokenValidator(designSystemPath);
  }
  /**
   * Analiza archivos TSX/JSX en busca de issues de compliance
   */
  analyzeSourceFiles(): void {
    this.scanDirectory(this.sourcePath);
  }
  /**
   * Escanea recursivamente un directorio
   */
  private scanDirectory(dir: string): void {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // Skip node_modules y archivos ocultos
        if (!file.startsWith('.') && file !== 'node_modules') {
          this.scanDirectory(fullPath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        this.analyzeFile(fullPath);
      }
    }
  }
  /**
   * Analiza un archivo individual
   */
  private analyzeFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\\n');
    lines.forEach((line, index) => {
      // Buscar componentes sin importar
      this.checkComponentUsage(line, filePath, index + 1);
      // Buscar valores hardcodeados
      this.checkHardcodedValues(line, filePath, index + 1);
      // Buscar props inválidas
      this.checkInvalidProps(line, filePath, index + 1);
    });
  }
  /**
   * Verifica uso de componentes válidos
   */
  private checkComponentUsage(line: string, file: string, lineNum: number): void {
    // Busca <ComponentName
    const componentMatch = line.match(/<([A-Z][a-zA-Z0-9]*)/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      // Skip React imports
      if (['Fragment', 'Suspense', 'StrictMode'].includes(componentName)) return;
      const validation = this.componentValidator.validateComponent(componentName);
      if (!validation.valid) {
        this.addIssue({
          type: 'error',
          file,
          line: lineNum,
          message: `Unknown component: ${componentName}. Check if it's in design-system/components/`
        });
      }
    }
  }
  /**
   * Verifica valores hardcodeados
   */
  private checkHardcodedValues(line: string, file: string, lineNum: number): void {
    // Busca colores hexadecimales
    const colorMatch = line.match(/#[0-9a-f]{6}/gi);
    if (colorMatch) {
      this.addIssue({
        type: 'warning',
        file,
        line: lineNum,
        message: `Hardcoded color detected: ${colorMatch[0]}. Use color token instead (e.g., var(--color-background-brand))`
      });
    }
    // Busca espacios hardcodeados
    const spacingMatch = line.match(/\\b(\\d+)px\\b/g);
    if (spacingMatch) {
      for (const spacing of spacingMatch) {
        const px = parseInt(spacing);
        if (px % 4 === 0 && (line.includes('padding') || line.includes('margin') || line.includes('gap'))) {
          this.addIssue({
            type: 'warning',
            file,
            line: lineNum,
            message: `Hardcoded spacing detected: ${spacing}. Use spacing token (e.g., var(--spacing-md))`
          });
        }
      }
    }
  }
  /**
   * Verifica props inválidas (básico)
   */
  private checkInvalidProps(line: string, file: string, lineNum: number): void {
    // Este es un check muy básico - en producción necesitarías un AST parser
    const propMatch = line.match(/variant=["|']([a-z-]+)["|']/);
    if (propMatch) {
      const variant = propMatch[1];
      const componentMatch = line.match(/<([A-Z][a-zA-Z0-9]*)/);
      if (componentMatch) {
        const componentName = componentMatch[1];
        const validation = this.componentValidator.validateVariant(componentName, variant);
        if (!validation.valid) {
          this.addIssue({
            type: 'error',
            file,
            line: lineNum,
            message: validation.error || 'Invalid variant'
          });
        }
      }
    }
  }
  /**
   * Agrega un issue al reporte
   */
  private addIssue(issue: ComplianceIssue): void {
    this.issues.push(issue);
  }
  /**
   * Genera reporte completo
   */
  generateReport(): string {
    const errors = this.issues.filter(i => i.type === 'error');
    const warnings = this.issues.filter(i => i.type === 'warning');
    const infos = this.issues.filter(i => i.type === 'info');
    const report = `
╔═══════════════════════════════════════════════════════════╗
║          CV UI KIT - COMPLIANCE REPORT                    ║
╚═══════════════════════════════════════════════════════════╝
📊 SUMMARY
──────────────────────────────────────────────────────────
  Errors:    ${errors.length}
  Warnings:  ${warnings.length}
  Info:      ${infos.length}
  ───────────────
  Total:     ${this.issues.length}
${errors.length > 0 ? `\\n❌ ERRORS (${errors.length})\\n────────────────────────────────────────────────────────` + this.formatIssues(errors) : ''}
${warnings.length > 0 ? `\\n⚠️  WARNINGS (${warnings.length})\\n────────────────────────────────────────────────────────` + this.formatIssues(warnings) : ''}
${infos.length > 0 ? `\\n📝 INFO (${infos.length})\\n────────────────────────────────────────────────────────` + this.formatIssues(infos) : ''}
📈 STATS
────────────────────────────────────────────────────────
${this.componentValidator.generateReport()}
${this.tokenValidator.generateReport()}
✅ For compliance: Fix all errors and review warnings
    `;
    return report;
  }
  /**
   * Formatea issues para visualización
   */
  private formatIssues(issues: ComplianceIssue[]): string {
    return issues
      .map(issue => {
        const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
        return `  ${location}\\n    → ${issue.message}`;
      })
      .join('\\n\\n');
  }
  /**
   * Exporta reporte a JSON
   */
  exportJSON(outputPath: string): void {
    fs.writeFileSync(
      outputPath,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        totalIssues: this.issues.length,
        errors: this.issues.filter(i => i.type === 'error'),
        warnings: this.issues.filter(i => i.type === 'warning'),
        info: this.issues.filter(i => i.type === 'info')
      }, null, 2)
    );
  }
}
export default ComplianceReporter;
// Uso:
if (require.main === module) {
  const reporter = new ComplianceReporter('./src', './design-system');
  reporter.analyzeSourceFiles();
  console.log(reporter.generateReport());
  reporter.exportJSON('./compliance-report.json');
}