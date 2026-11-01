// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('traineeship review office', () => {
  it('loads traineeship reviews from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'European paid-traineeship quality review', owner: 'European Youth Employment Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('European paid-traineeship quality review')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Quality Traineeship Compliance Office' })).toBeTruthy()
  })
})
