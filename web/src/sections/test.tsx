import Image from "next/image";
import { Geist_Mono } from "next/font/google";
import GlitchText from "../components/GlitchText";
import TextPressure from "../components/TextPressure";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Test() {
  return (
    <div className={`w-full h-auto md:h-screen bg-pink-base dark:bg-zinc-dark flex justify-center  ${geistMono.variable}`}>
      <div className="grid gap-2  w-full h-screen items-center justify-items-start  p-8 pb-20 sm:p-20 max-w-screen-xl">
        <Image
          className="dark:invert"
          src="/threevector.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
          Beginning of the experience{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              XIXIKITCHEN
            </code>
            .
          </li>
          <li>My personal showcase space.</li>
        </ol>
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={false}
          className="custom-class bg-yellow-base "
        >
          xixikitchen
        </GlitchText>

        <TextPressure
          text="Hello，This is my website.!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#333333"
          strokeColor="#ff0000"
          minFontSize={20}
          className="relative w-full h-auto bg-yellow-base"
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Get to know me.
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
}
