const gallery = document.querySelector<HTMLElement>('[data-history-gallery]');
if (gallery) {
  const image = gallery.querySelector('img')!;
  const fullSize = gallery.querySelector('a')!;
  const caption = gallery.querySelector('figcaption')!;
  const controls = gallery.querySelector<HTMLElement>('.guide-picks')!;
  controls.hidden = false;
  const buttons = Array.from(controls.querySelectorAll('button'));
  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      const url = '/assets/history-guide/' + button.dataset.image;
      fullSize.href = url;
      image.src = url;
      image.alt = button.dataset.caption!;
      caption.textContent = button.dataset.caption!;
    });
  }
}
