import Sidebar from './Sidebar'
import { AudioWaveform, Bell, Search, Command, LayoutDashboard, ClipboardCheck, BookOpen, Guitar, GraduationCap, Languages } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const mobileLinks = [
  { id: 'home', label: 'home', icon: LayoutDashboard },
  { id: 'assessment', label: 'assess', icon: ClipboardCheck },
  { id: 'learn', label: 'learn', icon: GraduationCap },
  { id: 'curriculum', label: 'plan', icon: BookOpen },
  { id: 'practice', label: 'practice', icon: Guitar },
]

const pageLabels = { home: 'overview', assessment: 'assessment', curriculum: 'curriculum', practice: 'practice', learn: 'learn' }

export default function AppLayout({ page, onNavigate, children }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100">
      <Sidebar page={page} onNavigate={onNavigate}/>
      <div className="min-h-screen pb-20 lg:pb-0 lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[.06] bg-[#090b10]/85 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-2">
            <div className="mr-1 grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-[#17130a] lg:hidden"><AudioWaveform size={18}/></div>
            <span className="hidden text-sm text-zinc-500 sm:inline">{t('workspace')}</span><span className="hidden text-sm text-zinc-700 sm:inline">/</span><span className="text-sm font-medium text-zinc-200">{t(pageLabels[page] ?? 'overview')}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 rounded-lg border border-white/[.08] bg-white/[.03] p-1" aria-label={t('language')}>
              <Languages size={14} className="mx-1 text-zinc-500"/>
              <button onClick={() => setLanguage('id')} aria-pressed={language === 'id'} className={`rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${language === 'id' ? 'bg-amber-400 text-[#17130a]' : 'text-zinc-500 hover:text-zinc-200'}`}>ID</button>
              <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={`rounded-md px-2 py-1.5 text-[10px] font-semibold transition ${language === 'en' ? 'bg-amber-400 text-[#17130a]' : 'text-zinc-500 hover:text-zinc-200'}`}>EN</button>
            </div>
            <button className="hidden items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2 text-xs text-zinc-500 sm:flex"><Search size={14}/> {t('search')} <kbd className="ml-5 flex items-center gap-1 rounded bg-white/[.06] px-1.5 py-1"><Command size={10}/> K</kbd></button>
            <button aria-label={t('notifications')} className="rounded-lg p-2 text-zinc-400 hover:bg-white/[.06] hover:text-white"><Bell size={18}/></button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-white/[.08] bg-[#0d0f15]/95 px-1 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-xl lg:hidden">
        {mobileLinks.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)} className={`flex flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] transition ${page === id ? 'text-amber-300' : 'text-zinc-500'}`}><Icon size={18}/>{t(label)}</button>)}
      </nav>
    </div>
  )
}
