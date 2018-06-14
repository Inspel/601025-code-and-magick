'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizards = [];
var quantity = 4;

var userDialog = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');

var setupClose = userDialog.querySelector('.setup-close');

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var userNameInput = userDialog.querySelector('.setup-user-name');

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  if (userNameInput.onfocus) {
    document.removeEventListener('keydown', onPopupEscPress);
  }
  if (userNameInput.onblur) {
    document.addEventListener('keydown', onPopupEscPress);
  }
});

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var getRndProperty = function (arr) {
  var rndIndex = getRandomInteger(0, arr.length - 1);
  return arr[rndIndex];
};

var generateWizards = function (wizardsQuantity) {
  var newWizard;
  for (var i = 0; i < wizardsQuantity; i++) {
    newWizard = {
      name: getRndProperty(WIZARD_NAMES) + ' ' + getRndProperty(WIZARD_SURNAMES),
      coatColor: getRndProperty(COAT_COLORS),
      eyeColor: getRndProperty(EYES_COLOR)
    };
    wizards.push(newWizard);
  }
  return wizards;
};

var createSimilarElements = function (templateQueryString, contentQueryString, elementsQuantity) {

  var template = document.querySelector(templateQueryString)
    .content
    .querySelector(contentQueryString);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elementsQuantity; i++) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style
      .fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style
      .fill = wizards[i].eyeColor;

    fragment.appendChild(wizardElement);
  }
  return fragment;
};

generateWizards(quantity);

var newFragment = createSimilarElements('#similar-wizard-template', '.setup-similar-item', quantity);

var similarListElement = document.querySelector('.setup-similar-list');

similarListElement.appendChild(newFragment);

document.querySelector('.setup-similar').classList.remove('hidden');
