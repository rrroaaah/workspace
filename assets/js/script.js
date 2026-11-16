import 'vazirmatn/Vazirmatn-font-face.css'
import '../scss/style.scss'

const root = document.documentElement
const $ = (s) => document.querySelector(s)
const themeBtn = $('#themeBtn')
const menuBtn = $('#menuBtn')
const menu = $('#menu')

// تم تیره / روشن
const setTheme = (t) => {
  root.dataset.theme = t
  try { localStorage.setItem('theme', t) } catch (e) {}
  themeBtn.querySelector('use').setAttribute('href', t === 'dark' ? '#i-moon' : '#i-sun')
}
setTheme(root.dataset.theme || 'dark')
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'))

// منوی موبایل
const toggleMenu = (open) => {
  menu.classList.toggle('open', open)
  menuBtn.setAttribute('aria-expanded', String(open))
}
menuBtn.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')))
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    menu.querySelectorAll('a').forEach((x) => x.classList.remove('active'))
    a.classList.add('active')
    toggleMenu(false)
  })
)

// سایه هدر هنگام اسکرول
const header = $('.site-header')
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10)
onScroll()
addEventListener('scroll', onScroll, { passive: true })

// تیلت کارت با حرکت ماوس
const tilt = $('#tilt')
if (matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
  addEventListener('pointermove', (e) => {
    tilt.style.setProperty('--ry', `${(e.clientX / innerWidth - 0.5) * 10}deg`)
    tilt.style.setProperty('--rx', `${-(e.clientY / innerHeight - 0.5) * 10}deg`)
  })
}
