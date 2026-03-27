<script lang="ts">
	import { onMount, tick } from 'svelte';

	type LineCls = 'output' | 'system' | 'dim' | 'success';
	type TermLine =
		| { kind: 'cmd'; prompt: 'local' | 'remote'; text: string }
		| { kind: 'output'; text: string; cls: LineCls }
		| { kind: 'blank' };

	let lines = $state<TermLine[]>([]);
	let currentText = $state('');
	let currentPrompt = $state<'local' | 'remote' | 'inline'>('local');
	let inlinePrefix = $state('');
	let showCursor = $state(true);
	let termEl = $state<HTMLDivElement | null>(null);

	// Scroll after every DOM update caused by visible content changes
	$effect(() => {
		void lines.length;
		void currentText;
		void inlinePrefix;
		tick().then(() => {
			if (termEl) termEl.scrollTop = termEl.scrollHeight;
		});
	});

	const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

	// Type + commit in one call — no manual currentPrompt juggling
	async function cmd(prompt: 'local' | 'remote', text: string, speed = 48) {
		currentPrompt = prompt;
		for (const ch of text) {
			currentText += ch;
			await sleep(speed + (Math.random() * 20 - 10));
		}
		await sleep(130 + Math.random() * 60);
		lines.push({ kind: 'cmd', prompt, text: currentText });
		currentText = '';
	}

	function out(text: string, cls: LineCls = 'output') {
		lines.push({ kind: 'output', text, cls });
	}
	function blank() {
		lines.push({ kind: 'blank' });
	}
	function clear() {
		lines = [];
		currentText = '';
	}

	onMount(() => {
		const cursor = setInterval(() => {
			showCursor = !showCursor;
		}, 530);
		animate();
		return () => clearInterval(cursor);
	});

	async function animate() {
		while (true) {
			clear();
			currentPrompt = 'local';
			inlinePrefix = '';
			await sleep(600);

			// ssh
			await cmd('local', 'ssh deploy@msp1.fyrastack.com');
			await sleep(850);

			out(
				"The authenticity of host 'msp1.fyrastack.com (45.61.185.22)' can't be established.",
				'system'
			);
			out('ED25519 key fingerprint is SHA256:p8vZ3kLmNqXtYwAbCdEfGh0IjKoP5s7uV9xYzQr.', 'system');
			out('This key is not known by any other names.', 'system');
			await sleep(400);

			// inline yes/no prompt
			inlinePrefix = 'Are you sure you want to continue connecting (yes/no/[fingerprint])? ';
			currentPrompt = 'inline';
			await sleep(900);
			for (const ch of 'yes') {
				currentText += ch;
				await sleep(80 + (Math.random() * 20 - 10));
			}
			await sleep(180);
			out(inlinePrefix + currentText, 'system');
			currentText = '';
			inlinePrefix = '';
			currentPrompt = 'remote';
			await sleep(500);

			out(
				"Warning: Permanently added 'msp1.fyrastack.com' (ED25519) to the list of known hosts.",
				'dim'
			);
			await sleep(700);

			// MOTD
			blank();
			out('  Welcome to msp1.fyrastack.com', 'success');
			out('  Ultramarine Linux 41 — Kernel 6.11.8-300.fc41.x86_64');
			blank();
			out('  Load:    0.12, 0.18, 0.21        Uptime:  47 days, 3:14', 'dim');
			out('  Memory:  1.2G / 4.0G (30% used)  Disk:    18G / 40G (45% used)', 'dim');
			blank();
			out('Last login: Mon Mar  3 09:41:22 2026 from 192.168.1.42', 'dim');
			blank();
			await sleep(700);

			await cmd('remote', 'uname -a');
			await sleep(220);
			out(
				'Linux msp1 6.11.8-300.fc41.x86_64 #1 SMP PREEMPT_DYNAMIC Thu Nov 14 18:02:31 UTC 2025 x86_64 GNU/Linux'
			);
			blank();
			await sleep(1000);

			await cmd('remote', 'df -h /');
			await sleep(220);
			out('Filesystem      Size  Used Avail Use% Mounted on', 'dim');
			out('/dev/sda1        40G   18G   20G  47% /');
			blank();
			await sleep(1000);

			await cmd('remote', 'free -m');
			await sleep(220);
			out(
				'               total        used        free      shared  buff/cache   available',
				'dim'
			);
			out('Mem:            3929        1204         891          42        1833        2476');
			out('Swap:              0           0           0');
			blank();
			await sleep(1000);

			await cmd('remote', 'systemctl status caddy --no-pager');
			await sleep(300);
			out('● caddy.service - Caddy');
			out(
				'     Loaded: loaded (/usr/lib/systemd/system/caddy.service; enabled; preset: enabled)',
				'dim'
			);
			out(
				'     Active: active (running) since Wed 2026-01-14 10:08:03 CST; 47 days ago',
				'success'
			);
			out(
				'    Process: 1241 ExecStartPre=/usr/bin/caddy validate --config /etc/caddy/Caddyfile',
				'dim'
			);
			out('   Main PID: 1247 (caddy)', 'dim');
			out('      Tasks: 9 (limit: 4688)', 'dim');
			out('     Memory: 24.1M', 'dim');
			out('        CPU: 3min 12.804s', 'dim');
			blank();
			await sleep(1200);

			await cmd('remote', 'exit');
			await sleep(350);
			out('logout', 'dim');
			out('Connection to msp1.fyrastack.com closed.', 'dim');
			blank();
			currentPrompt = 'local';
			await sleep(1800);

			await cmd('local', 'clear');
			await sleep(120);
			clear();

			await sleep(5000);
		}
	}

	const clsMap: Record<LineCls, string> = {
		output: 'text-fyra-gray-300',
		system: 'text-fyra-gray-400',
		dim: 'text-fyra-gray-500',
		success: 'text-emerald-500'
	};
