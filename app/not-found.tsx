import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-[#f3ebe4] min-h-screen gap-4 flex flex-col items-center justify-center font-sans selection:bg-black selection:text-white">
      <p className="text-[120px] font-light leading-none tracking-[-0.04em] text-black/10 select-none">
        404
      </p>
      <h1 className="text-2xl font-light tracking-tight text-black mt-4 mb-3">
        Page not found
      </h1>
      <p className="text-sm text-black/40 mb-10">
        This page doesn&apos;t exist yet.
      </p>
      <Link
        href="/"
        className="text-[13px] tracking-widest font-medium text-black border-b border-black/20 pb-0.5 hover:border-black transition-colors duration-200"
      >
        Back to home
      </Link>
    </div>
  )
}
