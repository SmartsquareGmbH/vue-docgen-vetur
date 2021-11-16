import path from "path"
import { promises as fs } from "fs"
import glob from "fast-glob"
import mkdirp from "mkdirp"
import { parse } from "vue-docgen-api"
import { transformAttributes, transformTags } from "./transform"

type ProgramOptions = {
  outDir: string
}

export default async function run(inDir: string, { outDir }: ProgramOptions) {
  console.log(`Building vetur component data to ${path.resolve(outDir)}`)

  const components = await glob(inDir)
  const parsedComponents = await Promise.all(components.map((it) => parse(it)))

  const tags = transformTags(parsedComponents)
  const attributes = transformAttributes(parsedComponents)

  await mkdirp(outDir)
  await Promise.all([
    fs.writeFile(path.join(outDir, "tags.json"), JSON.stringify(tags, null, 2)),
    fs.writeFile(path.join(outDir, "attributes.json"), JSON.stringify(attributes, null, 2)),
  ])
}
