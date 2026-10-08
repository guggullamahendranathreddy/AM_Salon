import React from "react";

/**
 * Pure, XSS-safe inline Markdown parser for React.
 * Converts:
 *  - [Anchor Text](/internal-path) -> clickable internal HTML <a> links
 *  - [Anchor Text](https://...) -> safe external HTML <a> links with rel="noopener noreferrer"
 *  - **Bold Text** -> <strong>
 *  - `inline code` -> <code>
 * 
 * Never uses dangerouslySetInnerHTML. Unrecognized or unsafe URL schemes (like javascript:) are neutralized.
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Regex matching [Anchor Text](URL) OR **Bold Text** OR `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.substring(lastIndex, match.index));
    }

    if (match[2] !== undefined && match[3] !== undefined) {
      // It's a Markdown link: [text](url)
      const label = match[2];
      const rawUrl = match[3].trim();

      const isInternal = rawUrl.startsWith("/") || rawUrl.startsWith("#");
      const isExternal = /^https?:\/\//i.test(rawUrl) || rawUrl.startsWith("tel:") || rawUrl.startsWith("mailto:");

      if (isInternal) {
        nodes.push(
          <a
            key={`in-link-${key++}`}
            href={rawUrl}
            className="text-secondary hover:text-white underline decoration-secondary/50 hover:decoration-white font-medium transition-colors cursor-pointer"
          >
            {label}
          </a>
        );
      } else if (isExternal) {
        nodes.push(
          <a
            key={`ex-link-${key++}`}
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white underline decoration-secondary/50 hover:decoration-white font-medium transition-colors cursor-pointer"
          >
            {label}
          </a>
        );
      } else {
        // Neutralize unsafe schemes like javascript:, data:, etc.
        nodes.push(label);
      }
    } else if (match[4] !== undefined) {
      // It's bold: **text**
      nodes.push(
        <strong key={`bold-${key++}`} className="font-semibold text-luxury-cream">
          {match[4]}
        </strong>
      );
    } else if (match[5] !== undefined) {
      // It's inline code: `code`
      nodes.push(
        <code key={`code-${key++}`} className="px-1.5 py-0.5 rounded bg-white/10 text-secondary text-xs font-mono">
          {match[5]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.substring(lastIndex));
  }

  return nodes.length === 1 && typeof nodes[0] === "string" ? nodes[0] : nodes;
}

/**
 * Full Markdown-to-JSX Block Parser for Salon Blog Articles
 */
export function renderMarkdownBlocks(content: string): React.ReactNode[] {
  if (!content) return [];

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let tableBuffer: string[] = [];

  const flushList = (key: number) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="my-4 space-y-2 list-none pl-2">
          {listBuffer.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-luxury-cream/85 text-sm sm:text-base leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushTable = (key: number) => {
    if (tableBuffer.length > 0) {
      const rows = tableBuffer
        .map((row) =>
          row
            .split("|")
            .map((c) => c.trim())
            .filter((c, i, arr) => i > 0 && i < arr.length - 1)
        )
        .filter((row) => row.length > 0 && !row.every((c) => /^:?-+:?$/.test(c)));

      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);

        elements.push(
          <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-lg border border-secondary/20 shadow-md">
            <table className="w-full text-left text-xs sm:text-sm text-luxury-cream/85">
              <thead className="bg-bg-charcoal/90 text-secondary uppercase font-semibold border-b border-secondary/30">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="px-4 py-3">
                      {renderInlineMarkdown(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-bg-charcoal/40">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableBuffer = [];
    }
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();

    if (line.startsWith("|") && line.endsWith("|")) {
      flushList(index);
      tableBuffer.push(line);
      continue;
    } else {
      flushTable(index);
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      listBuffer.push(line.substring(2));
      continue;
    } else {
      flushList(index);
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={index}
          className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream mt-8 mb-4 border-b border-secondary/20 pb-2"
        >
          {renderInlineMarkdown(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={index}
          className="font-display text-xl sm:text-2xl font-semibold text-secondary mt-6 mb-3"
        >
          {renderInlineMarkdown(line.substring(4))}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <div
          key={index}
          className="my-5 rounded-r-lg border-l-4 border-secondary bg-secondary/10 p-4 sm:p-5 backdrop-blur-sm"
        >
          <p className="font-body italic text-sm sm:text-base text-luxury-cream leading-relaxed">
            {renderInlineMarkdown(line.substring(2))}
          </p>
        </div>
      );
    } else if (line.startsWith("---")) {
      elements.push(
        <hr key={index} className="my-8 border-t border-white/10" />
      );
    } else if (line.length > 0) {
      elements.push(
        <p
          key={index}
          className="font-body text-sm sm:text-base text-luxury-cream/80 leading-relaxed mb-4"
        >
          {renderInlineMarkdown(line)}
        </p>
      );
    }
  }

  flushList(lines.length);
  flushTable(lines.length);

  return elements;
}
