import { writable } from 'svelte/store';

let list: ApiMessage[] = [];
export let showable = writable(true);
export let selectedApiMessageList = writable(list);
