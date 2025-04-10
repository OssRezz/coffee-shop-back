import { extractStatusFromErrorMessage, retryTransactionStatus, handleRetryAndUpdateStatus } from '../retry-transaction-status.helper';
import { UnprocessableEntityException } from '@nestjs/common';
import { WinstonLogger } from 'src/common/logger/winston-logger.service'; // Importa primero WinstonLogger

// Mocks para WinstonLogger
class MockWinstonLogger {
  log = jest.fn();
  error = jest.fn();
  warn = jest.fn();
  debug = jest.fn();
  verbose = jest.fn();
}

// Mock de la importación de WinstonLogger
beforeAll(() => {
  jest.mock('src/common/logger/winston-logger.service', () => {
    return {
      WinstonLogger: MockWinstonLogger, // Hacemos el mock después de que MockWinstonLogger esté definido
    };
  });
});

describe('extractStatusFromErrorMessage', () => {
  it('should extract status from valid error message', () => {
    const msg = 'Transaction failed with status: DECLINED';
    expect(extractStatusFromErrorMessage(msg)).toBe('DECLINED');
  });

  it('should return ERROR if status not found', () => {
    const msg = 'Some unknown error';
    expect(extractStatusFromErrorMessage(msg)).toBe('ERROR');
  });
});

describe('retryTransactionStatus', () => {
  it('should resolve immediately if status is APPROVED', async () => {
    const fn = jest.fn().mockResolvedValue('APPROVED');
    const logger = new WinstonLogger(); // Creamos una instancia del mock

    const result = await retryTransactionStatus(fn, 3, 0, logger);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result).toBe('APPROVED');
  });

  it('should retry 3 times and throw if final status is DECLINED', async () => {
    const fn = jest.fn().mockResolvedValue('PENDING');
    fn.mockResolvedValueOnce('PENDING');
    fn.mockResolvedValueOnce('PENDING');
    fn.mockResolvedValueOnce('DECLINED');

    const logger = new WinstonLogger(); // Creamos una instancia del mock

    await expect(retryTransactionStatus(fn, 3, 0, logger)).rejects.toThrow(
      new UnprocessableEntityException('Transaction failed with status: DECLINED'),
    );

    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('handleRetryAndUpdateStatus', () => {
  it('should update status and return APPROVED if retry succeeds', async () => {
    const getStatus = jest.fn().mockResolvedValue('APPROVED');
    const updateStatus = jest.fn();
    const logger = new WinstonLogger(); // Creamos una instancia del mock

    const result = await handleRetryAndUpdateStatus(
      'txn_123',
      getStatus,
      3,
      0,
      logger,
      updateStatus,
    );

    expect(getStatus).toHaveBeenCalledTimes(1);
    expect(updateStatus).toHaveBeenCalledWith('txn_123', 'APPROVED');
    expect(result).toBe('APPROVED');
  });

  it('should update status to DECLINED if retry fails and rethrows', async () => {
    const getStatus = jest
      .fn()
      .mockResolvedValueOnce('PENDING')
      .mockResolvedValueOnce('DECLINED');

    const updateStatus = jest.fn();
    const logger = new WinstonLogger(); // Creamos una instancia del mock

    await expect(
      handleRetryAndUpdateStatus('txn_456', getStatus, 2, 0, logger, updateStatus),
    ).rejects.toThrow('Transaction failed with status: DECLINED');

    expect(updateStatus).toHaveBeenCalledWith('txn_456', 'DECLINED');
  });
});
