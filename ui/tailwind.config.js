/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    boxShadow: {
      default: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    },
    dropShadow: {
      text: '0px 3px 1px rgba(0,0,0,0.5)',
    },
    fontFamily: {
      raleway: ['raleway'],
      poppins: ['poppins'],
    },
    fontWeight: {
      bold: 700,
      semiBold: 600,
      medium: 500,
      regular: 400,
      light: 300
    },
    extend: {
      textColor: {
        'white': "#FFF",
        'gray-placeholder': '#959595',
        'main-purple': '#6532D1',
      },
      borderColor: {
        'gray': '#DCDCDC',
        'main-purple': '#6532D1',
      },
      colors: {
        DEFAULT: '#6532D1',
        'label': '#2B2B2B',
        'title': '#1F1A20',
        'sub-title': '#332835',
        'purple-title': '#312A64',
        'purple-sub-title': '#9B96B6',
        'main-purple': '#6532D1',
        'transparent': 'rgba(101,50,209,0)',
        'purple-linear': '#6532D1',
        'purple-opacity': 'rgba(101, 50, 209, 0.6)',
        'gray-placeholder': '#959595',
        'main-gray': '#BDC0C9',
        'gray-icon': '#BDC0C9',
        'gray-modal': '#F6F7F8',
        'gray-arrow': '#B6B6B6',
        'gray-border': '#DCDCDC',
        'gray-header': '#808080',
        'green-chart': '#10AE96',
        'green-value': '#21D49F',
        'red-chart': '#FF5668',
        'red-value': '#FF5B6D',
        'red-action': 'rgba(255, 91, 109, 0.3)',
        'btn': 'rgba(101,50,209,0.9)',
        'btn-over': '#6532D1',
        'blue-marin': '#312A64',
        't-btn': '#fff',
        'white': '#fff',
      },
      fontSize: {
        headingOne: 48,
        headingTwo: 36,
        adminTitle: 28,
        brandName: 24,
        cryptoPrice: 24,
        titleComparator: 20,
        subTitle: 18,
        cryptoPourcentage: 18,
        footerTitle: 18,
        cryptoName: 18,
        cryptoIcon: 18,
        placeholder: 16,
        titleArticle: 16,
        headerLink: 16,
        label: 16,
        footerLink: 16,
        topArticle: 12,
        textArticle: 12,
        titleCardArticle: 16,
        dateArticle: 12,
        authorCardArticle: 12,
        cryptoInterval: 16,
        cryptoChain: 12,
      },
      padding: {
        'btn': '0.5rem',
        'btn-article': '0.3rem 1.75rem',
        'btn-sm': '0.5rem 1.75rem',
        'btn-lg': '0.9rem 3rem',
        'btn-xl': '1rem 3rem',
        'btn-full': '0.5rem',
      },
      width: {
        'btn': 'fit-content',
      },
      borderRadius: {
        'main': '0.375rem',
        'btn': '0.375rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
}
