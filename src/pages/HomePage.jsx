import { ArrowRight, ArrowUpRight, AudioLines, BookOpen, Clock3, Flame, Guitar, Play, Sparkles, Target, TrendingUp } from 'lucide-react'
import Fretboard from '../components/fretboard/Fretboard'

function Stat({ icon: Icon, label, value, detail }) {
  return <div className="panel rounded-2xl p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-xs text-zinc-500">{label}</span><Icon size={17} className="text-zinc-500"/></div><div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div><div className="mt-1 text-[11px] text-zinc-600">{detail}</div></div>
}
export default function HomePage({ onNavigate, assessmentResult }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/[.07] bg-gradient-to-br from-[#242019] via-[#171922] to-[#11141c] p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-400/[.08] blur-3xl"/>
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.08] px-3 py-1.5 text-[11px] font-medium text-amber-200"><Sparkles size={13}/> YOUR PERSONAL GUITAR WORKSPACE</div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[42px]">Good players practice.<br/><span className="text-amber-300">Great players connect.</span></h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">Stop collecting scale shapes. Start hearing how notes, chords, and melodies fit together.</p>
          <div className="mt-7 flex flex-wrap gap-3"><button onClick={() => onNavigate('assessment')} className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-[#17130a] transition hover:bg-amber-300"> {assessmentResult ? 'Retake skill check' : 'Find my next step'} <ArrowRight className="ml-2 inline" size={16}/></button><button onClick={() => onNavigate('practice')} className="rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/[.08]"><Play className="mr-2 inline" size={14}/> Explore fretboard</button></div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[36%] opacity-25 lg:block"><Guitar size={250} strokeWidth={.55}/></div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Flame} label="Practice streak" value="3 days" detail="Small steps, real momentum"/>
        <Stat icon={Clock3} label="Time this week" value="1h 25m" detail="Of your 2 hour weekly goal"/>
        <Stat icon={Target} label="Current focus" value="Chord tones" detail="Make the changes audible"/>
        <Stat icon={TrendingUp} label="Skill level" value={assessmentResult ? `${assessmentResult.percentage}%` : 'Discover it'} detail={assessmentResult ? 'Latest assessment score' : 'Take your first skill check'}/>
      </section>
      <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="panel min-w-0 rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-zinc-500">Interactive tool</p><h2 className="mt-1 text-lg font-semibold">Fretboard snapshot</h2></div><button onClick={() => onNavigate('practice')} className="text-xs font-medium text-amber-300 hover:text-amber-200">Open lab <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
          <Fretboard frets={12}/>
          <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-zinc-500"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-400"/> Root note</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-400"/> Scale tones</span><span> A minor pentatonic · preview</span></div>
        </div>
        <div className="panel rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.16em] text-amber-300"><AudioLines size={15}/> Today's focus</div>
          <h2 className="mt-4 text-xl font-semibold">Target the 3rd.</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Over a Dm7 chord, find F. When the harmony moves to G7, move to B. Hear how two notes can tell the listener where the music is going.</p>
          <div className="mt-6 rounded-xl bg-black/20 p-4"><div className="flex items-center justify-between text-xs"><span className="text-zinc-500">MINI CHALLENGE</span><span className="text-amber-300">5 min</span></div><div className="mt-3 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-violet-400/10 text-lg font-semibold text-violet-300">F</div><ArrowRight size={16} className="text-zinc-600"/><div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-400/10 text-lg font-semibold text-blue-300">B</div><div className="ml-auto text-right text-[11px] text-zinc-500">Dm7 → G7<br/>3rd → 3rd</div></div></div>
          <button onClick={() => onNavigate('practice')} className="mt-5 w-full rounded-xl border border-white/[.08] px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/[.04]">Try this on the fretboard <ArrowRight className="ml-2 inline" size={15}/></button>
        </div>
      </section>
      <section className="panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300"><BookOpen size={20}/></div><div><h3 className="font-semibold">A learning path built around you</h3><p className="mt-1 text-sm text-zinc-500">A quick skill check helps identify what to work on next.</p></div></div>
        <button onClick={() => onNavigate('curriculum')} className="shrink-0 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/[.04]">View curriculum <ArrowRight className="ml-2 inline" size={14}/></button>
      </section>
    </div>
  )
}
