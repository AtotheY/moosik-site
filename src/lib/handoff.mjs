// Only these two public fragment formats can become native app commands.
// Never treat the incoming fragment as a destination URL.
export function parseHandoff(hash) {
  const play = /^#play\/([A-Za-z0-9_-]{11})$/.exec(hash);
  if (play) return { kind: 'play', uri: 'moosik://play/' + play[1] };
  const join = /^#join\/([a-f0-9]{32})$/.exec(hash);
  if (join) return { kind: 'join', uri: 'moosik://join/' + join[1] };
  return null;
}
