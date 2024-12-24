"use server";

export const getSocietyPost = async (societyId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society-post/${societyId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
