import { GitHubUser } from "../models/GithubUser";

export const fetchGitHubUserData = async (username: string, type: "followers" | "following"): Promise<GitHubUser[]> => {
  if (!username) return [];

  let allData: GitHubUser[] = [];
  let page = 1;
  const perPage = 100; // Maximum per page allowed by GitHub API

  try {
    while (true) {
      const response = await fetch(`https://api.github.com/users/${username}/${type}?page=${page}&per_page=${perPage}`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubUser[] = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        break; // No more data, exit loop
      }

      allData = [...allData, ...data];
      page++;
    }

    return allData;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
};
