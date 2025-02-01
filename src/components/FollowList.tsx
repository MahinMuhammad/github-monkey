import { GitHubUser } from "../models/GithubUser";

const FollowList = ({ userList }: { userList: GitHubUser[] }) => {
    return (
        <div className="overflow-x-auto max-h-100">
            <table className="table">
                {/* Table Head */}
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Username</th>
                        <th>GitHub Link</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center p-4">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        userList.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.avatar_url} alt={user.login} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{user.login}</td>
                                <td>
                                    <a
                                        href={user.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline"
                                    >
                                        Visit Profile
                                    </a>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                {/* Table Foot */}
                <tfoot>
                    <tr>
                        <th>Profile</th>
                        <th>Username</th>
                        <th>GitHub Link</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default FollowList;
