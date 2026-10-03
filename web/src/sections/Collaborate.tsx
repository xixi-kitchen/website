import React from "react";
import Button from "@/components/ui/Button";
import { useI18n } from "@/i18n/useI18n";

const Collaborate: React.FC = () => {
  const t = useI18n();
  return (
    <section className="section-y border-t border-line">
      <div className="container-page grid gap-8 md:grid-cols-[1.4fr_auto] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {t.collaborate.index} / {t.collaborate.label}
          </p>
          <h2 className="mt-4 max-w-3xl text-title font-semibold text-ink">{t.collaborate.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{t.collaborate.body}</p>
        </div>
        <Button href="/contact">{t.collaborate.cta}</Button>
      </div>
    </section>
  );
};

export default Collaborate;
