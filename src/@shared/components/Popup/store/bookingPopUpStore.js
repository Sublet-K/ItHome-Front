import { create } from 'zustand';
import { DateFormat } from '../../StaticComponents/StaticComponents';

export const bookingPopUpStore = create(set => ({
  startDay: DateFormat(Date.now()),
  endDay: DateFormat('2000.01.01'),
  dayPay: 1,
  totalPay: 2913136,
  postKey: '0',
  setTempStartDayState: day =>
    set(() => ({
      startDay: DateFormat(day),
    })),
  setTempEndDayState: day =>
    set(() => ({
      endDay: DateFormat(day),
    })),
  setDayPayState: pay =>
    set(() => ({
      dayPay: pay,
    })),
  setTotalPayState: pay =>
    set(() => ({
      totalPay: pay,
    })),
  setPostKey: key =>
    set(() => ({
      postKey: key,
    })),
}));
