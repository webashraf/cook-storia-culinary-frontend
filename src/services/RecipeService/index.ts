"use server";

import { nexiosInstance } from "@/src/config/axios.instance";

export const fetchComments = async (postId: string) => {
  try {
    const data = await nexiosInstance.get(`/user-opinion/${postId}`, {
      next: { tags: ["comments"] },
    });

    return data.data;
  } catch (err) {
    throw new Error(`Error fetching comments`);
  }
};

export const getAllRecipeBySearchAndFilter = async (query: string) => {
  console.log(query);
  try {
    const { data }: any = await nexiosInstance.get(`/recipe`);

    if (data?.success) {
      console.log("Like response:", data);
      return data;
    }
    // revalidateTag("recipeComments");
    // setCommentsData(await fetchComments(postId));
  } catch (err) {
    console.error("Error liking the post:", err);
  }
};

// export const handleLike = async (postId: string, userId: string) => {
//console.log(postId, userId);

// const opinions: IOpinions = {
//   postId,
//   userId,
//   upVote: 1,
// };

// try {
//   const { data }: any = await nexiosInstance.post(
//     "/user-opinion/create",
//     opinions
//   );

//   if (data?.success) {
//     //console.log("Like response:", data);
//     revalidateTag("comments");
//   }
//   // revalidateTag("recipeComments");
//   // setCommentsData(await fetchComments(postId));
// } catch (err) {
//   console.error("Error liking the post:", err);
// }
// };
// export const handleDislike = async (postId: string, userId: string) => {
//   const opinions: IOpinions = {
//     postId,
//     userId,
//     downVote: 1,
//   };

//   try {
//     const { data }: any = await nexiosInstance.post(
//       "/user-opinion/create",
//       opinions
//     );

//     if (data?.success) {
//       //console.log("dislike response:", data);
//       revalidateTag("comments");
//     }
//     // setCommentsData(await fetchComments(postId)); // Refetch comments after disliking
//   } catch (err) {
//     console.error("Error disliking the post:", err);
//   }
// };