</script>

<section class="border-b border-fyra-gray-800">
	<div class="bg-fyra-gray-900">
		<div
			bind:this={termEl}
			class="scrollbar-none h-96 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
		>
			{#each lines as line, i (`${line.kind}-${i}`)}
				{#if line.kind === 'blank'}
					<div class="h-3"></div>
				{:else if line.kind === 'cmd'}
					<div class="flex flex-wrap">
						{#if line.prompt === 'local'}
							<span class="text-fyra-gray-600 select-none">$&nbsp;</span>
						{:else}
							<span class="text-fyra-gray-600 select-none">deploy@</span><span
								class="text-fyra-red-500 select-none">msp1</span
							><span class="text-fyra-gray-700 select-none">:~$&nbsp;</span>
						{/if}
						<span class="text-fyra-gray-100">{line.text}</span>
					</div>
				{:else}
					<div class={clsMap[line.cls]}>{line.text}</div>
				{/if}
			{/each}

			<!-- Active line -->
			<div class="flex items-center">
				{#if currentPrompt === 'local'}
					<span class="text-fyra-gray-600 select-none">$&nbsp;</span>
				{:else if currentPrompt === 'remote'}
					<span class="text-fyra-gray-600 select-none">deploy@</span><span
						class="text-fyra-red-500 select-none">msp1</span
					><span class="text-fyra-gray-700 select-none">:~$&nbsp;</span>
				{:else}
					<span class="text-fyra-gray-500 select-none">{inlinePrefix.trimEnd()}&nbsp;</span>
				{/if}
				<span class="text-fyra-gray-100">{currentText}</span>
				<span
					class="ml-px inline-block h-[1em] w-[0.5em] translate-y-[0.05em] {showCursor
						? 'bg-fyra-gray-400'
						: 'bg-transparent'}"
				></span>
			</div>
		</div>
	</div>
</section>
