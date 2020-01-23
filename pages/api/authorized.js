import fs from 'fs-extra'
import path from 'path'

export default async (request, response) => {
  const token = process.env.SPACE_TOKEN
  response.setHeader('Set-Cookie', [`space_token=${token}; httpOnly`])
  const html = await fs.readFile(
    path.join(process.cwd(), 'pages/api/authorized.html'),
    'utf8',
  )
  response.status(200).send(html)
}
