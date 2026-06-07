import ReactMarkdown from "react-markdown";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel"],
  },
};

type Props = {
  markdown: string;
  className?: string;
};

/** Renders markdown with a strict sanitize allowlist (no raw HTML). */
export function MarkdownBody({ markdown, className }: Props) {
  if (!markdown.trim()) return null;
  return (
    <div className={className}>
      <ReactMarkdown rehypePlugins={[[rehypeSanitize, schema]]}>{markdown}</ReactMarkdown>
    </div>
  );
}
