/*
  * CLASSES
  * calendar-container

    * calendar-container__header
      * calendar-container__title
      * calendar-container__prev
      * calendar-container__next

    * calendar-container__day

    * calendar-container__date

    * calendar-container__buttons
      * calendar-container__clear
      * calendar-container__accept

    * calendar_error
*/

class Calendar {
  constructor() {
    this.fullDate = new Date(); // Получаем текущию дату.
    // Получаем текущий год, месяц, число.
    this.year = this.fullDate.getFullYear();
    this.month = this.fullDate.getMonth();
    this.date = this.fullDate.getDate();
    // Определяем на какой день недели попадает первое число текущего месяца.
    this.firstDay = () => {
      this.fullDate.setDate(1);
      let firstDay = this.fullDate.getDay( this.fullDate.getDate() );
      if (firstDay === 0) {
        firstDay = 7;
      }
      this.fullDate.setDate(this.date);
      return firstDay;
    };

    /*
      Почему если я хочу сделать constructor класса со следующим кодом, this.fullDate в методах неопределенна, словно я её и не создавал?

      this.fullDate = new Date();

      this.calendar = {
        year: this.fullDate.getFullYear(),
        month: this.fullDate.getMonth(),
        date: this.fullDate.getDate(),
        firstDay: () => {
          this.fullDate.setDate(1);
          let firstDay = this.fullDate.getDay( this.fullDate.getDate() );
          if (firstDay === 0) {
            firstDay = 7;
          }
          this.fullDate.setDate(this.date);
          return firstDay;
            }
      };
    */
  }

  draw() {
    drawTag('.calendar-container', 'none', 'calendar-container__header');
    drawTag('.calendar-container__header', `${getNameMonth(this.month)} ${this.year}`, 'calendar-container__title');
    drawTag('.calendar-container__header', '<', 'calendar-container__prev', 'div', 'start');
    drawTag('.calendar-container__header', '>', 'calendar-container__next');

    // Выводим название недель, знаю можно сделать проще и выводить просто название недель из массива.
    for (let i = 1; i <= 7; i++) {
      drawTag('.calendar-container', getNameDay(i), '.calendar-container__day');
    }

    this.drawDates();

    drawTag('.calendar-container', 'none', 'calendar-container__buttons');
    drawTag('.calendar-container__buttons', 'Очистить', 'calendar-container__clear', 'input button');
    drawTag('.calendar-container__buttons', 'Принять', 'calendar-container__accept', 'input button');
  }

  update() {
    document.querySelector('.calendar-container__title').innerHTML = `${getNameMonth(this.month)} ${this.year}`;

    let dates, datesLength;
    dates = document.querySelectorAll('.calendar-container__date');
    datesLength = dates.length;

    this.drawDates(dates, datesLength);
  }

  drawDates(dates = false, datesLength = false) {
    /* 
      Создаю новую Date, ранее я использовал только одну, 
      определенную в конструкторе, из-за этого у меня были баги,
      первый баг был связан с тем, что после Мая переставали переключаться месяца назад, 
      но вперед переключалось нормально, второй баг связан, с тем, что с Января перескакивало на Март,
      пропуская Февраль. Код с багом есть на github.

      Я пытался понять суть бага и с чем он связан и предположил, что у него две причины:
        1) Я использовал одну new Date, из-за этого все перемешивалось в кашу;
        2) Я не делал setMonth(this.month) на последней итераций цикла, данная операция у меня была перед setDate, 
        логичнее её расположить после изменения Date.
    */
    let tempDate = new Date(this.year, this.month);

    let startTable, countDate;

    startTable = -(this.firstDay() - 1); // Делаем отрицательным, чтобы выводить дни прошлого месяца.
    countDate = 34;

    /*
      Пример работы условия:
        Пусть startTable = -5, тогда выполняется else,
        где мы делаем startTable = -4, ибо есть еще 0,
        а countDate = 34 + (-4), countDate = 30.
        Итого у нас ровно 35 итераций цикла, не забывайте про 0.
    */
    // Если -0, значит у нас нету чисел с прошлого месяца.
    if (startTable === -0) {
      startTable = 1;
      countDate = 35;
    } else {
      startTable += 1; // Делаем +1, но т.к число отрицательное это уменьшает его, не забываем у нас есть еще 0, он выводит последнее число прошлого месяца.
      countDate += startTable; // Чтобы не выходить за границу 35 чисел для вывода в календаре.
    }
    // Если элементов с числами месяца нет, тогда выводим месяц создавая элементы.
    if ( document.querySelector('.calendar-container__date') ) {
      if (!dates) {
        console.log('Error dates: неизвестно куда выводить новые числа');
        console.log('Error datesLength: неизвестно количество элементов');
        return 0;
      }

      let i = 0;
      for (; startTable <= countDate; startTable++) {
        // По сути ненужная проверка, но пусть будет, так спокойнее.
        if (i < datesLength) {
          tempDate.setMonth(this.month); // Не понимаю, почему если убрать эту строчку кода, февраль setDate(0) выводит 29, а не 31. В других месяцах ошибок в числах не заметил.
          tempDate.setDate(startTable);
          console.log(getNameMonth(this.month), tempDate.getDate(), startTable);
          dates[i].innerHTML = tempDate.getDate();
          tempDate.setMonth(this.month);
          i++;
        }
      }
    } else {
      for (; startTable <= countDate; startTable++) {
        tempDate.setMonth(this.month);
        tempDate.setDate(startTable);
        drawTag('.calendar-container', tempDate.getDate(), 'calendar-container__date');
      }
    }
  }

