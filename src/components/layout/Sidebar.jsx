import { AudioWaveform, LayoutDashboard, ClipboardCheck, BookOpen, Guitar, ChevronRight, Sparkles, GraduationCap } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const links = [
  { id: 'home', label: 'overview', icon: LayoutDashboard },
  { id: 'assessment', label: 'assessment', icon: ClipboardCheck },
  { id: 'learn', label: 'learn', icon: GraduationCap },
  { id: 'curriculum', label: 'curriculum', icon: BookOpen },
  { id: 'practice', label: 'practice', icon: Guitar },
]

export default function Sidebar({ page, onNavigate }) {
  const { t } = useLanguage()
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-white/[.06] bg-[#0d0f15] px-4 py-6 lg:flex">
      <button onClick={() => onNavigate('home')} className="mb-10 flex items-center gap-3 px-2 text-left">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-[#17130a] shadow-lg shadow-amber-500/15"><AudioWaveform size={22}/></div>
        <div><div className="text-lg font-bold tracking-tight">fretwise<span className="text-amber-400">.</span></div><div className="text-[10px] uppercase tracking-[.2em] text-zinc-600">Play beyond the patterns</div></div>
      </button>
      <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">{t('workspace')}</div>
      <nav className="space-y-1">
        {links.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${page === id ? 'bg-amber-400/10 font-medium text-amber-300' : 'text-zinc-500 hover:bg-white/[.04] hover:text-zinc-200'}`}><Icon size={17}/>{t(label)}{page === id && <ChevronRight className="ml-auto" size={14}/>}</button>)}
      </nav>
      <div className="mt-auto rounded-2xl border border-amber-400/15 bg-gradient-to-br from-amber-400/[.10] to-transparent p-4">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300"><Sparkles size={16}/></div>
        <p className="text-sm font-semibold text-zinc-200">{t('findBreakthrough')}</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">{t('focusedPractice')}</p>
        <button onClick={() => onNavigate('assessment')} className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200">{t('checkSkills')} <ChevronRight size={13}/></button>
      </div>
      <div className="mt-5 flex items-center gap-2 px-2 text-[11px] text-zinc-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> {t('prototype')}</div>
    </aside>
  )
}
