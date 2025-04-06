export async function retryTransactionStatus(
  getStatusFn: () => Promise<string>,
  retries = 3,
  delayMs = 3000,
  logger?: { log: (msg: string) => void },
): Promise<string> {
  let status = 'PENDING';

  for (let attempt = 1; attempt <= retries; attempt++) {
    await new Promise((res) => setTimeout(res, delayMs));
    const result = await getStatusFn();
    status = result;

    logger?.log(`🔁 Retry ${attempt}: ${status}`);

    if (status !== 'PENDING') break;
  }

  return status;
}
