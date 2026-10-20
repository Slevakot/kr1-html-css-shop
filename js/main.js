// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');
const selectedProductHeading = document.getElementById('selected-product-heading');

// Получаем кнопку «Наверх».
const scrollTopButton = document.getElementById('scroll-top-button');

// Проверяем скролл страницы для появления/скрытия кнопки.
window.addEventListener('scroll', () => {
  // Если прокрутили больше чем на 300 пикселей вниз, показываем кнопку.

  if (window.scrollY > 150) {
    scrollTopButton.hidden = false;
  } else {
    scrollTopButton.hidden = true;
  }
});

// Плавный возврат наверх при клике на кнопку.
scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;
    selectedProductHeading.textContent = "Ваш заказ: " + productName;

    orderForm.hidden = false;
    successMessage.hidden = true;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  orderForm.hidden = true;
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  setTimeout(() => {
    orderDialog.close();
    successMessage.hidden = true;
    orderForm.hidden = false;
  }, 1000);
});
