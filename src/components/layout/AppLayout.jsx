import Sidebar from './Sidebar'
import { Bell, Search, Command } from 'lucide-react'

export default function AppLayout({ page, onNavigate, children }) {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100">
      <Sidebar page={page} onNavigate={onNavigate} />
      <div className="min-h-screen lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[.06] bg-[#090b10]/85 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500"><span className="hidden sm:inline">Workspace</span><span className="hidden sm:inline">/</span><span className="font-medium capitalize text-zinc-200">{page === 'home' ? 'Overview' : page}</span></div>
          <div className="flex items-center gap-3">
            <button className="hidden items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2 text-xs text-zinc-500 sm:flex"><Search size={14}/> Search <kbd className="ml-5 flex items-center gap-1 rounded bg-white/[.06] px-1.5 py-1"><Command size={10}/> K</kbd></button>
            <button aria-label="Notifications" className="rounded-lg p-2 text-zinc-400 hover:bg-white/[.06] hover:text-white"><Bell size={18}/></button>
            <div className="grid h-8 w-8 place-items-center rounded-full border border-amber-400/30 bg-amber-400/10 text-xs font-semibold text-amber-300">ES</div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
    </div>
  )
}
