import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async (req, res) => {
  const { fromId, toId, score } = req.body
  const { data: me }  = await supabase.from('users').select('grp,role').eq('id', fromId).single()
  const { data: to }  = await supabase.from('users').select('grp').eq('id', toId).single()
  if (!me || !to || me.grp !== to.grp || me.role !== 'user') return res.status(403).json({ error: '无权' })
  const { data: exist } = await supabase.from('scores').select('id').eq('from_uid', fromId).eq('to_uid', toId).single()
  if (exist) return res.status(409).json({ error: '已打过' })
  await supabase.from('scores').insert({ from_uid: fromId, to_uid: toId, score })
  res.json({ ok: true })
}
