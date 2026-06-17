export function blogPostHref(blogBasePath: string, slug: string): string {
  const base = blogBasePath.endsWith("/") ? blogBasePath : `${blogBasePath}/`;
  return `${base}${slug}/`;
}
