import path from "path"
import { promises as fs } from "fs"
import execSh from "exec-sh"
import tmp, { DirectoryResult } from "tmp-promise"

describe("index.js", () => {
  let tmpDir!: DirectoryResult

  beforeEach(async () => {
    tmpDir = await tmp.dir()
  })

  afterEach(async () => {
    await tmpDir.cleanup
  })

  test("print version", async () => {
    const result = await execSh.promise(["ts-node src/index.ts -v"], true)

    expect(result.stderr).toEqual("")
    expect(result.stdout).toContain(await getVersion())
  }, 30_000)

  test("run", async () => {
    const result = await execSh.promise([`ts-node src/index.ts -o ${tmpDir.path} tests/__data__/*`], true)

    expect(result.stderr).toEqual("")

    // Check if files exist.
    await fs.access(path.join(tmpDir.path, "tags.json"))
    await fs.access(path.join(tmpDir.path, "attributes.json"))
  }, 30_000)
})

async function getVersion(): Promise<string> {
  const packageJson = await fs.readFile("package.json")

  return JSON.parse(packageJson.toString()).version
}
