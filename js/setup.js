'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var getRndProperty = function (arr) {
  var rndIndex = getRandomInteger(0, arr.length - 1);
  return arr[rndIndex];
};

var generateWizards = function () {
  var newWizard;
  for (var i = 0; i < 4; i++) {
    newWizard = {
      name: getRndProperty(WIZARD_NAMES) + ' ' + getRndProperty(WIZARD_SURNAMES),
      coatColor: getRndProperty(COAT_COLORS),
      eyeColor: getRndProperty(EYES_COLOR)
    };
    wizards.push(newWizard);
  }
  return wizards;
};

var insertElements = function () {

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style
      .fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style
      .fill = wizards[i].eyeColor;

    fragment.appendChild(wizardElement);
  }
  similarListElement.appendChild(fragment);
};

generateWizards();

insertElements();

document.querySelector('.setup-similar').classList.remove('hidden');
