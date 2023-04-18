import { Greeting } from './../src/greeting';

describe("test greeting class", () => {
    it("greeting 1", () => {
        const g = new Greeting('world');
        const spyDateFn = jest.spyOn(g as any, 'now').mockReturnValue(new Date(2020, 1, 1));

        expect(g.greet()).toContain('Hello, world');
        expect(g.greet()).toContain('Feb 01 2020');

        expect(spyDateFn).toBeCalledTimes(2);
    });

    it("delayGreet", () => {
        const g = new Greeting('world');
        const originNowFn = g['now'];

        const spyDateFn = jest.spyOn(g as any, 'now').mockReturnValue(new Date(2020, 1, 1));
        
        expect(g['now']).not.toBe(originNowFn);
        expect(g['now']).toBe(spyDateFn)

        return g.delayGreet(50).then((ret) => {
            expect(ret).toContain('Hello, world');
            
            expect(spyDateFn).toBeCalledTimes(1);
        });
    });

    it("delayGreet 2", () => {
        jest.useFakeTimers();

        const g = new Greeting('world');

        const greetSpyFn = jest.spyOn(g, 'greet').mockReturnValue('mocked greet');

        g.delayGreet(30000).then((ret) => {
            // expect(spyDateFn).toHaveBeenCalled();
            console.log('>>>>>>>>>', ret);
            expect(ret).toBe('mocked greet');
            expect(ret).toBe(g.lastGreetMsg);
        });

        // jest.advanceTimersByTime(50000);
        jest.runAllTimers()

        expect(greetSpyFn).toHaveBeenCalled();
    });
  });