import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'src', 'App.tsx');
let txt = fs.readFileSync(file, 'utf8');

function fixMobileGsapAndCheckerboard(componentName) {
    let start = txt.indexOf('const ' + componentName + ' =');
    if (start === -1) return;
    let nextComponent = txt.indexOf('const ', start + 10);
    let chunk = txt.substring(start, nextComponent !== -1 ? nextComponent : txt.length);

    // Make sure we have useIsMobile available in the component!
    if (chunk.indexOf('const isMobile = useIsMobile();') === -1) {
        chunk = chunk.replace('const sectionRef = useRef<HTMLDivElement>(null);',
            'const sectionRef = useRef<HTMLDivElement>(null);\n  const isMobile = useIsMobile();');
    }

    // Make sure useLayoutEffect bails out for mobile! This disables GSAP and pinning entirely for mobile.
    // We need to look for `const section = sectionRef.current;` inside useLayoutEffect
    chunk = chunk.replace(/useLayoutEffect\(\(\) => \{\s*const section = sectionRef\.current;\s*if \(!section\) return;/,
        'useLayoutEffect(() => {\n    if (isMobile) return;\n    const section = sectionRef.current;\n    if (!section) return;');

    // Now, wrap the entire grid-checkerboard in {!isMobile} condition!
    let gridStart = chunk.indexOf('<div className="hidden md:grid grid-checkerboard w-full h-full">');
    if (gridStart !== -1) {
        let mobileStackStart = chunk.indexOf('{/* Mobile Stack Layout */}');
        if (mobileStackStart !== -1) {
            // Find the closing div of the grid-checkerboard
            let gridHtml = chunk.substring(gridStart, mobileStackStart);
            // It includes `</div>` and some whitespace at the end.
            chunk = chunk.substring(0, gridStart) + '{!isMobile && (\n        ' + gridHtml.replace('hidden md:grid', 'grid').replace(/<\/div>\s*$/, '\n        </div>\n      )}\n      ') + chunk.substring(mobileStackStart);
        }
    }

    // Also replace `section-pinned md:h-screen h-auto bg-lipstick-grey z-XX w-full overflow-x-hidden`
    // with something that doesn't mess up height on mobile when unpinned. For mobile, it should just be regular flow!
    chunk = chunk.replace(/className=\"section-pinned md:(.*?)\"/g, 'className={`relative w-full ${!isMobile ? "section-pinned $1" : "bg-white"}`}');

    txt = txt.substring(0, start) + chunk + txt.substring(nextComponent !== -1 ? nextComponent : txt.length);
}

fixMobileGsapAndCheckerboard('HeroSection');
fixMobileGsapAndCheckerboard('ManifestoSection');
fixMobileGsapAndCheckerboard('ProductSpotlightSection');
fixMobileGsapAndCheckerboard('TextureSection');
fixMobileGsapAndCheckerboard('FinalStatementSection');

fs.writeFileSync(file, txt);
console.log('Mobile layout and GSAP fixes applied correctly.');