  prev() {
    if (this.month === 0) {
      this.fullDate.setFullYear(this.year - 1);
      this.year = this.fullDate.getFullYear();
      this.fullDate.setMonth(11);
      this.month = this.fullDate.getMonth();
    } else {
      this.fullDate.setMonth(this.month - 1);
      this.month = this.fullDate.getMonth();
    }

    this.update();
  }

  next() {
    if (this.month === 11) {
      this.fullDate.setFullYear(this.year + 1);
      this.year = this.fullDate.getFullYear();
      this.fullDate.setMonth(0);
      this.month = this.fullDate.getMonth();
    } else {
      this.fullDate.setMonth(this.month + 1);
      this.month = this.fullDate.getMonth();
    }

    this.update();
  }
}


let calendar = new Calendar();
calendar.draw();

document.querySelector('.calendar-container__prev').addEventListener('click', function() {
  calendar.prev();
});

document.querySelector('.calendar-container__next').addEventListener('click', function() {
  calendar.next();
});


function drawTag(to, data = 'none', className = 'none', element = 'div', where = 'end') { 
  /*
  Данная функция позволяет облегчить создание новых html тегов и улучшить читаемость кода.

  Обозначение параметров, передавайте параметры в нижнем регистре:
    1) to - определяет куда вставить создаваемый элемент (далее new elem) (обязательный!);
    2) data - информация которая поместиться в new elem;
    3) className - class который присвоиться new elem;
    4) element - название тега new elem, по умолчанию div, 
      можно передать input с любым атрибутом type, date станет атрибутом value, 
      (пример: 'input button', следуйте данному правилу, иначе будет оишбка);
    5) where - куда вставить new elem, в начало to или в конец, по умолчанию end (может принимать только start и end).
*/
  let block, tag;

  block = document.querySelector( String(to).trim() );

  if (element.toLowerCase().includes('input')) {
    element = element.split(' ');
    tag = document.createElement(element[0]);
    tag.type = element[1];
    tag.value = data;
  } else {
    tag = document.createElement(element);
  }

  if(className.toLowerCase() !== 'none'){
    tag.className = String(className).trim();
  }

  if(data !== 'none' && !Array.isArray(element)){
    tag.innerHTML = data;
  }

  if (where.toLowerCase() === 'start') {
    block.prepend(tag);
  } else if (where.toLowerCase() === 'end') {
    block.append(tag);
  }
}

function getNameMonth(month) {
  let monthNumber = Number(month);

  switch (monthNumber) {
    case 0: 
      return 'Январь';
    break;
    case 1: 
      return 'Февраль';
    break;
    case 2: 
      return 'Март';
    break;
    case 3: 
      return 'Апрель';
    break;
    case 4: 
      return 'Май';
    break;
    case 5: 
      return 'Июнь';
    break;
    case 6: 
      return 'Июль';
    break;
    case 7: 
      return 'Август';
    break;
    case 8: 
      return 'Сентябрь';
    break;
    case 9: 
      return 'Октябрь';
    break;
    case 10: 
      return 'Ноябрь';
    break;
    case 11: 
      return 'Декабрь';
    break;
  }
  
}

function getNameDay(day) {
  let dayNumber = Number(day);

  switch (dayNumber) {
    case 7:
      return 'Вс';
    break;
    case 1:
      return 'Пн';
    break;
    case 2:
      return 'Вт';
    break;
    case 3:
      return 'Ср';
    break;
    case 4:
      return 'Чт';
    break;
    case 5:
      return 'Пт';
    break;
    case 6:
      return 'Сб';
    break;
  }

}