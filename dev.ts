#!/usr/bin/env -S deno run -A --watch
import dev from "$live/dev.ts";
import liveManifest from "$live/live.gen.ts";
import tailwindConfig from "deco-sites/fashion/tailwind.config.ts";
import liveStdManifest from "deco-sites/std/live.gen.ts";
import tailwind from "deco-sites/std/tailwindv3.ts";
import daisyui from "daisyui";

// Start tailwind background process generation
tailwind({
  ...tailwindConfig,
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
});

// Generate manifest and boot server
await dev(import.meta.url, "./main.ts", {
  imports: {
    "$live": liveManifest,
    "deco-sites/std": liveStdManifest,
  },
});
