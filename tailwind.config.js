module.exports = {
  content: [
    "./themes/dbatools2025/layouts/**/*.html",
    "./content/**/*.md"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#045BDB',
          dark: '#0B234A',
        },
        accent: {
          red: '#FF5F56',
          yellow: '#FFBD2E',
          green: '#27C93F',
        },
        // Default theme colors
        theme: {
          bg: {
            DEFAULT: '#FFFFFF',
            dark: '#0E1A2F',
          },
          card: {
            DEFAULT: '#F8F9FA',
            dark: '#0B234A',
          },
          border: {
            DEFAULT: '#C5D1E3',
            dark: '#273B59',
          },
          text: {
            DEFAULT: '#0E1A2F',
            secondary: '#273B59',
            dark: '#FFFFFF',
            'secondary-dark': '#C5D1E3',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '1400px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'soft': '0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)',
        'soft-lg': '0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)',
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.theme.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.theme.text.DEFAULT'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.theme.text.DEFAULT'),
            '--tw-prose-counters': theme('colors.theme.text.secondary'),
            '--tw-prose-bullets': theme('colors.theme.text.secondary'),
            '--tw-prose-hr': theme('colors.theme.border.DEFAULT'),
            '--tw-prose-quotes': theme('colors.theme.text.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.theme.border.DEFAULT'),
            '--tw-prose-code': '#D63384',
            '--tw-prose-pre-code': theme('colors.theme.text.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.theme.card.DEFAULT'),
            'code': {
              backgroundColor: theme('colors.theme.card.DEFAULT'),
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre': {
              backgroundColor: theme('colors.theme.card.DEFAULT'),
              border: `1px solid ${theme('colors.theme.border.DEFAULT')}`,
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            'blockquote': {
              fontStyle: 'normal',
              borderLeftColor: theme('colors.primary.DEFAULT'),
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            'a': {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.theme.text.dark'),
            '--tw-prose-headings': theme('colors.theme.text.dark'),
            '--tw-prose-links': '#60A5FA',
            '--tw-prose-bold': theme('colors.theme.text.dark'),
            '--tw-prose-counters': theme('colors.theme.text.secondary-dark'),
            '--tw-prose-bullets': theme('colors.theme.text.secondary-dark'),
            '--tw-prose-hr': theme('colors.theme.border.dark'),
            '--tw-prose-quotes': theme('colors.theme.text.dark'),
            '--tw-prose-quote-borders': theme('colors.theme.border.dark'),
            '--tw-prose-code': '#F472B6',
            '--tw-prose-pre-code': '#E5E7EB',
            '--tw-prose-pre-bg': '#1F2937',
            'code': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre': {
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: '#E5E7EB',
            },
            'blockquote': {
              fontStyle: 'normal',
              borderLeftColor: '#60A5FA',
            },
            'blockquote p:first-of-type::before': {
              content: '""',
            },
            'blockquote p:last-of-type::after': {
              content: '""',
            },
            'a': {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
