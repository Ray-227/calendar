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
      this.getFullDate(year, month, date);
      this.drawCalendar();
    }

    getFullDate(year, month, date) {
      if (year === "currentYear") {
        this.currentFullYear = this.date.getFullYear();
      } else if (typeof(year) === "number") {
        this.date.setFullYear(year);
        this.currentFullYear = this.date.getFullYear();
      } else {
        this.drawTag("Error Year: Неправильно введён год", ".calendar-container", "calendar-container__header");
        return {"Error Year": "Неправильно введён год"};
      }

      if (month === "currentMonth") {
        this.currentMonth = this.date.getMonth();
      } else if (typeof(month) === "number") {
        this.date.setMonth(month);
        this.currentMonth = this.date.getMonth();
      } else {
        this.drawTag("Error Month: Неправильно введён месяц", ".calendar-container", "calendar-container__header");
        return {"Error Month": "Неправильно введён месяц"};
      }

      if (date === "currentDate") {
        this.currentDate = this.date.getDate();
      } else if (typeof(date) === "number") {
        this.date.setDate(date);
        this.currentDate = this.date.getDate();
      } else {
        this.drawTag("Error Date: Неправильно введено число", ".calendar-container", "calendar-container__header");
        return {"Error Date": "Неправильно введено число"};
      }
    }

    drawCalendar() {
      this.drawTag("none", ".calendar-container", "calendar-container__header");
      this.drawTag("none", ".calendar-container__header", "calendar-container__title", "h1");
      this.drawTag(`${this.getNameMonth(this.currentMonth)} ${this.currentFullYear}`, ".calendar-container__title", "none", "text");

      this.drawTag("<", ".calendar-container__header", "calendar-container__prev", "div", "start");
      this.drawTag(">", ".calendar-container__header", "calendar-container__next");
      
      // Выводим название недель.
      for (let i = 1; i <= 7; i++) {
        this.drawTag(this.getNameDay(i), ".calendar-container", ".calendar-container__day");
      }

      let ValuesForCalendarTable, startTable, countDate;
      ValuesForCalendarTable = this.getValuesForCalendarTable();
      startTable = ValuesForCalendarTable.startTable;
      countDate = ValuesForCalendarTable.countDate;

      for (;startTable <= countDate; startTable++) {
        // Изменяя число *Date, меняется и месяц *Month.
        this.date.setMonth(this.currentMonth); // ? Можно сделать условие и устанавливать текущий месяц, если startTable < 0 или startTable > lastDateCurrentMonth
        this.date.setDate(startTable);
        this.drawTag(this.date.getDate(), ".calendar-container", "calendar-container__date");
      }
      
      this.drawTag("none", ".calendar-container", "calendar-container__buttons");
      this.drawTag("Очистить", ".calendar-container__buttons", "calendar-container__clear", "button");
      this.drawTag("Принять", ".calendar-container__buttons", "calendar-container__accept", "button");
    }

    drawTag(data, to, className = "none", element = "div", where = "end") {
      let block, tag;
      block = document.querySelector( String(to).trim() );
      
      if(element !== "text") {
        tag = document.createElement(element);
      } else if (element === "text") {
        tag = document.createTextNode(data);
      }

      if(className !== "none"){
        tag.className = String(className).trim();
      }

      if(data !== "none" && element !== "text"){
        tag.innerHTML = data;
      }

      if (where === "start") {
        block.prepend(tag);
      } else if (where === "end") {
        block.append(tag);
      }
    }

    updateСalendar(year = "currentYear", month = "currentMonth", date = "currentDate") {
      this.getFullDate(year, month, date);
      document.querySelector(".calendar-container__title").innerHTML = `${this.getNameMonth(this.currentMonth)} ${this.currentFullYear}`;

      let dates, datesLength;
      dates = document.querySelectorAll(".calendar-container__date");
      datesLength = dates.length;
      
      // for (let i = 0; i < datesLength; i++) {
      //   this.date.setMonth(this.currentMonth);
      //   dates[i].innerHTML = 
      // }
      
    }

    getValuesForCalendarTable() {
      /*
        TODO: Узнать в какой день недели начало текущего месяца (Готово)
        TODO: Узнать сколько нужно вывести дней прошлого месяца (Готово)
      */

      /*
        Пример:
          Пусть текущая дата будет 01.11.2020 (1 Ноября 2020 года).

          Работа алгоритма:
            firstDayCurrentMonth = 7 (1-ое ноября 2020 года это воскресенье, 7-ой день недели, в объекте Date это 0, поэтому смело присваиваем 7)
            countDatePastMonthInStartCurrentMonth = 7 - 1 (6);
              Если countDatePastMonthInStartCurrentMonth больше 0, тогда 
              countDatePastMonthInStartCurrentMonth = -( countDatePastMonthInStartCurrentMonth(6) - 1 ); -1 ибо есть еще 0, и делаем все это отрицательным числом.
      */

      let countDate, firstDayCurrentMonth, countDatePastMonthInStartCurrentMonth, startTable;
      countDate = 35; // Количество чисел для вывода календаря

      /* 
        * Первый день недели в текущем месяце.
        Зная в какой день недели начинается месяц, мы можем определить,
        сколько дней прошлого месяца нужно вывести.
      */
      this.date.setDate(1); // Жестко переводим текущий месяц на 1-ое число.
      firstDayCurrentMonth = Number( this.date.getDay( this.date.getDate() ) ); // Получаем число, обозначающее день недели, 1-го числа текущего месяца.
      // Если 1-ое число месяца падает на воскресенье (это 0), присваиваем 7.
      if (firstDayCurrentMonth === 0) {
        firstDayCurrentMonth = 7;
      }
      this.date.setDate(this.currentDate); // Переводим текущий месяц на текущее число.

      countDatePastMonthInStartCurrentMonth = firstDayCurrentMonth - 1; // Количество дней прошлого месяца в начале текущего месяца. Делаем -1, чтобы вывести все дни недели, кроме текущей.
      if (countDatePastMonthInStartCurrentMonth > 0) {
        countDatePastMonthInStartCurrentMonth = -(countDatePastMonthInStartCurrentMonth - 1); // Делаем -1 ибо есть еще 0, который являеться последним числом прошлого месяца.
        if (countDatePastMonthInStartCurrentMonth === -0) {
          countDatePastMonthInStartCurrentMonth = 0;
        }
      }


      startTable = countDatePastMonthInStartCurrentMonth; // Счетчик может быть отрицательным либо 0, если 0, тогда увеличим его на 1, ибо getDate(0) это последний день прошлого месяца.
      countDate += countDatePastMonthInStartCurrentMonth;
      // Если 1-ое число месяца Пн и кол-во дней прош. мес. в нач. текущего 0, увеличиваем счетчик, чтобы вывести 35 чисел, иначе уменьшаем кол-во дней до 34 ибо есть еще 0, который выводит последний день прошлого месяца.
      if (firstDayCurrentMonth === 1 && countDatePastMonthInStartCurrentMonth === 0) {
        startTable++;
      } else {
        countDate--;
      }

      return {startTable: startTable, countDate: countDate};
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

window.onload = () => {
  /*
    Вывод месяца, возможен ввод трех необязательных параметров, если оставить параметр пустым, тогда он примет текущий год/месяц/число.
    new Calendar(?year:number, ?month:number, ?date:number)

    let calendar = new Calendar(); - выведет текущий год, месяц и число.
    let calendar = new Calendar(2025, 0, 1); - выведет 1 Января 2025 года.

    Если желаете вывести текущий год, введеный месяц и текущее число.
    let calendar = new Calendar("currentYear", 2, "currentDate"); - выведет 1 Января 2025 года.
  */
  let calendar = new Calendar();
}




