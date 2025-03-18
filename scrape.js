const { writeFile, mkdir, access } = require("fs").promises
const cheerio = require("cheerio")
const axios = require("axios")

async function scrape() {
  let saved = 0
  let skipped = 0

  // fetch and save the atom feed
  const feedData = await fetch("https://alerts.weather.gov/cap/us.php?x=0")
  await save("data/feed.xml", feedData)

  // load the feed into the parser
  const $ = cheerio.load(feedData)

  // for each atom xml <entry>
  for (const entry of $("entry")) {
    const date = $("published", entry).text().split("T")[0]
    const link = $("link", entry).attr("href")
    const id = $("id", entry).text().split("/")[4]
    const directory = `data/${date}`
    const fullPath = `${directory}/${id}.xml`

    // if we've already downloaded it, skip it
    // TODO: add mechanism to pull updated alerts again
    if (await exists(fullPath)) {
      skipped++
      continue
    }

    // if not, take a courtesy break, make sure the directory
    // exists, then download and save the alert details
    await sleep(1000)
    await mkdir(directory, { recursive: true })
    await save(fullPath, await fetch(link))
    saved++
  }

  console.log(`saved ${saved} and skipped ${skipped}`)
}

scrape()

// fetch files and return response.data
async function fetch(url) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// save a file locally
async function save(filename, data) {
  try {
    await writeFile(filename, data)
  } catch (error) {
    console.error(error)
  }
}

// check if a local file exists
async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
