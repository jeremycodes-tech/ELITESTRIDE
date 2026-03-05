import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'src', 'App.tsx');
let txt = fs.readFileSync(file, 'utf8');

function replaceMobileLayout(componentName, mobileHtml) {
    let start = txt.indexOf('const ' + componentName + ' =');
    if (start === -1) return;
    let nextComponent = txt.indexOf('const ', start + 10);
    let chunk = txt.substring(start, nextComponent !== -1 ? nextComponent : txt.length);

    // Find {/* Mobile Stack Layout */}
    let mobileStart = chunk.indexOf('{/* Mobile Stack Layout */}');
    if (mobileStart === -1) return; // not found
    let sectionEnd = chunk.lastIndexOf('</section>');

    let newChunk = chunk.substring(0, mobileStart) + '{/* Mobile Stack Layout */}\\n' + mobileHtml + '\\n    </section>\\n';
    txt = txt.substring(0, start) + newChunk + txt.substring(nextComponent !== -1 ? nextComponent : txt.length);
}

const heroHtml = `      <div className="flex md:hidden flex-col w-full bg-white pt-[68px]">
        <div className="relative w-full h-[85vh]">
          <img src={heroConfig.heroImage} alt="Hero" className="w-full h-[85vh] object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          
          <div className="absolute bottom-10 left-6 right-6 flex flex-col items-start gap-1">
            <span className="font-heading text-white text-base tracking-widest opacity-80">{heroConfig.subtitleLabel}</span>
            <h1 className="font-heading text-white text-5xl font-black leading-[0.9] tracking-tight mb-5 drop-shadow-md">
              {heroConfig.titleText}
            </h1>
            <button className="bg-white text-black font-semibold font-body px-7 py-3 rounded-full text-base uppercase hover:bg-gray-200 transition-colors">
              {heroConfig.ctaText}
            </button>
          </div>
        </div>
        <div className="h-2 w-full bg-white"></div>
      </div>`;
replaceMobileLayout('HeroSection', heroHtml);

const manifestoHtml = `      <div className="flex md:hidden flex-col w-full bg-white">
        <div className="relative w-full h-[80vh]">
          <img src={manifestoConfig.image} alt="Manifesto" className="w-full h-[80vh] object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
          
          <div className="absolute top-8 left-6 right-6 flex flex-col items-start">
            <h2 className="font-heading text-white text-4xl font-black leading-tight tracking-wide drop-shadow-lg">
              {manifestoConfig.phrases.slice(0, 3).join(" ")} <br/>
              {manifestoConfig.phrases.slice(3, 6).join(" ")}
            </h2>
            <button className="bg-white text-black font-semibold font-body px-6 py-2.5 mt-6 rounded-full text-sm uppercase hover:bg-gray-200 transition-colors">
              Shop
            </button>
          </div>
        </div>
        <div className="h-2 w-full bg-white"></div>
      </div>`;
replaceMobileLayout('ManifestoSection', manifestoHtml);

const spotlightHtml = `      <div className="flex md:hidden flex-col w-full bg-black mt-1">
        {/* Shoe block with info section below it */}
        <div className="w-full h-[55vh] relative bg-[#222222] flex flex-col justify-end overflow-hidden pb-10">
           <img src={productSpotlightConfig.productImage} alt="Product" className="absolute top-10 left-0 w-full object-contain scale-[0.8]" loading="lazy" />
           <div className="relative z-10 w-full px-8 flex flex-col items-center justify-center text-center text-white">
              <h2 className="font-heading text-3xl font-black tracking-widest uppercase mb-1 leading-[1.1]">
                {productSpotlightConfig.titlePhrases.slice(0, 2).join(" ")}
              </h2>
              <p className="font-body text-gray-400 text-xs mb-6 leading-relaxed">
                More is the only thing on the menu.
              </p>
              <button className="bg-white text-black font-semibold px-8 py-2.5 rounded-full text-sm uppercase hover:bg-gray-200 transition-colors">
                {productSpotlightConfig.ctaText}
              </button>
              <div className="flex gap-2 mt-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              </div>
           </div>
        </div>
        
        {/* Person image block */}
        <div className="relative w-full h-[80vh] mt-3">
           <img src={productSpotlightConfig.portraitImage} alt="Portrait" className="w-full h-[80vh] object-cover" loading="lazy" />
           <div className="absolute top-8 left-6 right-6 flex flex-col items-start gap-1">
             <span className="font-heading text-white bg-black/50 px-2 py-1 tracking-widest text-xs font-bold drop-shadow-md">
               ALL CONDITIONS MEANS ALL CONDITIONS.
             </span>
             <button className="bg-white text-black font-semibold font-body px-6 py-2.5 mt-3 rounded-full text-sm uppercase hover:bg-gray-200 transition-colors">
               Shop ACG
             </button>
           </div>
           
           <div className="absolute bottom-10 left-6 right-6 flex flex-col items-start gap-1">
             <span className="font-heading text-[#FF2D8F] tracking-widest text-sm font-bold drop-shadow-md">
               {productSpotlightConfig.titlePhrases.slice(4).join(" ")}
             </span>
             <h2 className="font-heading text-white text-3xl font-black leading-tight drop-shadow-md">
               RELENTLESS DRIVE
             </h2>
             <button className="bg-white text-black font-semibold font-body px-6 py-2 mt-2 rounded-full text-sm uppercase hover:bg-gray-200 transition-colors">
               Shop
             </button>
           </div>
        </div>
      </div>`;
replaceMobileLayout('ProductSpotlightSection', spotlightHtml);

// Nav Fix again: replacing the fixed top header so it stays nicely and looks exact
txt = txt.replace(
    /\{isMobile \? \([\s\S]*?<\/[sS][vV][gG]>[\s\S]*?<\/div>\\s*<\/div>\\s*\) : \(/,
    `{isMobile ? (
        <div className="fixed top-0 left-0 right-0 z-[100] flex w-full items-center justify-between px-5 py-5 bg-white shadow-sm border-b border-gray-100">
          <div className="font-heading text-[1.4rem] font-black tracking-tighter text-[#111111] leading-none mt-1">{navigationConfig.logo}</div>
          <div className="flex items-center gap-5">
            <User size={24} className="text-[#111111] cursor-pointer" strokeWidth={2.5} />
            <Search size={24} className="text-[#111111] cursor-pointer" strokeWidth={2.5} />
            <ShoppingBag size={24} className="text-[#111111] cursor-pointer" strokeWidth={2.5} />
            <Menu size={26} className="text-[#111111] cursor-pointer" strokeWidth={2.5} />
          </div>
        </div>
      ) : (`
);

fs.writeFileSync(file, txt);
console.log('Mobile layout updated via JSX modifications.');
