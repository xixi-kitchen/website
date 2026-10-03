import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/i18n/useI18n";

const Capabilities: React.FC = () => {
  const t = useI18n();
  return (
    <section className="section-y border-t border-line">
      <div className="container-page">
        <SectionHeader index={t.capabilities.index} label={t.capabilities.label} title={t.capabilities.title} description={t.capabilities.description} />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {t.capabilities.items.map((item, i) => (
            <li key={item.title} className="bg-surface p-8">
              <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-2xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Capabilities;
