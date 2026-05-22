const HISTORY_KEY = 'nav-history'
const MAX_HISTORY = 20

export function pushHistory(path: string) {
  const history = getHistory()

  if (history[history.length - 1] === path) return
  const next = [...history, path].slice(-MAX_HISTORY)
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(next))
}

export function getHistory(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(HISTORY_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function popHistory(): string | null {
  const history = getHistory()
  if (history.length < 2) return null
  const next = history.slice(0, -1)
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  return next[next.length - 1]
}
