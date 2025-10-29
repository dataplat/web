module.exports = {
  content: [
    "./themes/dbatools2025/layouts/**/*.html",
    "./content/**/*.md"
  ],
  theme: {
    extend: {
      colors: {
        // GitHub Light Theme Colors
        primary: {
          DEFAULT: '#0969da',
          hover: '#0860ca',
          active: '#0757ba',
        },
        accent: {
          DEFAULT: '#8250df',
          blue: '#0969da',
          green: '#1f883d',
          red: '#cf222e',
          orange: '#bc4c00',
          purple: '#8250df',
          pink: '#bf3989',
          yellow: '#9a6700',
        },
        success: {
          DEFAULT: '#1a7f37',
          emphasis: '#1f883d',
          muted: '#dafbe1',
        },
        danger: {
          DEFAULT: '#d1242f',
          emphasis: '#cf222e',
        },
        attention: {
          DEFAULT: '#9a6700',
          muted: '#fff8c5',
        },
        severe: {
          DEFAULT: '#bc4c00',
        },
        sponsors: {
          DEFAULT: '#bf3989',
        },
        // Semantic theme colors
        theme: {
          bg: {
            DEFAULT: '#ffffff',
            secondary: '#f6f8fa',
            muted: '#f6f8fa',
            emphasis: '#25292e',
          },
          card: {
            DEFAULT: '#f6f8fa',
          },
          border: {
            DEFAULT: '#d1d9e0',
            emphasis: '#818b98',
          },
          text: {
            DEFAULT: '#1f2328',
            secondary: '#59636e',
            muted: '#59636e',
          }
        },
        // Data visualization colors
        data: {
          blue: '#006edb',
          green: '#30a147',
          red: '#df0c24',
          orange: '#eb670f',
          purple: '#894ceb',
          pink: '#ce2c85',
          yellow: '#b88700',
          gray: '#808fa3',
        },
        // PowerShell terminal colors (VS Code inspired)
        ps: {
          bg: '#070825',
          prompt: '#569cd6',
          path: '#929292',
          command: '#fcee54',
          comment: '#608b4e',
          property: '#9cdcfe',
          value: '#ce9178',
          output: '#b5becf',
          success: '#4ec9b0',
          error: '#f48771',
          warning: '#dcdcaa',
          header: '#b5becf',
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
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
