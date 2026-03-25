const BRAIN_API = process.env.BRAIN_API_URL
const BRAIN_KEY = process.env.BRAIN_API_KEY

export async function sendDream(dream: {
  type: string
  content: string
  priority?: string
  tags?: string[]
}) {
  const res = await fetch(`${BRAIN_API}/dreams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BRAIN_KEY}`
    },
    body: JSON.stringify(dream)
  })
  return res.json()
}

export async function getBrainState() {
  const res = await fetch(`${BRAIN_API}/state`, {
    headers: { 'Authorization': `Bearer ${BRAIN_KEY}` }
  })
  return res.json()
}
