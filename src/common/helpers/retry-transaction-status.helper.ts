import { UnprocessableEntityException } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

/**
 * Extrae el status desde el mensaje de error lanzado por retryTransactionStatus.
 * Espera un formato tipo: "Transaction failed with status: DECLINED"
 */
export function extractStatusFromErrorMessage(
  message: string,
): TransactionStatus {
  const match = /Transaction failed with status: (\w+)/.exec(message);
  return (match?.[1] ?? 'ERROR') as TransactionStatus;
}

/**
 * Ejecuta el retry, actualiza el estado de la transacción y lanza el error si corresponde.
 */
export async function handleRetryAndUpdateStatus(
  wompiTransactionId: string,
  getStatusFn: () => Promise<string>,
  retries: number,
  delayMs: number,
  logger: WinstonLogger,
  updateStatus: (id: string, status: TransactionStatus) => Promise<unknown>,
): Promise<TransactionStatus> {
  try {
    const finalStatus = await retryTransactionStatus(
      getStatusFn,
      retries,
      delayMs,
      logger,
    );

    await updateStatus(wompiTransactionId, finalStatus as TransactionStatus);
    return finalStatus as TransactionStatus;
  } catch (error) {
    const status = extractStatusFromErrorMessage(error.message);
    await updateStatus(wompiTransactionId, status);
    throw error;
  }
}

/**
 * Ejecuta una función de estado con reintentos y delays configurables.
 */
export async function retryTransactionStatus(
  getStatusFn: () => Promise<string>,
  retries = 3,
  delayMs = 0,
  logger: WinstonLogger,
): Promise<string> {
  let status = 'PENDING';

  for (let attempt = 1; attempt <= retries; attempt++) {
    await new Promise((res) => setTimeout(res, delayMs));
    status = await getStatusFn();

    logger.log(`🔁 Retry ${attempt}: ${status}`);

    if (status !== 'PENDING') break;
  }

  if (status !== 'APPROVED') {
    throw new UnprocessableEntityException(
      `Transaction failed with status: ${status}`,
    );
  }

  return status;
}
