export const REPO: string;
export type Platform = 'mac' | 'windows' | 'choose';
export type Download = {url:string;version:string;size:number;name:string};
export type Downloads = {mac:Download|null;windows:Download|null};
export function detectPlatform(userAgent:string,platform?:string):Platform;
export function selectDownloads(releases:unknown[]):Downloads;
