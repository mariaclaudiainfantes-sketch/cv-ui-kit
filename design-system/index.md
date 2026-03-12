# Design System Index
## Tokens
- colors.json (40+ colores)
- typography.json (font families, weights)
- spacing.json (xs, sm, md, lg, xl, 2xl)
- radius.json (border radius values)
- shadows.json (elevation shadows)
## Components
- loaders.json (AISpinner, CircularProgress, LoadingSteps)
- cards.json (8 card components)
- components.json (17 general components)
- forms.json (Textfield, Select, Checkbox, etc.)
- layout.json (ContentHeader)
- score.json (Score-related components)
Total: 37 components, 5 token categories
```
---
## 🔧 ESTRUCTURA FINAL RECOMENDADA (LA QUE DEBERÍAS USAR)
```
cv-ui-kit/                          ← Tu repo en GitHub
│
├── storybook/                       ← ZIP extraído
│   ├── .storybook/
│   ├── src/
│   └── package.json
│
├── design-system/                   ← CARPETA DE TOKENS Y COMPONENTES
│   ├── tokens/
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── radius.json
│   │   └── shadows.json
│   ├── components/
│   │   ├── loaders.json
│   │   ├── cards.json
│   │   ├── components.json
│   │   ├── forms.json
│   │   ├── layout.json
│   │   └── score.json
│   ├── index.md                     ← Meta-información simple
│   └── README.md                    ← Instrucciones de uso
│
├── docs/                            ← DOCUMENTACIÓN
│   ├── SETUP.md
│   ├── DESIGN_SYSTEM.md
│   └── EXAMPLES.md
│
├── validators/                      ← SCRIPTS DE VALIDACIÓN (opcional)
│   ├── validate-components.ts
│   ├── validate-tokens.ts
│   └── compliance-report.ts
│
├── examples/                        ← EJEMPLOS DE USO (opcional)
│   ├── Button.example.tsx
│   ├── Form.example.tsx
│   └── README.md
│
├── claude.md                        ← GUÍA PRINCIPAL (EN LA RAÍZ)
├── package.json
├── README.md
└── .gitignore