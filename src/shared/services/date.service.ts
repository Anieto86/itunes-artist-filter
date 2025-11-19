import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getCurrentDay(): string {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  }

  getCurrentDayLetter(): string {
   const currentDay = this.getCurrentDay();
   return currentDay.charAt(0);
  }
}


// todo  need to solve the issue whit Tuesday Thursday there are two T letters
