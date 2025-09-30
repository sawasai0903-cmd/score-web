// 匿名登录：浏览器自己生成一个 uuid 当 openid
import { randomUUID } from 'crypto'

export default async (req, res) => {
  const fakeOpenId = randomUUID().slice(0, 16) // 16 位随机字符串
  res.json({ openid: fakeOpenId })
}
