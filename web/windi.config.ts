import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  extract: {
    include: ['*/**/*.{vue,js,ts,jsx,tsx}'],
    exclude: ['./.nuxt'],
  },
  attributify: true,
  preflight: true,
  theme: {
    screens: {
      sm: '375px',
      md: '640px',
      lg: '1024px',
      '3lg': '1368px',
      xl: '1440px',
      xxl: '1920px',
    },
    fontFamily: {
      sans: ['Titillium Web', ...defaultTheme.fontFamily.sans],
      nekst: ['FONTSPRING DEMO - Nekst', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'stars-bg': "url('/assets/backgrounds/dull-star-bg.png')",
        'blurry-bg': "url('/assets/backgrounds/color-blurry.png')",
        'line-bg': "url('/assets/backgrounds/line-bg.png')",
        'info-cards-bg': "url('/assets/backgrounds/info-cards-bg.png')",
      },
      colors: {
        primary: '#03E287',
        'primary-100': '#F3EFFE',
        'primary-200': '#E8DFFD',
        'primary-300': '#DCCEFC',
        'primary-400': '#D0BEFB',
        'primary-500': '#C4AEFA',
        'primary-600': '#B99EF9',
        'primary-700': '#AD8DF8',
        'primary-800': '#A17DF7',
      },
    },
  },
  shortcuts: {
    'header-1':
      'to-primary-800 bg-gradient-to-b from-white bg-clip-text text-[58px] text-transparent font-semibold leading-[73px]',
    'header-2': 'text-white text-[48px] font-light leading-[73px]',
    'header-1-mobile':
      'to-primary-800 bg-gradient-to-b from-white bg-clip-text text-[32px] leading-[38px] text-transparent font-semibold',
    'header-2-mobile': 'text-white text-[24px] leading-[38px] font-light',
    'strech-absolute': 'absolute top-0 bottom-0 right-0 left-0',
    labelLink: 'font-semibold text-primary-800',
  },
})
