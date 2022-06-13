import isUrl from 'is-url'
import cheerio from 'cheerio'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	const { url } = req.query
	if (typeof url !== 'string') {
		return res.status(400).json({
			msg: 'invalid url'
		})
	}
	if (!isUrl(url)) {
		return res.status(400).json({
			msg: 'invalid url'
		})
	}

	const html = await fetch(url).then((res) => res.text())
	const $ = cheerio.load(html)
	const title = $('title').text()

	res.status(200).json({
		url,
		title,
	})
}

export default handler
