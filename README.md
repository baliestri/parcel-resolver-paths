# @baliestri/parcel-resolver-paths

Parcel.js resolver plugin for paths in `tsconfig.json` and `jsconfig.json`.

## Install

Using npm:

```bash
npm install --save-dev @baliestri/parcel-resolver-paths
```

Using yarn:

```bash
yarn add -D @baliestri/parcel-resolver-paths
```

Using pnpm:

```bash
pnpm add -D @baliestri/parcel-resolver-paths
```

## Configuration

Add the following to your `.parcelrc`:

```json
{
  "extends": "@parcel/config-default",
  "resolvers": ["@baliestri/parcel-resolver-paths", "..."]
}
```

> **Note:** The `...` is the rest of the resolvers automatically added by Parcel.

## Usage

Add the following to your `tsconfig.json` or `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

Then you can import your modules like this:

```ts
import { foo } from '~/foo';
```
