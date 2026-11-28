import { ArrowRight, ArrowUpRight, AudioLines, BookOpen, Clock3, Flame, Guitar, Play, Sparkles, Target, TrendingUp, History, GraduationCap } from 'lucide-react'
import Fretboard from '../components/fretboard/Fretboard'
import { getAssessmentInsights } from '../utils/assessmentInsights'
import { analyzeLearningProgress } from '../utils/adaptiveLearning'
import { useLanguage } from '../i18n/LanguageContext'

function Stat({ icon: Icon, label, value, detail }) {
  return <div className="panel rounded-2xl p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-xs text-zinc-500">{label}</span><Icon size={17} className="text-zinc-500"/></div><div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div><div className="mt-1 text-[11px] text-zinc-600">{detail}</div></div>
}

export default function HomePage({ onNavigate, assessmentResult, assessmentHistory = [], practiceHistory = [] }) {
  const { language, t } = useLanguage()
  const recentResults = assessmentHistory.slice(0, 3)
  const recentPractice = practiceHistory.slice(0, 5)
  const practiceCount = practiceHistory.length
  const practiceAverage = practiceCount ? Math.round(practiceHistory.reduce((sum, item) => sum + (item.total ? item.score / item.total * 100 : 0), 0) / practiceCount) : 0
  const weakest = assessmentResult?.pillars ? getAssessmentInsights(assessmentResult.pillars, language).weakest : null
  const adaptive = analyzeLearningProgress(practiceHistory, language)
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/[.07] bg-gradient-to-br from-[#242019] via-[#171922] to-[#11141c] p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-amber-400/[.08] blur-3xl"/>
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.08] px-3 py-1.5 text-[11px] font-medium text-amber-200"><Sparkles size={13}/>{t('workspaceLabel')}</div>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-[42px]">{t('heroTitle1')}<br/><span className="text-amber-300">{t('heroTitle2')}</span></h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">{t('heroDescription')}</p>
          <div className="mt-7 flex flex-wrap gap-3"><button onClick={() => onNavigate('assessment')} className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-[#17130a] transition hover:bg-amber-300">{assessmentResult ? t('retake') : t('findNextStep')} <ArrowRight className="ml-2 inline" size={16}/></button><button onClick={() => onNavigate('practice')} className="rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/[.08]"><Play className="mr-2 inline" size={14}/>{t('exploreFretboard')}</button></div>
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[36%] opacity-25 lg:block"><Guitar size={250} strokeWidth={.55}/></div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Flame} label={t('practiceStreak')} value={`3 ${t('days')}`} detail={t('momentum')}/>
        <Stat icon={Clock3} label={t('timeWeek')} value="1h 25m" detail={t('goal')}/>
        <Stat icon={Target} label={t('currentFocus')} value={weakest?.label ?? (language === 'id' ? 'Nada chord' : 'Chord tones')} detail={assessmentResult ? t('basedAssessment') : t('makeChangesAudible')}/>
        <Stat icon={TrendingUp} label={t('skillLevel')} value={assessmentResult ? `${assessmentResult.percentage}%` : t('discover')} detail={assessmentResult ? t('latestScore') : t('takeFirst')}/>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Stat icon={Target} label={t('practiceSessions')} value={practiceCount} detail={t('savedPracticeSessions')}/>
        <Stat icon={TrendingUp} label={t('practiceAccuracy')} value={practiceCount ? `${practiceAverage}%` : '—'} detail={t('averageRecentPractice')}/>
        <Stat icon={History} label={t('lastPractice')} value={recentPractice[0] ? `${recentPractice[0].score}/${recentPractice[0].total}` : '—'} detail={recentPractice[0] ? t(recentPractice[0].type) : t('noPracticeYet')}/>
      </section>
      <section className="panel rounded-2xl border border-amber-400/20 p-5 sm:p-6"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-amber-300"><Sparkles size={14}/>{t('adaptiveTitle')}</div><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="max-w-2xl"><h2 className="text-lg font-semibold">{adaptive.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{adaptive.focus}</p>{adaptive.evidence && <p className="mt-2 text-xs text-zinc-500">{adaptive.evidence}</p>}<p className="mt-3 text-sm text-zinc-300">{adaptive.action}</p></div><div className="flex shrink-0 flex-col items-start gap-2"><span className="rounded-full bg-white/[.06] px-3 py-1 text-[10px] font-medium text-zinc-300">{adaptive.status ?? t('adaptiveWaiting')}</span><button onClick={() => onNavigate('practice')} className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-semibold text-[#17130a] hover:bg-amber-300">{t('openRecommendedPractice')} <ArrowRight className="ml-1 inline" size={13}/></button></div></div></section>
      {recentPractice.length > 0 && <section className="panel rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2"><History size={16} className="text-zinc-500"/><div><h2 className="text-sm font-semibold">{t('practiceHistory')}</h2><p className="mt-0.5 text-xs text-zinc-600">{t('latestPracticeSessions')}</p></div></div>
        <div className="divide-y divide-white/[.06]">{recentPractice.map((item, index) => <div key={item.completedAt ?? index} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
          <div className="w-14 text-xl font-semibold tabular-nums text-amber-300">{item.score}/{item.total}</div>
          <div className="min-w-0 flex-1"><div className="text-sm text-zinc-200">{t(item.type)}</div><div className="mt-0.5 text-[11px] text-zinc-600">{item.completedAt ? new Date(item.completedAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</div></div>
          <span className="text-[10px] text-zinc-600">{item.total ? Math.round(item.score / item.total * 100) : 0}%</span>
        </div>)}</div>
      </section>}
      <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="panel min-w-0 rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-zinc-500">{t('interactiveTool')}</p><h2 className="mt-1 text-lg font-semibold">{t('fretboardSnapshot')}</h2></div><button onClick={() => onNavigate('practice')} className="text-xs font-medium text-amber-300 hover:text-amber-200">{t('openLab')} <ArrowUpRight className="ml-1 inline" size={13}/></button></div>
          <Fretboard frets={12} ariaLabel={language === 'id' ? 'Fretboard gitar interaktif, 12 fret' : 'Interactive guitar fretboard, 12 frets'}/>
          <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-zinc-500"><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-400"/>{t('rootNote')}</span><span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-400"/>{t('scaleTones')}</span><span> A minor pentatonic · {t('preview')}</span></div>
        </div>
        <div className="panel rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.16em] text-amber-300"><AudioLines size={15}/>{t('todaysFocus')}</div>
          <h2 className="mt-4 text-xl font-semibold">{t('targetThird')}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{t('focusCopy')}</p>
          <div className="mt-6 rounded-xl bg-black/20 p-4"><div className="flex items-center justify-between text-xs"><span className="text-zinc-500">{t('miniChallenge')}</span><span className="text-amber-300">{language === 'id' ? '5 menit' : '5 min'}</span></div><div className="mt-3 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-violet-400/10 text-lg font-semibold text-violet-300">F</div><ArrowRight size={16} className="text-zinc-600"/><div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-400/10 text-lg font-semibold text-blue-300">B</div><div className="ml-auto text-right text-[11px] text-zinc-500">Dm7 → G7<br/>3rd → 3rd</div></div></div>
          <button onClick={() => onNavigate('learn')} className="mt-5 w-full rounded-xl border border-white/[.08] px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/[.04]">{language === 'id' ? 'Pelajari konsep ini' : 'Learn this concept'} <ArrowRight className="ml-2 inline" size={15}/></button>
        </div>
      </section>
      <section className="panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300"><BookOpen size={20}/></div><div><h3 className="font-semibold">{t('pathTitle')}</h3><p className="mt-1 text-sm text-zinc-500">{t('pathCopy')}</p></div></div>
        <button onClick={() => onNavigate('curriculum')} className="shrink-0 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/[.04]">{t('viewCurriculum')} <ArrowRight className="ml-2 inline" size={14}/></button>
      </section>
      <section className="panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-amber-300"><GraduationCap size={20}/></div><div><h3 className="font-semibold">{t('learnTitle')}</h3><p className="mt-1 text-sm text-zinc-500">{t('learnIntro')}</p></div></div>
        <button onClick={() => onNavigate('learn')} className="shrink-0 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/[.04]">{t('learn')} <ArrowRight className="ml-2 inline" size={14}/></button>
      </section>
      {recentResults.length > 0 && <section className="panel rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2"><History size={16} className="text-zinc-500"/><div><h2 className="text-sm font-semibold">{t('history')}</h2><p className="mt-0.5 text-xs text-zinc-600">{t('latestSaved')}</p></div></div>
        <div className="divide-y divide-white/[.06]">{recentResults.map((item, index) => {
          const insights = getAssessmentInsights(item.pillars, language)
          return <div key={item.completedAt ?? index} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="w-14 text-xl font-semibold tabular-nums text-amber-300">{item.percentage}%</div>
            <div className="min-w-0 flex-1"><div className="text-sm text-zinc-200">{insights.weakest?.label ?? t('assessment')}</div><div className="mt-0.5 text-[11px] text-zinc-600">{item.completedAt ? new Date(item.completedAt).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : t('latestAssessment')}</div></div>
            <span className="text-[10px] text-zinc-600">{item.correct}/{item.total} {t('correct')}</span>
          </div>
        })}</div>
      </section>}
    </div>
  )
}
