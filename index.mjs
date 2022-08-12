#!/usr/bin/env node
import "zx/globals"
import fs from "fs/promises"

const INSTALL_COMMAND = {
  npm: "install",
  yarn: "add",
  pnpm: "add",
}

const manager = process.argv[2] ? process.argv[2].slice(2) : "pnpm"

echo("\u001b[36m>>>1. Add dependencies<<<")
await $`${manager} ${INSTALL_COMMAND[manager]} -D tailwindcss postcss autoprefixer`

echo("\u001b[36m>>>2. Init tainwindcss<<<")
await $`npx tailwindcss init -p`

echo("\u001b[36m>>>3. Update tailwind.config.js<<<")
const { default: tailwindConfig } = await import(path.resolve(`./tailwind.config.js`))
tailwindConfig.content.push("./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}")
fs.writeFile(
  "./tailwind.config.js",
  `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(tailwindConfig, undefined, 2)}`
)

echo("\u001b[32m>>>Done!<<<")
