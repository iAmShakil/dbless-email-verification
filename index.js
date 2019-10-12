const crypto = require('crypto')

const isString = (input) => {
  return typeof input === 'string' || input instanceof String
}

const hashGenerator = (secret, data) => {
  return crypto.createHmac('sha256', secret).update(data).digest('hex')
}

const generateVerificationHash = (email, secret, expiry=5) => {
  if(!secret) {
    throw new Error('A valid secret has to be provided')
  }
  if(!email) {
    throw new Error('Required field email is not set')
  }
  const ttl = expiry * 60 * 1000 // expiry in ms
  const expiryTime = Date.now() + ttl // time in future until when the hash is valid
  const data = `${email}.${expiryTime}`
  const baseHash = hashGenerator(secret, data)
  const baseHashWithReadableExpiry = `${baseHash}.${expiryTime}`
  return baseHashWithReadableExpiry
}

const verifyHash = (hash, email, secret) => {
    if(!secret) {
      throw new Error('Secret has to be provided to verify the hash')
    }
    if(!hash || !email || !isString(hash) || !isString(email)) {
      return false
    }
    if(!hash.match(".")) return false
    const [baseHash, expiryTime] = hash.split('.')
    const now = Date.now()
    if(expiryTime < now) {
      return false
    }
    const data = `${email}.${expiryTime}`
    const generatedHash = hashGenerator(secret, data)
    if(generatedHash === baseHash) {
      return true
    } else {
      return false
    }
}

module.exports = {
  generateVerificationHash,
  verifyHash,
  isString,
  hashGenerator
}
