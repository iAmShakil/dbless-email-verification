# dbless-email-verification

[![build status](https://img.shields.io/travis/com/iAmShakil/dbless-email-verification.svg)](https://travis-ci.com/iAmShakil/dbless-email-verification)
[![code coverage](https://img.shields.io/codecov/c/github/iAmShakil/dbless-email-verification.svg)](https://codecov.io/gh/iAmShakil/dbless-email-verification)
[![license](https://img.shields.io/github/license/iAmShakil/dbless-email-verification.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/dbless-email-verification.svg)](https://npm.im/dbless-email-verification)


## Table of Contents


## Install

npm:

```sh
npm install dbless-email-verification
```

yarn:

```sh
yarn add dbless-email-verification
```
## Details:  
  
This package eliminates the need for storing and querying a token in the database for verifying an email.

#### generateVerificationHash  
Generate a hash for the email id using the exported `generateVerificationHash` function and send a verification link containing the hash to that email. The verification url in the email would have a struture similar to this `https://yourdomain.com/verifyemail/?&email=useremail@mailhost.com&verificationHash=5b1c6fab1937fdb9654879c73218d6a6142c614c8e347b45105cb50f2aea9949.1570901998569`

| Argument      | Required | default | Description    | 
| ------------- | -------- | ------- | -------------- |
| email         | true     | N/A     | Email to verify |
| secret        | true     | N/A     | A strong and unique secret key |
| expiry  | false    | 5       | For how long the hash should remain valid in minutes. Expressed in minutes.|

#### verifyHash 
Pass the email and verification hash extracted from the url to the exported `verifyHash` function. The function returns `true` if the email is verified and `false` if not.
| Argument      | Required | default | Description    | 
| ------------- | -------- | ------- | -------------- |
| hash          | true     | N/A     | Extracted hash from the url |
| email         | true     | N/A     | Email to verify|
| secret        | true     | N/A     | The secret used in the `generateVerificationHash` function|

## Usage
#### Generating hash
```js
const { generateVerificationHash } = require('dbless-email-verification');
const hash = generateVerificationHash('useremail@mailhost.com', 'useyourownsecrethere', 10)
// add the email and generated hash to the verification link
```  
#### Verifying the hash
```js
const { verifyHash } = require('dbless-email-verification')
// assuming the hash extracted from the verification url is stored in the verificationHash variable
const isEmailVerified = verifyHash(verificationHash, 'useremail@mailhost.com', 'useyourownsecrethere')
```

## Credits  
This package is influenced by the following npm package and is adopted for a more specific use case [https://www.npmjs.com/package/otp-without-db](https://www.npmjs.com/package/otp-without-db)
