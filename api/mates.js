import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export default async (req, res) => {
  const { grp, oid } = req.query
  const { data } = await supabase.from('users').select('id,name').eq('grp', grp).neq('id', oid)
  res.json(data)
}
