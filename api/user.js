import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async (req, res) => {
  const { oid } = req.query
  const { data } = await supabase.from('users').select('name,grp,role').eq('id', oid).single()
  res.json(data)
}
