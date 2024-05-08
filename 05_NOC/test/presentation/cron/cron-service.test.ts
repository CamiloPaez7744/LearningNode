import { CronService } from '../../../src/presentation/cron/cron-service';


describe('cron-service', () => {

    const mockTick = jest.fn();

    it('should create a cron job', (done) => {

        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            expect(mockTick).toBeCalledTimes(2);
            job.stop();
            done();
        }, 2000);
    });
});