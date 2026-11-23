/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const withOpacity = (cssVar) => `rgb(var(${cssVar}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        window: '960px',
        editorial: '760px',
      },
      fontFamily: {
        serif: ['var(--font-plus-jakarta)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-plus-jakarta)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-plus-jakarta)', ...defaultTheme.fontFamily.sans],
        primary: ['var(--font-plus-jakarta)', ...defaultTheme.fontFamily.sans],
        ui: ['var(--font-plus-jakarta)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      colors: {
        /* Core Editorial Minimalism Tokens */
        canvas: withOpacity('--rgb-canvas'),
        surface: withOpacity('--rgb-surface'),
        'surface-elevated': withOpacity('--rgb-surface-elevated'),
        subtle: withOpacity('--rgb-subtle'),
        hover: withOpacity('--rgb-hover'),

        ink: withOpacity('--rgb-ink'),
        body: withOpacity('--rgb-body'),
        muted: withOpacity('--rgb-muted'),
        disabled: withOpacity('--rgb-disabled'),

        hairline: withOpacity('--rgb-hairline'),
        'hairline-strong': withOpacity('--rgb-hairline-strong'),

        accent: withOpacity('--rgb-accent'),
        'accent-hover': withOpacity('--rgb-accent-hover'),
        'accent-soft': withOpacity('--rgb-accent-soft'),

        cta: withOpacity('--rgb-cta'),
        'cta-hover': withOpacity('--rgb-cta-hover'),
        'cta-fg': withOpacity('--rgb-cta-fg'),

        positive: withOpacity('--rgb-positive'),
        'positive-soft': withOpacity('--rgb-positive-soft'),
        warning: withOpacity('--rgb-warning'),
        'warning-soft': withOpacity('--rgb-warning-soft'),
        danger: withOpacity('--rgb-danger'),
        'danger-soft': withOpacity('--rgb-danger-soft'),

        /* Backward-compatible semantic aliases mapped to Dual Mode tokens */
        desk: withOpacity('--rgb-canvas'),
        'paper-white': withOpacity('--rgb-surface'),
        'cream-paper': withOpacity('--rgb-surface-elevated'),
        'soft-linen': withOpacity('--rgb-subtle'),
        'pale-stone': withOpacity('--rgb-hover'),

        'surface-card': withOpacity('--rgb-surface'),
        'surface-doc': withOpacity('--rgb-surface-elevated'),
        'surface-soft': withOpacity('--rgb-subtle'),
        'surface-dark': withOpacity('--rgb-code-bg'),

        'deep-moss': withOpacity('--rgb-ink'),
        'olive-char': withOpacity('--rgb-body'),
        'sage-gray': withOpacity('--rgb-muted'),
        'ash-green': withOpacity('--rgb-disabled'),

        'warm-mist': withOpacity('--rgb-hairline'),
        'hairline-soft': withOpacity('--rgb-hairline'),
        'faded-pewter': withOpacity('--rgb-hairline-strong'),

        'amber-glow': withOpacity('--rgb-cta'),
        'dark-amber': withOpacity('--rgb-cta-hover'),
        'burnished-gold': withOpacity('--rgb-muted'),
        marigold: withOpacity('--rgb-warning'),
        'flame-orange': withOpacity('--rgb-danger'),
        'moss-green': withOpacity('--rgb-positive'),
        'signal-blue': withOpacity('--rgb-accent'),

        'link-blue': withOpacity('--rgb-accent'),
        'accent-blue': withOpacity('--rgb-accent'),
        'accent-blue-soft': withOpacity('--rgb-accent-soft'),
        'accent-red': withOpacity('--rgb-danger'),
        'accent-red-soft': withOpacity('--rgb-danger-soft'),
        'accent-green': withOpacity('--rgb-positive'),
        'accent-green-soft': withOpacity('--rgb-positive-soft'),
        'accent-purple': '#7c44a6',
        'accent-purple-soft': '#e7d8ee',

        primary: {
          50: withOpacity('--rgb-surface-elevated'),
          100: withOpacity('--rgb-subtle'),
          200: withOpacity('--rgb-hover'),
          300: withOpacity('--rgb-hairline-strong'),
          400: withOpacity('--rgb-accent'),
          500: withOpacity('--rgb-accent'),
          600: withOpacity('--rgb-accent-hover'),
          700: withOpacity('--rgb-accent-hover'),
          800: withOpacity('--rgb-ink'),
          900: withOpacity('--rgb-ink'),
          950: withOpacity('--rgb-ink'),
          DEFAULT: withOpacity('--rgb-accent'),
          pressed: withOpacity('--rgb-accent-hover'),
          active: withOpacity('--rgb-accent-hover'),
        },
      },
      borderRadius: {
        none: '0px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        window: '12px',
        lg: '10px',
        xl: '14px',
        full: '9999px',
        button: '6px',
        card: '10px',
        nav: '8px',
      },
      boxShadow: {
        none: 'none',
        subtle: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'subtle-2': '0 4px 16px -4px rgb(0 0 0 / 0.06)',
        'nav-glow': 'none',
        xl: '0 20px 50px -12px rgb(0 0 0 / 0.25)',
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
        wave: 'wave 2.5s infinite',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14.0deg)' },
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg)' },
          '40%': { transform: 'rotate(-4.0deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
    },
  },
  plugins: [],
};
