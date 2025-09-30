import { createClient } from '@supabase/supabase-js'
import xlsx from 'node-xlsx'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async (req, res) => {
  const key = req.headers['x-admin-key']
  if (key !== process.env.ADMIN_KEY) return res.status(403).json({ error: '无权' })
  const [users, scores] = await Promise.all([
    supabase.from('users').select('id,name').eq('role', 'user'),
    supabase.from('scores').select('to_uid,score')
  ])
  const map = {}
  scores.data.forEach(s => { (map[s.to_uid] ||= []).push(s.score) })
  const sheet = [['用户名', ...Array.from({ length: 5 }, (_, i) => `得分${i + 1}`)]]
  users.data.forEach(u => sheet.push([u.name, ...(map[u.id] || []).sort((a, b) => b - a)]))
  const buffer = xlsx.build([{ name: '匿名得分', data: sheet }])
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', 'attachment; filename=score.xlsx')
  res.end(buffer)
}
