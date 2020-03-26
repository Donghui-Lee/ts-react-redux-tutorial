import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { GitHubProfile } from "../../api/github";

// Action Type
export type GithubAction = ActionType<typeof actions>;
// Reducer 관리할 상태 Type
export type GithubState = {
  userProfile: {
    loading: boolean;
    data: GitHubProfile | null;
    error: Error | null;
  };
};
