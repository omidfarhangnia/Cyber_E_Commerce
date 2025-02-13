import { sql } from "@vercel/postgres";

export async function sendNewComment(prevState, formData) {
  // there is something wrong here
  try {
    const data = {
      title: formData.get("commentTitle"),
      description: formData.get("commentDescription"),
      score: formData.get("commentScore"),
    };

    const date = new Date();
    const result = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-
    ${String(date.getDate()).padStart(2, "0")}`;

    const author_img =
      "https://fphw0h5a4ihmh2dg.public.blob.vercel-storage.com/users_image/author_image_2-GsoyeoC67kkgp0CP6FvgnVTpdZ2Woh.png";

    await sql`
       INSERT INTO comments (title, description, author_name, score, author_img, date, product_img, product_id)
       VALUES (${data.title}, ${data.description}, "author nameme", ${data.score}, ${author_img}, ${result}, "", "lslslsllslsls")
    `;
  } catch (err) {
    throw new Error(err);
  }
}
