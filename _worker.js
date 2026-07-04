const CLIENT_ID = 'Ov23liOfBjrF2IEePqOU';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      return Response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`,
        302
      );
    }

    if (url.pathname === '/callback') {
      try {
        const code = url.searchParams.get('code');
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code
          }),
        });
        const data = await tokenResponse.json();
        const access_token = data.access_token || '';

        return new Response(
          `<!DOCTYPE html><html><body><script>
(function(){
  function receiveMessage(e){
    window.opener.postMessage('authorization:github:success:{"token":"${access_token}","provider":"github"}',e.origin);
  }
  window.addEventListener("message",receiveMessage,false);
  window.opener.postMessage("authorizing:github","*");
})();
</script><p>Autorizando...</p></body></html>`,
          { headers: { 'Content-Type': 'text/html' } }
        );
      } catch (err) {
        return new Response('Erro: ' + err.message, { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
