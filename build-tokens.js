import StyleDictionary from 'style-dictionary';

console.log('🎨 Building design tokens from GitHub...\n');

// Custom format for CSS variables
StyleDictionary.registerFormat({
    name: 'css/variables',
    format: function ({ dictionary }) {
        return `/* Design Tokens - Auto-generated from GitHub */
/* Repository: jamesyoung-tech/tokens-test */
/* Generated: ${new Date().toLocaleString()} */

:root {
${dictionary.allTokens.map(token => `  --${token.name}: ${token.value};`).join('\n')}
}

/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--typography-font-family-base, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: var(--typography-font-size-base, 1rem);
  line-height: 1.5;
  color: var(--colors-text, #111827);
  background-color: var(--colors-background, #ffffff);
}
`;
    }
});

// Build configuration
const config = {
    source: ['tokens/design-tokens.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'src/',
            files: [{
                destination: 'design-tokens.css',
                format: 'css/variables'
            }]
        }
    }
};

const StyleDictionaryExtended = StyleDictionary.extend(config);
StyleDictionaryExtended.buildAllPlatforms();

console.log('✅ Design tokens built successfully!');
console.log('📁 Output: src/design-tokens.css');
console.log('\n💡 Storybook will hot-reload with your new tokens!\n');
