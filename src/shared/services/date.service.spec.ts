import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    service = new DateService();
  });

  it('should return first letter of day (Monday → M)', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Monday');
    expect(service.getCurrentDayLetter()).toBe('M');
  });
});
