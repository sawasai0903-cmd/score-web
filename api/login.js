// 匿名登录：随机挑一个固定用户（映射到 Supabase 里的 id）
const candidates = ['user_a', 'user_b', 'user_c', 'user_d', 'user_e', 'user_f']

export default async (req, res) => {
  const pick = candidates[Math.floor(Math.random() * candidates.length)]
  res.json({ openid: pick })
}
