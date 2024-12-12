import { z } from 'zod'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { GithubOAuthResponse } from '~/types/github'

const schema = z.object({
  code: z.string(),
});


// const response = await $fetch<GithubOAuthResponse>('https://github.com/login/oauth/access_token', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//   },
//   body: {
//     client_id: process.env.GITHUB_CLIENT_ID,
//     client_secret: process.env.GITHUB_CLIENT_SECRET,
//     code,
//   },
// });

// const { access_token } = response;
export default defineEventHandler(async event => {
  // Implement the redirect_uri callback function
})