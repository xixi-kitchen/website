import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n } from "@/i18n/useI18n";

const LocaleToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const router = useRouter();
  const t = useI18n();
  const next = router.locale === "en" ? "zh" : "en";
  const label = next === "en" ? t.lang.en : t.lang.zh;

  return (
    <Link
      href={router.asPath}
      locale={next}
      hrefLang={next}
      className={`inline-flex h-10 items-center rounded-full px-3 font-mono text-xs tracking-[0.14em] text-muted transition-colors hover:bg-ink/[0.05] hover:text-ink ${className}`}
      aria-label={label}
    >
      {label}
    </Link>
  );
};

export default LocaleToggle;
