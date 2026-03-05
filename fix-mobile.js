import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'src', 'App.tsx');

let content = fs.readFileSync(file, 'utf8');

// 1. Navigation Mobile
content = content.replace(
    /\{isMobile \? \([\s\S]*?<\/[sS][vV][gG]>[\s\S]*?<\/div>\s*<\/div>\s*\) : \(/,
    `{isMobile ? (
        <div className="flex w-full items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="font-heading text-xl font-black tracking-widest text-[#111111]">{navigationConfig.logo}</div>
          <div className="flex items-center gap-5">
            <Search size={22} className="text-[#111111] cursor-pointer" />
            <User size={22} className="text-[#111111] cursor-pointer" />
            <ShoppingBag size={22} className="text-[#111111] cursor-pointer" />
            <Menu size={24} className="text-[#111111] cursor-pointer" />
          </div>
        </div>
      ) : (`
);

// HeroSection GSAP mobile removal & responsive root fix
content = content.replace(
    /mm\.add\(\"\(max-width: 768px\)\", \(\) => \{[\s\S]*?0\.7\s*\);\s*\}\);/,
    `mm.add("(max-width: 768px)", () => {
        // No animation or pinning for mobile
      });`
);

content = content.replace(
    /className=\"section-pinned bg-lipstick-grey z-10\"/,
    `className="section-pinned md:h-screen h-auto bg-lipstick-grey z-10 w-full overflow-x-hidden"`
);

content = content.replace(
    /<div className=\"grid-checkerboard\">/,
    `<div className="hidden md:grid grid-checkerboard w-full h-full">\n        {/* Row 1 */}`
);

content = content.replace(
    /<\/section>/,
    `</div>
      
      {/* Mobile Stack Layout */}
      <div className="flex md:hidden flex-col w-full bg-white pt-[60px]">
        <div className="w-full h-[70vh] relative">
          <img src={heroConfig.heroImage} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-[#111111]/80 to-transparent" />
          <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-3">
            <span className="font-mono-label bg-[#ea2f32] text-white self-start px-3 py-1 text-xs">{heroConfig.subtitleLabel}</span>
            <h1 className="font-heading text-[3.5rem] text-white leading-[0.85] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{heroConfig.titleText}</h1>
          </div>
        </div>
        <div className="w-full p-6 bg-[#111111]">
          <button className="w-full bg-white text-[#111111] font-heading text-lg py-4 tracking-widest font-black uppercase shadow-lg shadow-white/10 active:scale-95 transition-transform">{heroConfig.ctaText}</button>
        </div>
      </div>
    </section>`
);

// Manifesto Section
let manifestoStart = content.indexOf('const ManifestoSection =');
let productStart = content.indexOf('const ProductSpotlightSection =');
if (manifestoStart !== -1 && productStart !== -1) {
    let manifestoChunk = content.substring(manifestoStart, productStart);

    manifestoChunk = manifestoChunk.replace(
        /mm\.add\(\"\(max-width: 768px\)\", \(\) => \{[\s\S]*?0\.7\s*\);\s*\}\);/,
        `mm.add("(max-width: 768px)", () => {});`
    );

    manifestoChunk = manifestoChunk.replace(
        /className=\"section-pinned bg-lipstick-grey z-20\"/,
        `className="section-pinned md:h-screen h-auto bg-lipstick-grey z-20 w-full overflow-x-hidden"`
    );

    manifestoChunk = manifestoChunk.replace(
        /<div className=\"grid-checkerboard\">/,
        `<div className="hidden md:grid grid-checkerboard w-full h-full">\n        {/* Row 1 */}`
    );

    manifestoChunk = manifestoChunk.replace(
        /<\/section>/,
        `</div>
      
      {/* Mobile Stack Layout */}
      <div className="flex md:hidden flex-col w-full bg-[#111111]">
        <div className="p-8 py-16 flex flex-wrap gap-x-3 gap-y-2">
          {manifestoConfig.phrases.map((phrase, i) => (
            <span key={i} className="font-heading text-4xl leading-[0.9] text-white uppercase">{phrase}</span>
          ))}
        </div>
        <div className="w-full aspect-[4/5] relative">
          <img src={manifestoConfig.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>`
    );

    content = content.substring(0, manifestoStart) + manifestoChunk + content.substring(productStart);
}

// ProductSpotlight Section
let spotlightStart = content.indexOf('const ProductSpotlightSection =');
let textureStart = content.indexOf('const TextureSection =');
if (spotlightStart !== -1 && textureStart !== -1) {
    let spotlightChunk = content.substring(spotlightStart, textureStart);

    spotlightChunk = spotlightChunk.replace(
        /mm\.add\(\"\(max-width: 768px\)\", \(\) => \{[\s\S]*?0\.7\s*\);\s*\}\);/,
        `mm.add("(max-width: 768px)", () => {});`
    );

    spotlightChunk = spotlightChunk.replace(
        /className=\"section-pinned bg-lipstick-grey z-30\"/,
        `className="section-pinned md:h-[140vh] h-auto bg-lipstick-grey z-30 w-full overflow-x-hidden"`
    );

    spotlightChunk = spotlightChunk.replace(
        /<div className=\"grid-checkerboard\">/,
        `<div className="hidden md:grid grid-checkerboard w-full h-full">\n        {/* Row 1 */}`
    );

    spotlightChunk = spotlightChunk.replace(
        /<\/section>/,
        `</div>
      
      {/* Mobile Stack Layout */}
      <div className="flex md:hidden flex-col w-full bg-white">
        <div className="relative aspect-[4/5] w-full bg-[#111111]">
           <img src={productSpotlightConfig.portraitImage} alt="" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" loading="lazy" />
           <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-[#111111] via-transparent to-transparent">
             <div className="flex flex-wrap gap-x-2 gap-y-1">
               {productSpotlightConfig.titlePhrases.map((phrase, i) => (
                 <span key={i} className="font-heading text-3xl leading-[0.9] text-white uppercase">{phrase}</span>
               ))}
             </div>
           </div>
        </div>
        <div className="p-8 bg-[#111111]">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono-label text-white/50">PRO PERFORMANCE</span>
            <p className="font-heading font-black text-[#ea2f32] text-3xl">{productSpotlightConfig.price}</p>
          </div>
          <button className="w-full bg-[#ea2f32] text-white font-heading text-lg py-4 tracking-widest uppercase active:scale-95 transition-transform shadow-[0_0_20px_rgba(234,47,50,0.3)]">{productSpotlightConfig.ctaText}</button>
        </div>
        <div className="relative w-full p-4 flex items-center justify-center bg-[#F2F2F2]">
          <img src={productSpotlightConfig.productImage} alt="" className="w-full max-w-[90%] object-contain" loading="lazy" />
        </div>
      </div>
    </section>`
    );

    content = content.substring(0, spotlightStart) + spotlightChunk + content.substring(textureStart);
}

// Texture Section
let texStart = content.indexOf('const TextureSection =');
let shadeStart = content.indexOf('const ShadeRangeSection =');
if (texStart !== -1 && shadeStart !== -1) {
    let texChunk = content.substring(texStart, shadeStart);

    texChunk = texChunk.replace(
        /mm\.add\(\"\(max-width: 768px\)\", \(\) => \{[\s\S]*?0\.7\s*\);\s*\}\);/,
        `mm.add("(max-width: 768px)", () => {});`
    );

    texChunk = texChunk.replace(
        /className=\"section-pinned bg-lipstick-grey z-40 flex items-center justify-center\"/,
        `className="section-pinned md:h-[130vh] h-auto bg-lipstick-grey z-40 w-full overflow-x-hidden flex items-center justify-center"`
    );

    texChunk = texChunk.replace(
        /className=\"flex md:hidden flex-col w-full h-\[100dvh\]\"/,
        `className="flex md:hidden flex-col w-full h-auto"`
    );

    texChunk = texChunk.replace(
        /<div className=\"flex md:hidden flex-col w-full h-auto\">[\s\S]*?<\/div>\s*<\/section>/,
        `<div className="flex md:hidden flex-col w-full h-auto">
        <div className="w-full aspect-[4/5] bg-[#111111] overflow-hidden relative">
          <img src={textureConfig.macroImage} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute bottom-6 left-6 right-6">
             <span className="font-mono-label bg-white text-[#111111] px-3 py-1 text-xs">{textureConfig.subtitle}</span>
          </div>
        </div>
        <div className="py-12 bg-[#ea2f32] flex items-center justify-center px-6 text-center">
          <h2 className="font-heading text-white text-[2.5rem] font-bold leading-tight flex flex-col">
            <span>{textureConfig.titlePhrases[0]} {textureConfig.titlePhrases[1]} {textureConfig.titlePhrases[2]} {textureConfig.titlePhrases[3]}</span>
            <span className="mt-2 opacity-80 italic">{textureConfig.titlePhrases[4]} {textureConfig.titlePhrases[5]}</span>
          </h2>
        </div>
        <div className="w-full aspect-[4/5] bg-[#111111] overflow-hidden">
          <img src={textureConfig.portraitImage} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
        </div>
      </div>
    </section>`
    );

    content = content.substring(0, texStart) + texChunk + content.substring(shadeStart);
}

// Final Statement Section
let finalStart = content.indexOf('const FinalStatementSection =');
let contactStart = content.indexOf('const ContactSection =');
if (finalStart !== -1 && contactStart !== -1) {
    let finalChunk = content.substring(finalStart, contactStart);

    finalChunk = finalChunk.replace(
        /mm\.add\(\"\(max-width: 768px\)\", \(\) => \{[\s\S]*?0\.7\s*\);\s*\}\);/,
        `mm.add("(max-width: 768px)", () => {});`
    );

    finalChunk = finalChunk.replace(
        /className=\"section-pinned bg-lipstick-grey z-\[60\]\"/,
        `className="section-pinned md:h-[120vh] h-auto bg-lipstick-grey z-[60] w-full overflow-x-hidden"`
    );

    finalChunk = finalChunk.replace(
        /<div className=\"grid-checkerboard\">/,
        `<div className="hidden md:grid grid-checkerboard w-full h-full">\n        {/* Row 1 */}`
    );

    finalChunk = finalChunk.replace(
        /<\/section>/,
        `</div>
      
      {/* Mobile Stack Layout */}
      <div className="flex md:hidden flex-col w-full bg-[#111111]">
        <div className="relative aspect-square w-full filter grayscale hover:grayscale-0 transition-all duration-700">
          <img src={finalStatementConfig.image1} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-8 py-16 flex flex-col gap-8 bg-[#111111] text-center items-center justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10 relative">
          <div className="flex gap-x-2 gap-y-1 justify-center flex-wrap">
            {finalStatementConfig.phrases.map((phrase, i) => (
              <span key={i} className={\`font-heading text-4xl leading-[1] uppercase \${i > 2 ? 'text-[#ea2f32]' : 'text-white'}\`}>{phrase}</span>
            ))}
          </div>
          <p className="font-mono-label text-white/50 tracking-widest leading-relaxed mt-4">{finalStatementConfig.subtitle}</p>
        </div>
        <div className="relative aspect-[4/5] w-full opacity-90">
          <img src={finalStatementConfig.image2} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>
      </div>
    </section>`
    );

    content = content.substring(0, finalStart) + finalChunk + content.substring(contactStart);
}

fs.writeFileSync(file, content);
console.log('App.tsx mobile view updated!');
