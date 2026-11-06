const field = document.querySelector<HTMLInputElement>('#guide-search');
if (field) {
  const controls = document.querySelector<HTMLElement>('[data-search-controls]')!;
  const groups = document.querySelectorAll<HTMLElement>('.guide-group');
  const empty = document.querySelector<HTMLElement>('[data-empty-results]')!;
  const count = document.querySelector<HTMLElement>('[data-result-count]')!;
  const filter = () => {
    const words = field.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let total = 0;
    for (const group of groups) {
      let matches = 0;
      for (const row of group.querySelectorAll<HTMLElement>('[data-guide-row]')) {
        const terms = (group.querySelector('h3')!.textContent + ' ' + row.textContent).toLowerCase();
        row.hidden = !words.every(word => terms.includes(word));
        if (!row.hidden) matches++;
      }
      group.hidden = !matches;
      total += matches;
    }
    empty.hidden = total > 0;
    count.textContent = words.length ? total + (total === 1 ? ' matching guide' : ' matching guides') : '';
  };
  controls.hidden = false;
  field.addEventListener('input', filter);
  empty.querySelector('button')!.addEventListener('click', () => {
    field.value = '';
    filter();
    field.focus();
  });
}
