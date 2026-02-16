"use client";

interface PremiumReportViewProps {
  content: string;
}

/** Renders premium interpretation with PDF-style section headers and lucky items block */
export default function PremiumReportView({ content }: PremiumReportViewProps) {
  const luckyMatch = content.match(/---+\s*\n([\s\S]*?)\n?---+/);
  const mainContent = luckyMatch ? content.replace(luckyMatch[0], "").trim() : content;
  const luckyBlock = luckyMatch ? luckyMatch[1].trim() : "";

  const sections = mainContent.split(/(?=^## )/m).filter((s) => s.trim());

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {sections.map((section, i) => {
          const trimmed = section.trim();
          if (!trimmed) return null;

          const lines = trimmed.split("\n");
          const firstLine = lines[0];
          const isSectionHeader = firstLine.startsWith("## ");
          const title = isSectionHeader ? firstLine.replace(/^##\s*/, "") : "";
          const body = isSectionHeader ? lines.slice(1).join("\n").trim() : trimmed;

          return (
            <div key={i} className="space-y-2">
              {isSectionHeader && title && (
                <h4 className="text-base font-semibold text-amber-300 border-b border-amber-500/30 pb-2">
                  {title}
                </h4>
              )}
              {body && (
                <p className="whitespace-pre-wrap leading-relaxed text-amber-100/95 text-[15px]">
                  {body}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {luckyBlock && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-5">
          <div className="space-y-3 text-sm">
            {luckyBlock.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              const colonIdx = trimmed.indexOf(":");
              const isHeader = colonIdx < 0;
              if (isHeader) {
                return (
                  <h4 key={i} className="text-sm font-semibold text-amber-400 mb-2">
                    ✨ {trimmed}
                  </h4>
                );
              }
              const label = trimmed.slice(0, colonIdx).trim();
              const value = trimmed.slice(colonIdx + 1).trim();
              return (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 font-medium text-amber-300/90 min-w-[7rem]">
                    {label}
                  </span>
                  <span className="text-amber-100/90">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
