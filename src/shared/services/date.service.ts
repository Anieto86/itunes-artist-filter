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
   const dayAbbreviations: { [key: string]: string } = {
     'Sunday': 'Su',
     'Monday': 'Mo',
     'Tuesday': 'Tu',
     'Wednesday': 'We',
     'Thursday': 'Th',
     'Friday': 'Fr',
     'Saturday': 'Sa'
   };
   return dayAbbreviations[currentDay] || currentDay.substring(0, 2);
  }
}
