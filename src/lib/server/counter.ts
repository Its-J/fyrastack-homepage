import { getRequestEvent } from '$app/server';

const COUNTER_KEY = 'prereserve-counter';

interface CounterData {
	count: number;
	totalMonthly: number;
}

function parse(data: CounterData | null): CounterData {
	if (!data) return { count: 0, totalMonthly: 0 };

	return {
		count: typeof data.count === 'number' ? data.count : 0,
		totalMonthly: typeof data.totalMonthly === 'number' ? data.totalMonthly : 0
	};
}

function getCounterStore(): KVNamespace {
	const event = getRequestEvent();
	const store = event.platform?.env.PRERESERVE_COUNTERS;

	if (!store) {
		throw new Error('PRERESERVE_COUNTERS KV binding is not configured.');
	}

	return store;
}

async function read(store: KVNamespace): Promise<CounterData> {
	try {
		return parse(await store.get<CounterData>(COUNTER_KEY, 'json'));
	} catch {
		return { count: 0, totalMonthly: 0 };
	}
}

async function write(store: KVNamespace, data: CounterData): Promise<void> {
	await store.put(COUNTER_KEY, JSON.stringify(data));
}

export async function recordSubmission(
	pricePerMonth: number
): Promise<{ submissionNumber: number; totalMonthly: number }> {
	const store = getCounterStore();
	const current = await read(store);
	const next: CounterData = {
		count: current.count + 1,
		totalMonthly: current.totalMonthly + pricePerMonth
	};

	await write(store, next);

	return { submissionNumber: next.count, totalMonthly: next.totalMonthly };
}
