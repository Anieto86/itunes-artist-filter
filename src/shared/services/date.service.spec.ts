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

  it('should return first letter of day (Tuesday → T)', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Tuesday');
    expect(service.getCurrentDayLetter()).toBe('T');
  });

  it('should return first letter of day (Wednesday → W)', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Wednesday');
    expect(service.getCurrentDayLetter()).toBe('W');
  });

  it('should return first letter of day (Thursday → T)', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Thursday');
    expect(service.getCurrentDayLetter()).toBe('T');
  });

  it('should return first letter of day (Friday → F)', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Friday');
    expect(service.getCurrentDayLetter()).toBe('F');
  });

  it('should return first letter of day (Saturday → S )', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Saturday');
    expect(service.getCurrentDayLetter()).toBe('S');
  });

  it('should return first letter of day (Sunday → S )', () => {
    jest.spyOn(service, 'getCurrentDay').mockReturnValue('Sunday');
    expect(service.getCurrentDayLetter()).toBe('S');
  });
});
