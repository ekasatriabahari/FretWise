import { useCallback, useEffect, useRef, useState } from 'react'

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']

function estimatePitch(buffer, sampleRate) {
  const decimatedLength = Math.floor(buffer.length / 2)
  const samples = new Float32Array(decimatedLength)
  let mean = 0
  for (let i = 0; i < decimatedLength; i++) {
    samples[i] = buffer[i * 2]
    mean += samples[i]
  }
  mean /= decimatedLength

  let rms = 0
  for (let i = 0; i < samples.length; i++) {
    const value = samples[i] - mean
    rms += value * value
  }
  rms = Math.sqrt(rms / samples.length)
  const level = Math.min(100, Math.round(rms * 500))
  if (rms < 0.012) return { frequency: null, level }

  const effectiveRate = sampleRate / 2
  const minLag = Math.floor(effectiveRate / 1000)
  const maxLag = Math.min(Math.floor(effectiveRate / 65), Math.floor(samples.length / 2))
  const differences = new Float32Array(maxLag + 1)
  let cumulativeDifference = 0

  for (let lag = 1; lag <= maxLag; lag++) {
    let difference = 0
    for (let i = 0; i < samples.length - lag; i++) {
      const delta = samples[i] - samples[i + lag]
      difference += delta * delta
    }
    differences[lag] = difference
  }

  let bestLag = -1
  let bestValue = 1
  for (let lag = 1; lag <= maxLag; lag++) {
    cumulativeDifference += differences[lag]
    if (lag < minLag) continue
    const normalized = differences[lag] * lag / (cumulativeDifference || 1)
    if (normalized < bestValue) {
      bestValue = normalized
      bestLag = lag
    }
    if (normalized < 0.15) {
      bestLag = lag
      while (bestLag < maxLag && differences[bestLag + 1] < differences[bestLag]) bestLag++
      break
    }
  }

  if (bestLag < 0 || bestValue > 0.35) return { frequency: null, level }

  const before = differences[Math.max(1, bestLag - 1)]
  const center = differences[bestLag]
  const after = differences[Math.min(maxLag, bestLag + 1)]
  const denominator = 2 * (2 * center - before - after)
  const adjustment = denominator ? (before - after) / denominator : 0
  const refinedLag = bestLag + Math.max(-0.5, Math.min(0.5, adjustment))
  const frequency = effectiveRate / refinedLag
  return { frequency: frequency >= 65 && frequency <= 1000 ? frequency : null, level }
}

function getNoteInfo(frequency) {
  if (!frequency) return null
  const midi = Math.round(69 + 12 * Math.log2(frequency / 440))
  const targetFrequency = 440 * (2 ** ((midi - 69) / 12))
  return {
    name: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    cents: Math.round(1200 * Math.log2(frequency / targetFrequency)),
  }
}

export function usePitchDetection() {
  const [status, setStatus] = useState('idle')
  const [level, setLevel] = useState(0)
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [frequency, setFrequency] = useState(null)
  const [note, setNote] = useState(null)
  const streamRef = useRef(null)
  const contextRef = useRef(null)
  const frameRef = useRef(null)
  const lastUpdateRef = useRef(0)

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (contextRef.current && contextRef.current.state !== 'closed') contextRef.current.close()
    streamRef.current = null
    contextRef.current = null
    setFrequency(null)
    setNote(null)
    setLevel(0)
    setStatus('idle')
  }, [])

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) {
      setStatus('unsupported')
      return
    }
    try {
      setStatus((current) => current === 'listening' ? current : 'requesting')
      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const inputs = await navigator.mediaDevices.enumerateDevices()
      permissionStream.getTracks().forEach((track) => track.stop())
      const audioInputs = inputs.filter((device) => device.kind === 'audioinput')
      setDevices(audioInputs)
      setSelectedDevice((current) => current && audioInputs.some((device) => device.deviceId === current)
        ? current
        : (audioInputs.find((device) => device.deviceId !== 'default')?.deviceId || audioInputs[0]?.deviceId || ''))
      setStatus((current) => current === 'listening' ? current : 'idle')
    } catch (error) {
      setStatus(error?.name === 'NotAllowedError' ? 'denied' : 'error')
    }
  }, [])

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setStatus('unsupported'); return }
    stop()
    try {
      setStatus('requesting')
      const audio = {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        ...(selectedDevice ? { deviceId: { exact: selectedDevice } } : {}),
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio })
      const context = new window.AudioContext({ latencyHint: 'interactive' })
      await context.resume()
      const analyser = context.createAnalyser()
      analyser.fftSize = 4096
      analyser.smoothingTimeConstant = 0
      context.createMediaStreamSource(stream).connect(analyser)
      streamRef.current = stream
      contextRef.current = context
      const samples = new Float32Array(analyser.fftSize)
      setStatus('listening')

      const measure = (timestamp) => {
        if (timestamp - lastUpdateRef.current >= 60) {
          lastUpdateRef.current = timestamp
          analyser.getFloatTimeDomainData(samples)
          const result = estimatePitch(samples, context.sampleRate)
          setLevel(result.level)
          setFrequency(result.frequency)
          setNote(getNoteInfo(result.frequency))
        }
        frameRef.current = requestAnimationFrame(measure)
      }
      measure(0)
      const inputs = await navigator.mediaDevices.enumerateDevices()
      setDevices(inputs.filter((device) => device.kind === 'audioinput'))
    } catch (error) {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      if (contextRef.current && contextRef.current.state !== 'closed') contextRef.current.close()
      streamRef.current = null
      contextRef.current = null
      setStatus(error?.name === 'NotAllowedError' ? 'denied' : error?.name === 'NotFoundError' ? 'missing' : 'error')
    }
  }, [selectedDevice, stop])

  useEffect(() => {
    if (!navigator.mediaDevices?.addEventListener) return undefined
    const handleDeviceChange = () => {
      navigator.mediaDevices.enumerateDevices()
        .then((items) => setDevices(items.filter((device) => device.kind === 'audioinput')))
        .catch(() => {})
    }
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    return () => navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
  }, [])

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop())
    if (contextRef.current && contextRef.current.state !== 'closed') contextRef.current.close()
  }, [])

  return { status, level, devices, selectedDevice, setSelectedDevice, frequency, note, refreshDevices, start, stop }
}
