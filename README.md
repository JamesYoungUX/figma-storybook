# Figma CSS to Storybook - Proof of Concept

This project demonstrates how design tokens extracted from Figma can be converted to CSS custom properties and documented in Storybook.

## Overview

This proof of concept shows the complete workflow:

1. **Design Tokens** - CSS custom properties representing design decisions (colors, typography, spacing, shadows, etc.)
2. **Components** - Reusable UI components built using the design tokens
3. **Storybook** - Interactive documentation and component showcase

## Getting Started

### Installation

```bash
npm install
```

### Running Storybook

```bash
npm run storybook
```

This will start Storybook at [http://localhost:6006](http://localhost:6006)

### Running the Vite Dev Server

```bash
npm run dev
```

This will start the Vite development server at [http://localhost:5173](http://localhost:5173)

### Importing Design Tokens from GitHub

You can import design tokens from your GitHub repository or any URL:

```bash
# From GitHub (public repo)
npm run import-tokens https://raw.githubusercontent.com/USERNAME/REPO/main/tokens.json

# From local file
npm run import-tokens path/to/tokens.json

# Using GitHub API (for private repos)
# 1. Copy .env.example to .env
# 2. Add your GitHub token and repo details
# 3. Run:
npm run fetch-tokens
```

**📖 For detailed instructions, see [IMPORTING_TOKENS.md](./IMPORTING_TOKENS.md)**


## Project Structure

```
├── .storybook/          # Storybook configuration
│   ├── main.js          # Main Storybook config
│   └── preview.js       # Preview configuration
├── src/
│   ├── components/      # UI Components
│   │   ├── Button.js
│   │   ├── button.css
│   │   ├── Button.stories.js
│   │   ├── Card.js
│   │   ├── card.css
│   │   └── Card.stories.js
│   ├── design-tokens.css    # Design tokens as CSS custom properties
│   └── DesignTokens.mdx     # Design tokens documentation
└── package.json
```

## Design Tokens

All design tokens are defined in `src/design-tokens.css` as CSS custom properties:

- **Colors**: Primary, secondary, semantic colors (success, warning, error)
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale (xs to 2xl)
- **Border Radius**: Rounded corner options
- **Shadows**: Elevation levels (sm to xl)

## Components

### Button

A flexible button component with multiple variants and sizes:
- **Variants**: primary, secondary, success, warning, error, outline
- **Sizes**: small, medium, large

### Card

A card component demonstrating elevation and content layout:
- **Elevations**: sm, md, lg, xl
- **Optional image support**

## Workflow: Figma to Storybook

1. **Extract Design Tokens from Figma**
   - Use Figma API or plugins to extract design tokens
   - Convert to JSON format

2. **Convert to CSS Custom Properties**
   - Transform JSON tokens to CSS variables
   - Organize by category (colors, typography, spacing, etc.)

3. **Build Components**
   - Create reusable components using the design tokens
   - Ensure consistency across the design system

4. **Document in Storybook**
   - Create stories for each component
   - Showcase all variants and states
   - Add interactive controls

## Building for Production

### Build Storybook

```bash
npm run build-storybook
```

This creates a static build of Storybook in the `storybook-static` folder.

### Build Vite App

```bash
npm run build
```

## Next Steps

To integrate this with your Figma-to-CSS workflow:

1. **Automate Token Extraction**: Create a script to fetch design tokens from Figma API
2. **Token Transformation**: Build a converter that transforms Figma tokens to CSS custom properties
3. **Component Generation**: Optionally generate component templates based on Figma components
4. **CI/CD Integration**: Automate Storybook deployment when design tokens are updated

## Technologies Used

- **Vite** - Fast build tool and dev server
- **Storybook** - Component documentation and development environment
- **HTML/CSS/JavaScript** - Vanilla web technologies (no framework dependencies)

## License

MIT
