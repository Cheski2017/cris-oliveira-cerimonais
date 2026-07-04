export async function onRequest(context) {
  const clientId = 'Ov23liOfBjrF2IEePqOU';
  const scope = 'repo,user';
  return Response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`,
    302
  );
}
