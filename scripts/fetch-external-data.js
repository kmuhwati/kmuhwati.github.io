import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { config } from "dotenv";

config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA === "true";
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;
const publicDir = path.resolve("public");

await fs.mkdir(publicDir, { recursive: true });

async function writeJson(fileName, data) {
  await fs.writeFile(
    path.join(publicDir, fileName),
    JSON.stringify(data, null, 2),
  );
}

if (USE_GITHUB_DATA && GITHUB_USERNAME && GITHUB_TOKEN) {
  try {
    const query = `
      query ($login: String!) {
        user(login: $login) {
          name
          bio
          avatarUrl
          location
          pinnedItems(first: 6, types: [REPOSITORY]) {
            totalCount
            edges {
              node {
                ... on Repository {
                  name
                  description
                  forkCount
                  stargazers { totalCount }
                  url
                  id
                  diskUsage
                  primaryLanguage { name color }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "portfolio-fetch",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    });

    if (!response.ok) {
      throw new Error(`GitHub HTTP ${response.status}`);
    }

    const payload = await response.json();
    if (payload.errors) throw new Error(JSON.stringify(payload.errors));
    await writeJson("profile.json", payload);
    console.log("Wrote public/profile.json");
  } catch (error) {
    console.warn("GitHub fetch skipped:", error.message);
  }
} else {
  console.log(
    "GitHub fetch disabled (set USE_GITHUB_DATA=true plus username and token).",
  );
}

if (MEDIUM_USERNAME) {
  try {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      `https://medium.com/feed/@${MEDIUM_USERNAME}`,
    )}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Medium HTTP ${response.status}`);
    await writeJson("blogs.json", await response.json());
    console.log("Wrote public/blogs.json");
  } catch (error) {
    console.warn("Medium fetch skipped:", error.message);
  }
}
