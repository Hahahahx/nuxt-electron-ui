import type { Config } from 'tailwindcss'

import animate from 'tailwindcss-animate'
import scrollbar from 'tailwind-scrollbar'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import containerQueries from '@tailwindcss/container-queries'

export default <Partial<Config>> {
  darkMode: ['class'],
  safelist: [
    'dark',
    '-translate-1/2',

    'bg-slate-500',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-sky-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-orange-500',
    'bg-yellow-500',
  ],
  prefix: '',

  content: [
    'docs/content/**/*.md',
  ],
  plugins: [animate, forms, aspectRatio, scrollbar, typography, containerQueries],
}
