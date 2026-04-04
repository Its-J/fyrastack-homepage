<script lang="ts">
	const DOCS_LINK = '/docs';
</script>

<section class="border-b border-fyra-gray-800">
	<div class="flex flex-col items-center justify-center px-8 py-12 text-center lg:py-16">
		<p class="text-lg text-fyra-gray-300">
			Need a hand getting started?
		</p>
		<p class="mt-2 text-sm text-fyra-gray-400">Our docs walk you through it.</p>
		<a
			href={DOCS_LINK}
			class="mt-3 inline-flex items-center gap-2 text-base text-fyra-red-400 transition-colors hover:text-fyra-red-300"
		>
			Read the documentation
			<svg
				class="h-4 w-4"
				viewBox="0 0 10 10"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path d="M2 8 6 4M6 4 2 0M6 4h8" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</a>
	</div>
</section>
