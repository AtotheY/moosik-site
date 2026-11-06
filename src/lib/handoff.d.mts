export type Handoff = { kind: 'play' | 'join'; uri: string };
export function parseHandoff(hash: string): Handoff | null;
