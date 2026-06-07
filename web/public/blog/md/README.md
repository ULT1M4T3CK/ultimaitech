# Blog Markdown exports (`/blog/md/`)

This folder is filled automatically **before** `vite build` by `scripts/export-blog-markdown.mjs`.

| Path | Description |
|------|-------------|
| `index.md` | List of published posts with links to each `.md` file |
| `posts/{slug}.md` | Full article: YAML front matter, excerpt, key takeaways, body (HTML→Markdown) |

## Configuration

The script tries these URLs in order until one returns the published posts JSON array:

1. **`BLOG_EXPORT_POSTS_URL`** — full URL (e.g. `https://ultimaitech.com/admin/api/blog/posts`)
2. `http://127.0.0.1:3002/api/blog/posts` — local `website-backend`
3. **`SITE_URL`**`/admin/api/blog/posts` — defaults to `https://ultimaitech.com/admin/api/blog/posts`

Override **`SITE_URL`** if the site runs on another domain.

If no URL works, **`posts/*.md` is not deleted** (stale files may remain). **`index.md`** is still written with a warning.
