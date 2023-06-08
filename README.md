# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### dependences

npm i @skeletonlabs/skeleton --save-dev

npx svelte-add@latest tailwindcss
npm install

### turn SvelteKit in SSG mode

#### more detail visit https://tauri.app/v1/guides/getting-started/setup/sveltekit/

npm install --save-dev @sveltejs/adapter-static@next

```js
// Then update the adapter import in the svelte.config.js file:
import adapter from '@sveltejs/adapter-static'; // This was changed from adapter-auto
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
```

### Create the Rust Project more detail visit https://tauri.app/v1/guides/getting-started/setup/sveltekit/

npm install --save-dev @tauri-apps/cli

#### modify package.json

```js
"scripts": {
  "tauri": "tauri"
}
```

#### then run to init backend project

npm run tauri init

#### run tauri app

npm run tauri dev

npm install -D @tailwindcss/forms
