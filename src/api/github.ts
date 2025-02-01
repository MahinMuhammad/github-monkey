// github.ts
import { GitHubUser } from "../models/GithubUser";

export const fetchGitHubUserData = async (username: string, type: "followers" | "following"): Promise<GitHubUser[]> => {
  if (!username) return [];

  const endpoint = `https://api.github.com/users/${username}/${type}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubUser[] = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return [];
  }
};
