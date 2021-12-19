const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const toggleColors = document.getElementById('toggle-colors');

const rootStyles = document.documentElement.style;

const flagsElement = document.getElementById('flags');

const cardExperienceContainer = document.getElementById('card--experience');

const textsToChange = document.querySelectorAll('[data-section]')

const renderExperiences = experiences => {
  cardExperienceContainer.textContent = ''
  const div = document.createElement('div');
  div.innerHTML = `<h2 class="card__title">Experiences</h2>`
  cardExperienceContainer.appendChild(div.firstElementChild);
  experiences.forEach(ex => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="experience">
      <img src="assets/images/logo.png" alt="logo" class="experience__image">
      <div class="experience__info">
        <p class="experience__time">
          ${ex['job-dates']}
        </p>
        <h3 class="experience__job"> ${ex['job-title']}</h3>
        <p class="experience__description">
          ${ex['job-description']}
        </p>
      </div>
    </div>
    `;
    cardExperienceContainer.appendChild(div.firstElementChild);
  })
}

const changeLanguage = async language => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();
  for (const text of textsToChange) {
    const section = text.dataset.section;
    const value = text.dataset.value;
    text.innerHTML = texts[section][value]
  }
  renderExperiences(texts.experiences);

  console.log(texts);
}



flagsElement.addEventListener('click', (e) => {
  // e.target.parentElement.dataset.language
  changeLanguage(e.target.parentElement.dataset.language);
})

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(toggleIcon.src.includes('moon.svg')) {
    toggleIcon.src = 'assets/icons/sun.svg'
    toggleText.textContent = 'Light mode'
  } else {
    toggleIcon.src = 'assets/icons/moon.svg'
    toggleText.textContent = 'Dark mode'
  }
})

toggleColors.addEventListener('click', (e) => {
  /*
    dataset.color: hace referencia al atributo data en los elementos hijos de colors,
    donde .color es el nombre de la variable que decidimos poner
  */
  rootStyles.setProperty('--primary-color', e.target.dataset.color)

})

changeLanguage('es')