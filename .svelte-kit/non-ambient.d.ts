
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/prereserve" | "/docs" | "/pricing" | "/services" | "/services/colocation" | "/services/vps";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/about": Record<string, never>;
			"/api": Record<string, never>;
			"/api/prereserve": Record<string, never>;
			"/docs": Record<string, never>;
			"/pricing": Record<string, never>;
			"/services": Record<string, never>;
			"/services/colocation": Record<string, never>;
			"/services/vps": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/api/prereserve" | "/docs" | "/pricing" | "/services/colocation" | "/services/vps";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/stack-pattern.svg" | "/.DS_Store" | "/dummy-vibecode-screenshot.png" | "/cubes.webp" | "/logo.png" | "/logo-text.svg" | "/minnesota.png" | "/logo-text.png" | "/fonts/Satoshi-VariableItalic.woff" | "/fonts/Satoshi-VariableItalic.ttf" | "/fonts/Satoshi-VariableItalic.woff2" | "/fonts/Satoshi-Variable.woff" | "/fonts/Satoshi-Variable.woff2" | "/fonts/Satoshi-Variable.ttf" | "/assets/um-pattern.svg" | "/assets/server-rack.png" | "/assets/stack-pattern.svg" | "/assets/.DS_Store" | "/assets/suzyqboard-pattern.svg" | "/assets/about.webp" | "/assets/map.svg" | "/assets/submarine-pattern.svg" | "/assets/conway.gif" | "/assets/consulting.webp" | "/assets/people/owen.webp" | "/assets/people/aikoyori.webp" | "/assets/people/riley.webp" | "/assets/people/mado.webp" | "/assets/people/mtr.webp" | "/assets/people/matteo.webp" | "/assets/people/june.webp" | "/assets/people/lains.webp" | "/assets/people/cappy.webp" | "/assets/people/mo.webp" | "/assets/people/infinitebash.webp" | "/assets/people/matilde.webp" | "/assets/people/kat.webp" | "/assets/people/raboneko.webp" | "/assets/people/trobo.webp" | "/assets/people/jade.webp" | "/assets/people/lleyton.webp" | "/assets/terra-pattern.svg" | "/assets/tau-pattern.svg" | "/assets/minnesota.png" | "/assets/chisel-operator-pattern.svg" | "/assets/skiff-desktop-pattern.svg" | "/logo.svg" | "/favicon.svg" | string & {};
	}
}