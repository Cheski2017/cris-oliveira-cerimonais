(() => {
  const cover = document.querySelector('#cover');
  const invite = document.querySelector('#invite');
  const audio = document.querySelector('#invitation-audio');
  const toggle = document.querySelector('#music-toggle');
  const label = document.querySelector('#music-label');
  const status = document.querySelector('#playback-status');
  let opened = false;
  audio.volume = 0.6;

  function showPlaying(playing) {
    toggle.classList.toggle('playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Tocar música');
    label.textContent = playing ? 'Pausar música' : 'Ouvir música';
  }
  function requestMusic() {
    status.textContent = 'Iniciando a música…';
    // Keep play() in the original click so mobile browsers receive user activation.
    const playback = audio.play();
    if (playback) playback.catch(() => {
      showPlaying(false);
      status.textContent = 'Toque em “Ouvir música” ou no play abaixo para liberar o som.';
    });
  }
  function openInvite() {
    if (opened) return;
    opened = true;
    cover.hidden = false;
    invite.inert = false;
    invite.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-open');
    window.scrollTo(0, 0);
    requestMusic();
    window.setTimeout(() => {
      if (!opened) return;
      cover.hidden = true;
      const title = document.querySelector('#hero-title');
      title.setAttribute('tabindex', '-1');
      title.focus({preventScroll: true});
    }, 650);
  }
  document.querySelector('#open-invite').addEventListener('click', openInvite);
  toggle.addEventListener('click', () => {
    if (audio.paused) requestMusic();
    else audio.pause();
  });
  audio.addEventListener('playing', () => {
    showPlaying(true);
    status.textContent = 'Tocando: A Thousand Years · Christina Perri.';
  });
  audio.addEventListener('pause', () => {
    showPlaying(false);
    status.textContent = 'Música pausada. Toque em “Ouvir música” para continuar.';
  });
  audio.addEventListener('waiting', () => { status.textContent = 'Carregando a música…'; });
  audio.addEventListener('error', () => {
    showPlaying(false);
    status.textContent = 'Não foi possível carregar a música. Confira sua conexão e tente novamente.';
  });
  document.querySelector('#gift-toggle').addEventListener('click', e => {
    const button = e.currentTarget;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    document.querySelector('#gift-list').hidden = expanded;
  });
  document.querySelector('#reopen').addEventListener('click', () => {
    opened = false;
    audio.pause();
    audio.currentTime = 0;
    showPlaying(false);
    cover.hidden = false;
    document.querySelector('#open-invite').focus();
    invite.inert = true;
    invite.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-open');
  });
})();
