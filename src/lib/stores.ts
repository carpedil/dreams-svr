import { writable } from 'svelte/store';
import type { ApiMessage } from './scenario';

let list: ApiMessage[] = [];
export let showable = writable(true);
export let selectedApiMessageList = writable(list);
