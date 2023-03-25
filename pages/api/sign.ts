import type { NextApiRequest, NextApiResponse } from 'next'
import { readFileSync } from "fs"
import { createPrivateKey, sign } from 'crypto'
import { resolve } from 'path'

type Data = {
  signature: string
}

const CURVE_NAME = "brainpoolP256r1"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ signature: 'Method Not Allowed' })
    res.setHeader("Allow", "POST")
    return
  }

  const { seal } = req.body
  const sealBytes = Buffer.from(seal, "base64")

  const privateKeyPem = readFileSync(resolve("./certificate", "private-key.pem"))
  const privateKey = createPrivateKey({
    key: privateKeyPem,
    format: "pem",
  })

  const signature = sign(null, sealBytes, {
    key: privateKey,
    dsaEncoding: "ieee-p1363",
  })
  console.log("Signature length: " + signature.length)
  console.log(signature)
  console.log(signature.toString("base64"))

  res.status(200).json({ signature: signature.toString("base64") })
}
