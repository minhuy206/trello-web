import { useEffect } from 'react'

export const useCountdown = (seconds, setSeconds) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [seconds, setSeconds])

  return seconds
}
