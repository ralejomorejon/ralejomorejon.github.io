const domain = import.meta.env.WP_DOMAIN;
const apiURL = `${domain}/wp-json/wp/v2`;

export const getPageInfo = async (slug: string) => {
  const res = await fetch(`${apiURL}/pages?slug=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const [data] = await res.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
  } = data;
  return { title, content };
};

export const getLatestPosts = async ({
  perPage = 10,
}: { perPage?: number } = {}) => {
  const res = await fetch(`${apiURL}/posts?per_page=${perPage}&_embed`);
  if (!res.ok) {
    throw new Error("Failed to fetch latest posts");
  }
  const data = await res.json();
  if (!data) throw new Error("No posts found");
  const posts = data.map((post: any) => {
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    const content = post.content.rendered;
    const featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
    const { date, slug } = post;
    const category = post.class_list[7];
    return { title, excerpt, content, date, slug, category, featuredImage };
  });
  return posts;
};

export const getPostInfo = async (slug: string) => {
  const res = await fetch(`${apiURL}/posts?slug=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const [data] = await res.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
  } = data;
  return { title, content };
};

export const getAllPostsSlugs = async () => {
  const res = await fetch(`${apiURL}/posts?per_page=100`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  if (!data) throw new Error("No posts found");
  const slugs = data.map((post: any) => post.slug);
  return slugs;
};
