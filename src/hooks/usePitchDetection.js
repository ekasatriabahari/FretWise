import { useCallback, useRef, useState } from 'react'

// Foundation only: microphone lifecycle and signal level. Pitch estimation comes later.
export function usePitchDetection() {
  const [status, setStatus] = useState('idle')
  const [level, setLevel] = useState(0)
  const streamRef = useRef(null)
  const contextRef = useRef(null)
  const frameRef = useRef(null)

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    contextRef.current?.close()
    streamRef.current = null
    contextRef.current = null
    setLevel(0)
    setStatus('idle')
  }, [])

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setStatus('unsupported'); return }
    try {
      setStatus('requesting')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const context = new window.AudioContext()
      const analyser = context.createAnalyser()
      analyser.fftSize = 2048
      context.createMediaStreamSource(stream).connect(analyser)
      streamRef.current = stream
      contextRef.current = context
      const samples = new Uint8Array(analyser.fftSize)
      setStatus('listening')
      const measure = () => {
        analyser.getByteTimeDomainData(samples)
        let sum = 0
        for (const sample of samples) { const value = (sample - 128) / 128; sum += value * value }
        setLevel(Math.min(100, Math.round(Math.sqrt(sum / samples.length) * 180)))
        frameRef.current = requestAnimationFrame(measure)
      }
      measure()
    } catch { setStatus('denied') }
  }, [])

  return { status, level, start, stop }
}
