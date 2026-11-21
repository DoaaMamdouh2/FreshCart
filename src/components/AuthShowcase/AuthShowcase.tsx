import { Clock3, ShieldCheck, Star, Truck } from "lucide-react";

function GroceryIllustration() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-emerald-50 via-white to-orange-50 sm:h-80">
      <div className="absolute -right-10 -top-12 size-44 rounded-full bg-orange-100/70 blur-2xl" />
      <div className="absolute -bottom-10 -left-8 size-44 rounded-full bg-emerald-100/80 blur-2xl" />
      <svg aria-label="Shopping cart filled with fresh groceries" className="relative z-10 h-[88%] w-[88%] drop-shadow-lg" role="img" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="245" cy="265" fill="#dce8e4" rx="165" ry="14" />
        <path d="M74 60h40l35 150h205l39-116H134" fill="none" stroke="#ef553d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="13" />
        <path d="m149 110 18 78h175l23-78z" fill="#f8fcfa" stroke="#a9c9d0" strokeWidth="7" />
        <path d="m174 112 15 74m39-74 5 74m42-74-4 74m43-74-14 74M158 147h193" fill="none" stroke="#b9d4d8" strokeWidth="4" />
        <circle cx="207" cy="224" r="18" fill="#43545b" /><circle cx="207" cy="224" r="8" fill="#e8f0f0" />
        <circle cx="337" cy="224" r="18" fill="#43545b" /><circle cx="337" cy="224" r="8" fill="#e8f0f0" />
        <path d="M193 111c-12-42 20-63 47-45 9-33 49-30 52 7 24-13 51 2 43 38z" fill="#36a75b" />
        <path d="M235 112c-21-34 0-57 25-45 1-33 37-39 48-10 20-18 46-8 43 20 22-4 35 11 29 35z" fill="#6cbd55" />
        <path d="M265 108c-15-38 16-58 39-39 11-31 49-22 46 9 26-7 42 14 29 35z" fill="#219653" />
        <path d="M160 137c-27-23-11-55 19-45 9-28 43-26 47 5 26-10 44 12 29 39z" fill="#ffb52e" />
        <circle cx="270" cy="143" r="34" fill="#f04438" /><path d="M263 110q8-12 18-11" fill="none" stroke="#328b4a" strokeLinecap="round" strokeWidth="8" />
        <circle cx="326" cy="145" r="29" fill="#f8c72e" /><path d="M322 117q-2-12 8-17" fill="none" stroke="#52a554" strokeLinecap="round" strokeWidth="7" />
        <path d="M208 157c-4-26 20-43 40-28 17 13 8 38-7 48-15 8-31-1-33-20" fill="#f27e27" />
        <path d="M232 69c-2-30-20-39-35-47m36 49c9-27 21-38 39-48m13 45c3-22 15-34 32-39" fill="none" stroke="#58aa4f" strokeLinecap="round" strokeWidth="8" />
      </svg>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm">Fresh picks, delivered daily</span>
    </div>
  );
}

export default function AuthShowcase({ mode }: { mode: "login" | "register" }) {
  if (mode === "login") {
    return (
      <section className="flex flex-col justify-center">
        <GroceryIllustration />
        <h2 className="mt-5 text-center text-2xl font-bold leading-tight text-gray-900 sm:text-[27px]">FreshCart - Your One-Stop Shop for Fresh Products</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-6 text-gray-500">Join thousands of happy customers who trust FreshCart for their daily grocery needs.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5"><Truck className="size-3.5 text-emerald-600" /> Free Delivery</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-emerald-600" /> Secure Payment</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-emerald-600" /> 24/7 Support</span>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center py-8 lg:py-0">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">Welcome to <span className="text-emerald-600">FreshCart</span></h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
      <ul className="mt-6 space-y-4">
        {[
          { icon: Star, title: "Premium Quality", detail: "Premium quality products sourced from trusted suppliers." },
          { icon: Truck, title: "Fast Delivery", detail: "Same-day delivery available in most areas." },
          { icon: ShieldCheck, title: "Secure Shopping", detail: "Your data and payments are completely secure." },
        ].map(({ icon: FeatureIcon, title, detail }) => (
          <li className="flex items-center gap-3" key={title}><span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600"><FeatureIcon className="size-4" /></span><span><strong className="block text-sm text-gray-800">{title}</strong><span className="text-xs text-gray-500">{detail}</span></span></li>
        ))}
      </ul>
      <blockquote className="mt-7 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3"><span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">SJ</span><span><span className="block text-sm font-medium text-gray-800">Sarah Johnson</span><span className="text-amber-400">★★★★★</span></span></div>
        <p className="mt-3 text-sm italic leading-6 text-gray-600">“FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!”</p>
      </blockquote>
    </section>
  );
}
