import path from "path"
import fs from "fs/promises"
import tmp, { DirectoryResult } from "tmp-promise"
import run from "../src/run"

describe("run.ts", () => {
  let tmpDir!: DirectoryResult

  beforeEach(async () => {
    tmpDir = await tmp.dir()
  })

  afterEach(async () => {
    await tmpDir.cleanup
  })

  test("run", async () => {
    await run("tests/__data__/*", { outDir: tmpDir.path })

    const tags = JSON.parse((await fs.readFile(path.join(tmpDir.path, "tags.json"))).toString())
    const attributes = JSON.parse((await fs.readFile(path.join(tmpDir.path, "attributes.json"))).toString())

    expect(tags).toEqual({
      component1: {
        attributes: ["prop1", "prop2", "prop3"],
        description: "Component 1",
      },
      component2: {
        attributes: [],
        description: "",
      },
    })

    expect(attributes).toEqual({
      "component1/prop1": {
        type: "string",
        description: "",
      },
      "component1/prop2": {
        type: "object",
        description: "Prop 2",
      },
      "component1/prop3": {
        type: "any",
        description: "Prop 3",
      },
    })
  })
})
