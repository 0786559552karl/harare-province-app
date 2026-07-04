'use client'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  console.error(error)
  return (
    <html>
      <body style={{ margin: 0, fontFamily: 'monospace', padding: '2rem', background: '#fafafa' }}>
        <div>
          <h2>Something went wrong</h2>
          <p style={{ color: '#b91c1c' }}>{error.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
