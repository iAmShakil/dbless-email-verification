const test = require('ava');
const { generateVerificationHash,
        verifyHash,
        isString,
        hashGenerator } = require('../index')

const testSecret = 'dGQFn8b3jPtczQqgyEIYws5aeDgF4hv6'
const testEmail = 'testemail@mailhost.com'
const expiryTime = 2 // in minutes

test('returns a hash', t => {
  const hash = generateVerificationHash(testEmail, testSecret, expiryTime)
  t.truthy(typeof hash === 'string')
});

test('verifies the hash correctly', t => {
  const hash = generateVerificationHash(testEmail, testSecret, expiryTime)
  t.truthy(verifyHash(hash, testEmail, testSecret))
});

test('Does not verify for a wrong hash', t => {
  const hash = generateVerificationHash(testEmail, testSecret, expiryTime)
  const wrongHash = hash.slice(1)
  t.falsy(verifyHash(wrongHash, testEmail, testSecret))
})

test('Does not verify if the hash is expired', t => {
  const expiryTime = -0.2 // time in past
  const hash = generateVerificationHash(testEmail, testSecret, expiryTime)
  t.falsy(verifyHash(hash, testEmail, testSecret))
})

test('throws error if the required parameters are not given during hash generation', t => {
  t.throws(() => {
    generateVerificationHash('', testSecret, expiryTime)
  })
  t.throws(() => {
    generateVerificationHash(testEmail, '', expiryTime)
  })
});

test('checks whether a given value is a string', t => {
  const result = isString('test string')
  t.truthy(result)
  const result1 = isString(1)
  t.falsy(result1)
  const result3 = isString()
  t.falsy(result3)
})

test('Generates a hash successfully', t => {
  const testEmail = 'testEmail@mail.com'
  const testSecret = 'testSecret'
  const hash = hashGenerator(testEmail, testSecret)
  const baseHash = hash.split('.')[0]
  t.truthy(typeof baseHash === 'string')
})
