export default defineEventHandler((event) => {
  const { github } = useRuntimeConfig(event);
  const scope = 'user';
  const url = new URL('https://github.com/login/oauth/authorize');

  url.searchParams.append('client_id', process.env.NITRO_GITHUB_CLIENT_ID);
  url.searchParams.append('redirect_uri', process.env.NITRO_GITHUB_REDIRECT_URI);
  url.searchParams.append('scope', scope);

  return sendRedirect(event, url.toString());
});
