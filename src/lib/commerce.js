import Commerce from '@chec/commerce.js';  // that's what we installed previously


// creating new instance of of that specific commerce that's going to be our store
// and we need to put the Public Key in the parameter.  Creating new account from commercejs.com
// but we will store the API key somewhere else for security reason (.env file environmental variables {a special hidden file that will not be push to github})
//Then use the name of the public key stored in .env file for the parameters.
//boolean of TREU added to the parameter meaning that this will create a new commerce store

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);