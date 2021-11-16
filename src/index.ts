#!/usr/bin/env node

import { Command } from "commander"
import pkgInfo from "pkginfo"
import run from "./run"

pkgInfo(module, "version")

const program = new Command()
  .name("vue-docgen-vetur")
  .version(module.exports.version, "-v, --version")
  .option("-o, --outDir <outDir>", "directory to write generated files to", ".")
  .argument("[path]", "the path to the components (supports glob syntax)", "src/components/**/*.vue")
  .action(run)

program.parse(process.argv)
