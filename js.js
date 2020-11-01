"use strict"

/*
  TODO: Сделать вывод название месяца и года (ГОТОВО)
  TODO: Сделать вывод дней недели (ГОТОВО)
  TODO: Сделать вывод всех чисел в месяцев (ГОТОВО)
  TODO: Сделать стрелки вправо и влево для переключения месяца и года

  * CLASESS:
  * calendar-container
  * calendar-container__header
  * calendar-container__day
  * calendar-container__date
  * calendar-container__clear
  * calendar-container__accept
  
  ? new Date(year, month, date)
  */

  class Calendar {

    constructor(year = "currentYear", month = "currentMonth", date = "currentDate") {
      this.date = new Date();

      if (year === "currentYear") {
        this.currentFullYear = this.date.getFullYear();
      } else {
        this.date.setFullYear(year)
        this.currentFullYear = this.date.getFullYear();
      }

      if (month === "currentMonth") {
        this.currentMonth = this.date.getMonth();
      } else {
        this.date.setMonth(month);
        this.currentMonth = this.date.getMonth();
      }

      if (date === "currentDate") {
        this.currentDate = this.date.getDate();
      } else {
        this.date.setDate(date);
        this.currentDate = this.date.getDate();
      }
    }

    draw() {
      let calendarContainer,
          calendarContainerHeader,
          calendarContainerDay,
          calendarContainerDate,
          calendarContainerClear,
          calendarContainerAccept;

      calendarContainer = document.querySelector(".calendar-container");

      drawTag(calendarContainerHeader, "calendar-container__header", this.getNameMonth(this.currentMonth) +" "+ this.currentFullYear);
      
      for (let i = 1; i <= 7; i++) {
        drawTag(calendarContainerDay, "calendar-container__day", this.getNameDay(i));
      }

      /*
        TODO: Узнать в какой день недели начало текущего месяца (Готово)
        TODO: Узнать сколько нужно вывести дней прошлого месяца (Готово)
        TODO: 
        TODO: 
        TODO: 
      */
      let countDate, firstDayCurrentMonth, countDatePastMonthInStartCurrentMonth;
      
      countDate = 35; // Количество чисел для вывода календаря

      /*
        Пример:
          Пусть текущая дата будет 01.11.2020 (1 Ноября 2020 года).
          Работа алгоритма:
          firstDayCurrentMonth = 7 (1-ое ноября 2020 года это воскресенье, 7-ой день недели, в объекте Date это 0, поэтому смело присваиваем 7)
      */

      /* 
        * Первый день недели в текущем месяце.
        Зная в какой день недели начинается месяц, мы можем определить,
        сколько дней прошлого месяца нужно вывести.
      */
      this.date.setDate(1); // Жестко переводим текущий месяц на 1-ое число.
      firstDayCurrentMonth = Number( this.date.getDay( this.date.getDate() ) ); // Получаем число, обозначающее день недели, 1-го числа текущего месяца.
      if (firstDayCurrentMonth === 0) {
        firstDayCurrentMonth = 7;
      }
      this.date.setDate(this.currentDate);

      countDatePastMonthInStartCurrentMonth = firstDayCurrentMonth - 1;
      if (countDatePastMonthInStartCurrentMonth > 0) {
        countDatePastMonthInStartCurrentMonth = -(countDatePastMonthInStartCurrentMonth - 1);
        if (countDatePastMonthInStartCurrentMonth === -0) {
          countDatePastMonthInStartCurrentMonth = 0;
        }
      }

      let j = countDatePastMonthInStartCurrentMonth;
      countDate += countDatePastMonthInStartCurrentMonth;

      if (firstDayCurrentMonth === 1 && countDatePastMonthInStartCurrentMonth === 0) {
        j++;
      } else {
        countDate--;
      }

      for (;j <= countDate; j++) {
        // Изменяя число *Date, меняется и месяц *Month.
        this.date.setMonth(this.currentMonth);
        this.date.setDate(j);
        drawTag(calendarContainerDate, "calendar-container__date", this.date.getDate());
      }
    
      drawTag(calendarContainerClear, "calendar-container__clear", "Очистить", "button");
      drawTag(calendarContainerAccept, "calendar-container__accept", "Принять", "button");

      function drawTag(tag, className, data, element = "div") {
        tag = document.createElement(element);
        tag.className = String(className).trim();
        tag.innerHTML = data;
        calendarContainer.append(tag);
      }
    }

    getNameDay(day) {
      let dayNumber = Number(day);

      switch (dayNumber) {
        case 7:
          return "Вс";
        break;
        case 1:
          return "Пн";
        break;
        case 2:
          return "Вт";
        break;
        case 3:
          return "Ср";
        break;
        case 4:
          return "Чт";
        break;
        case 5:
          return "Пт";
        break;
        case 6:
          return "Сб";
        break;
      }

    }

    getNameMonth(month) {
      let monthNumber = Number(month);
    
      switch (monthNumber) {
        case 0: 
          return "Январь";
        break;
        case 1: 
          return "Февраль";
        break;
        case 2: 
          return "Март";
        break;
        case 3: 
          return "Апрель";
        break;
        case 4: 
          return "Май";
        break;
        case 5: 
          return "Июнь";
        break;
        case 6: 
          return "Июль";
        break;
        case 7: 
          return "Август";
        break;
        case 8: 
          return "Сентябрь";
        break;
        case 9: 
          return "Октябрь";
        break;
        case 10: 
          return "Ноябрь";
        break;
        case 11: 
          return "Декабрь";
        break;
      }
      
    }

  }

window.onload = function() {
  let calendar = new Calendar(2020, 0, 4);
  calendar.draw();
}




