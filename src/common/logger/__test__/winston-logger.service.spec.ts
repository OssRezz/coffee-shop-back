import { WinstonLogger } from '../winston-logger.service';
import * as winston from 'winston';

describe('WinstonLogger', () => {
  let logger: WinstonLogger;
  let mockLogger: {
    info: jest.Mock;
    error: jest.Mock;
    warn: jest.Mock;
    debug: jest.Mock;
    verbose: jest.Mock;
  };

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };

    jest.spyOn(winston, 'createLogger').mockReturnValue(mockLogger as any);
    logger = new WinstonLogger();
  });

  it('should call logger.info on log()', () => {
    logger.log('Hello world');
    expect(mockLogger.info).toHaveBeenCalledWith('Hello world');
  });

  it('should call logger.error on error()', () => {
    logger.error('Something went wrong', 'stack');
    expect(mockLogger.error).toHaveBeenCalledWith('Something went wrong stack');
  });

  it('should call logger.warn on warn()', () => {
    logger.warn('Careful!');
    expect(mockLogger.warn).toHaveBeenCalledWith('Careful!');
  });

  it('should call logger.debug on debug()', () => {
    logger.debug?.('Debugging...');
    expect(mockLogger.debug).toHaveBeenCalledWith('Debugging...');
  });

  it('should call logger.verbose on verbose()', () => {
    logger.verbose?.('Verbose msg');
    expect(mockLogger.verbose).toHaveBeenCalledWith('Verbose msg');
  });
});
