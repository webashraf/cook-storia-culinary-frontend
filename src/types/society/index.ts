export interface ISociety {
  _id: string;
  admin: string;
  coverImage: string;
  societyName: string;
  description: string;
  privacyType: string;
}
export interface IUpvoteDownvote {
  postId: string;
  userId: string;
  voteType: "upvote" | "downvote";
}
