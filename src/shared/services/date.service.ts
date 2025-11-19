import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getCurrentDay(): string {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()] ?? 'Sunday';
  }

  getCurrentDayLetter(): string {
   const currentDay = this.getCurrentDay().trim();
   return currentDay.charAt(0).toUpperCase();
  }
}


