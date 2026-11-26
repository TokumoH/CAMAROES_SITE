import { useCallback, useEffect, useRef, useState } from "react"
import { sortNewsByDate, type News } from "@/data/news"
import {
  newsRefreshIntervalMs,
  newsRepository,
  readNewsCache,
  writeNewsCache,
  type NewsRepository,
} from "@/services/news"

export type NewsStatus = "loading" | "ready" | "error"

export type NewsState = {
  items: News[]
  /** loading: primeira busca sem cache; error: falhou e não há nada para mostrar. */
  status: NewsStatus
  /** Momento da última lista recebida com sucesso (ms). */
  updatedAt: number | null
  /** A última tentativa falhou (a lista exibida pode estar desatualizada). */
  failed: boolean
  refreshing: boolean
  refresh: () => void
}

/** Ao voltar para a aba, busca de novo se a última tentativa tiver mais de 1 min. */
const minIntervalOnFocusMs = 60 * 1000

export function useNews(repository: NewsRepository = newsRepository): NewsState {
  const [initial] = useState(readNewsCache)
  const [items, setItems] = useState<News[]>(() => sortNewsByDate(initial?.items ?? []))
  const [updatedAt, setUpdatedAt] = useState<number | null>(initial?.savedAt ?? null)
  const [failed, setFailed] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const controllerRef = useRef<AbortController | null>(null)
  const lastAttemptRef = useRef(0)

  const load = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    lastAttemptRef.current = Date.now()
    setRefreshing(true)
    try {
      const fresh = sortNewsByDate(await repository.fetchAll(controller.signal))
      if (controller.signal.aborted) return
      const now = Date.now()
      setItems(fresh)
      setUpdatedAt(now)
      setFailed(false)
      writeNewsCache(fresh, now)
    } catch {
      if (!controller.signal.aborted) setFailed(true)
    } finally {
      if (controllerRef.current === controller) setRefreshing(false)
    }
  }, [repository])

  useEffect(() => {
    void load()
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load()
    }, newsRefreshIntervalMs)
    const onVisibility = () => {
      if (document.visibilityState === "visible" && Date.now() - lastAttemptRef.current > minIntervalOnFocusMs) {
        void load()
      }
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisibility)
      controllerRef.current?.abort()
    }
  }, [load])

  const hasData = updatedAt !== null
  const status: NewsStatus = hasData ? "ready" : failed ? "error" : "loading"
  const refresh = useCallback(() => void load(), [load])

  return { items, status, updatedAt, failed, refreshing, refresh }
}
