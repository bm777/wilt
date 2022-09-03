import Seed from "mnemonic-seed-js";


export default async function handler(req, res) {
  const seed = Seed.new();

  const d = seed.mnemonic
  console.log(d.raw)
  
  res.status(200).json({ response: d.raw})
  seed.kill()
}
