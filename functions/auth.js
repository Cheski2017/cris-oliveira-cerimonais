export async function onRequest(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;
  const scope = 'repo,user';
  return Response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`,
    302
  );
}
