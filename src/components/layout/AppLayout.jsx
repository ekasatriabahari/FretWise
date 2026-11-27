import Sidebar from './Sidebar'
import { AudioWaveform, Bell, Search, Command, LayoutDashboard, ClipboardCheck, BookOpen, Guitar } from 'lucide-react'

const mobileLinks = [
  { id: 'home', label: 'Home', icon: LayoutDashboard },
  { id: 'assessment', label: 'Assess', icon: ClipboardCheck },
  { id: 'curriculum', label: 'Plan', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Guitar },
]

export default function AppLayout({ page, onNavigate, children }) {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100">
      <Sidebar page={page} onNavigate={onNavigate} />
      <div className="min-h-screen pb-20 lg:pb-0 lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[.06] bg-[#090b10]/85 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-2">
            <div className="mr-1 grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-[#17130a] lg:hidden"><AudioWaveform size={18}/></div>
            <span className="hidden text-sm text-zinc-500 sm:inline">Workspace</span><span className="hidden text-sm text-zinc-700 sm:inline">/</span><span className="text-sm font-medium capitalize text-zinc-200">{page === 'home' ? 'Overview' : page}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2 text-xs text-zinc-500 sm:flex"><Search size={14}/> Search <kbd className="ml-5 flex items-center gap-1 rounded bg-white/[.06] px-1.5 py-1"><Command size={10}/> K</kbd></button>
            <button aria-label="Notifications" className="rounded-lg p-2 text-zinc-400 hover:bg-white/[.06] hover:text-white"><Bell size={18}/></button>
            <div className="grid h-8 w-8 place-items-center rounded-full border border-amber-400/30 bg-amber-400/10 text-xs font-semibold text-amber-300">ES</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-white/[.08] bg-[#0d0f15]/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-xl lg:hidden">
        {mobileLinks.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onNavigate(id)} className={`flex flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] transition ${page === id ? 'text-amber-300' : 'text-zinc-500'}`}><Icon size={18}/>{label}</button>)}
      </nav>
    </div>
  )
}
