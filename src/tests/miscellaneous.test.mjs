import { getConfig } from '../config/config.mjs';
import { getCreptoConfig, isEmptyObject, sleep } from '../utils/miscellaneous.mjs';

describe('Test functions in miscellaneous', () => {

    describe('sleep function', () => {
        // Mocking setTimeout for more controlled testing
        jest.useFakeTimers();

        it('should resolve after the specified time', () => {
            const ms = 500;
            const sleepPromise = sleep(ms);

            // Fast-forward time by 'ms' milliseconds
            jest.advanceTimersByTime(ms);

            // Run any pending timers (like those created by setTimeout)
            jest.runOnlyPendingTimers();

            // Expect the promise to resolve
            return expect(sleepPromise).resolves.toBeUndefined();
        });

        it('should delay execution for the specified duration', async () => {
            jest.useRealTimers(); // Use real timers for this test case

            const startTime = Date.now();
            const delay = 100; // 100 milliseconds

            await sleep(delay);
            const endTime = Date.now();

            expect(endTime - startTime).toBeGreaterThanOrEqual(delay - 1);

            jest.useFakeTimers(); // Switch back to fake timers if needed for other tests
        });
    });


    describe('isEmptyObject', () => {
        test('should return true for an empty object', () => {
            expect(isEmptyObject({})).toBe(true);
        });

        test('should return false for a non-empty object', () => {
            expect(isEmptyObject({ key: 'value' })).toBe(false);
        });

        test('should return false for null', () => {
            expect(isEmptyObject(null)).toBe(false);
        });

        test('should return false for undefined', () => {
            expect(isEmptyObject(undefined)).toBe(false);
        });

        test('should return false for an array', () => {
            expect(isEmptyObject([])).toBe(false);
        });

        test('should return false for a number', () => {
            expect(isEmptyObject(123)).toBe(false);
        });

        test('should return false for a string', () => {
            expect(isEmptyObject('test')).toBe(false);
        });

        test('should return false for a boolean', () => {
            expect(isEmptyObject(true)).toBe(false);
        });

        test('should return true for an object created with no properties', () => {
            const obj = Object.create(null);
            expect(isEmptyObject(obj)).toBe(true);
        });
    });


    describe('getCreptoConfig', () => {
        test('should return correct config when SECRET_KEY is defined', () => {

            const originalConfig = getConfig();

            const config = getCreptoConfig();

            // Assert: Verify the configuration
            expect(config).toEqual({
                algorithm: 'aes-256-ctr',
                secretKey: Buffer.from(originalConfig.secretKey, 'hex')
            });
        });
    });
});
