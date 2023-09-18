// показ оригинального изображения при клике на миниатюру
function showPopup(element) {
    const parent = element.parentNode;
    const popup = document.createElement('div');
    const img = document.createElement('img');
    img.src = element.src;
    popup.appendChild(img);
    popup.classList.add('popup');
    parent.appendChild(popup);
    popup.addEventListener('click', () => {
        popup.remove();
        stopPlayingAudio();
    });
    popup.style.display = 'flex';

    if (element.className == 'minicar-img') {
        playAudio('minicar-img')
    } else if (element.className == 'map-img') {
        if (document.getElementsByClassName('select-right').length) {
            playAudio('route-img')
            console.log('route')
        } else {
            playAudio('direction-img')
            console.log('direction')
        }
    } else if (element.className == 'map-img') {
        if (document.getElementsByClassName('select-right').length) {
            playAudio('route-img')
            console.log('route')
        } else {
            playAudio('direction-img')
            console.log('direction')
        }
    }
}

function getDistance(route) {
    var distance = 0
    Object.keys(routes[route]).forEach(key => {
        distance += routes[route][key]['distance']
    })

    return distance
}

function renderPage(route) {
    var page = ''
    var selectTarget = document.getElementsByClassName('select-direction')[0]
    if (selectTarget) selectTarget.classList.remove('select-direction')
    document.getElementById(`route-${route}`).classList.add('select-direction')

    for (let i = 1; i < Object.keys(routes[route]).length + 1; i++) {
        page += `<div class="main-title" id="day-${i}" onclick="getRoute(this, '${route}', ${i})">
        <div class="counter">${i}</div>
        <div class="distance">${routes[route][`day-${i}`]['distance']} км</div>
        ${routes[route][`day-${i}`]['start']} - ${routes[route][`day-${i}`]['end']}</div>`
    }
    document.getElementById('map-img').innerHTML = `<img class="map-img"
        src="./img/${route}/${globalRoutes[route]['img']}" alt="photo" onclick="showPopup(this)">`
    document.getElementById('time').innerHTML = globalRoutes[route]['days'] + ' дней'
    document.getElementById('distance').innerHTML = getDistance(route) + ' км'
    document.getElementById('description').innerHTML = globalRoutes[route]['description']
    document.getElementById('routes').innerHTML = page
    if (document.getElementById('timezone')) document.getElementById('timezone').parentNode.remove()
    if (document.getElementById('subject')) document.getElementById('subject').parentNode.remove()
    playAudio('bukhanka-door')
}

function getRoute(routeElement, route, day) {
    playAudio('route')
    var closeElem = document.getElementsByClassName('select-right')
    if (closeElem[0]) closeElem[0].classList.remove('select-right')

    if (!document.getElementById('timezone')) {
        var newElement = ''
        var parentElement = document.getElementById('details-container')
        newElement = `<div class="details-item-box">
            <div class="title-mini">Часовой пояс</div>
            <div class="details-item" id="timezone"></div>
        </div>
        <div class="details-item-box">
            <div class="title-mini">Субъект</div>
            <div class="details-item" id="subject"></div>
        </div>`

        parentElement.insertAdjacentHTML('afterbegin', newElement)
    }


    routeElement.classList.add('select-right')
    document.getElementById('map-img').innerHTML = `<img class="map-img"
        src="./img/${route}/${routes[route]['day-' + day]['image']}" alt="photo" onclick="showPopup(this)">`
    document.getElementById('description').innerHTML = routes[route]['day-' + day]['description']
    document.getElementById('timezone').innerHTML = routes[route]['day-' + day]['timezone']
    document.getElementById('subject').innerHTML = routes[route]['day-' + day]['subject']
    document.getElementById('distance').innerHTML = routes[route]['day-' + day]['distance'] + ' км'
    document.getElementById('time').innerHTML = routes[route]['day-' + day]['time']
}

function playAudio(option) {
    stopPlayingAudio()

    if (option == 'minicar-img') {
        if (optionsValue[0] == 0) {
            document.getElementById("audio-bukhanka-mini").play()
        }  else if (optionsValue[0] == 1) {
            document.getElementById("audio-bukhanka-mini-short").play()
        }
    } else if (option == 'bukhanka-door') {
        if (optionsValue[1] == 0) {
            document.getElementById("audio-bukhanka-door").play()
        } else if (optionsValue[1] == 1) {
            document.getElementById("audio-bukhanka-door-short").play()
        }
    } else if (option == 'route') {
        if (optionsValue[2] == 0) {
            document.getElementById("audio-engine").play()
        }
    } else if (option == 'direction-img') {
        if (optionsValue[3] == 0) {
            document.getElementById("audio-direction-img").play()
        } else if (optionsValue[3] == 1) {
            document.getElementById("audio-direction-img-short").play()
        }
    } else if (option == 'route-img') {
        if (optionsValue[4] == 0) {
            document.getElementById("audio-route-img").play()
        } else if (optionsValue[4] == 1) {
            document.getElementById("audio-route-img-short").play()
        }
    } else if (option == 'references') {
        if (optionsValue[5] == 0) {
            document.getElementById("audio-references").play()
        }
    } else if (option == 'settings') {
        if (optionsValue[6] == 0) {
            document.getElementById("audio-settings").play()
        }
    } else if (option == 'button-hover') {
        document.getElementById("audio-button-hover").play()
    } else if (option == 'alice') {
        document.getElementById("audio-alice").play()
    } else if (option == 'gilticus') {
        document.getElementById("audio-gilticus").play()
    } else if (option == 'bkt') {
        document.getElementById("audio-bkt").play()
    } else if (option == 'slon') {
        document.getElementById("audio-slon").play()
    } else if (option == 'kamsky') {
        document.getElementById("audio-kamsky").play()
    } else if (option == 'lider') {
        document.getElementById("audio-lider").play()
    } else if (option == 'savini') {
        document.getElementById("audio-savini").play()
    }
}

function stopPlayingAudio() {
  var audioElements = document.getElementsByTagName("audio"); // Получение всех элементов аудио на странице

  for (var i = 0; i < audioElements.length; i++) {
    var audio = audioElements[i];

    if (!audio.paused) { // Проверка, проигрывается ли аудио
      audio.pause(); // Остановка проигрывания аудио
      audio.currentTime = 0;
    }
  }
}

function hideElement() {
  document.getElementById('iframeContainer').style.display = 'none'
}

function showOptionsMenu(element) {
    var iframeContainer = document.getElementById('iframeContainer')
    iframeContainer.style.display = 'flex'
    iframeContainer.innerHTML = optionsMenu
    fillInputs()
    playAudio('settings')
}

function fillInputs() {
    var options = document.getElementById("iframeContainer").getElementsByClassName("menu-item")
    for (let i = 0; i < 7; i++) {
        options[i].children[1].children[optionsValue[i]].children[0].checked = true
    }
}

function runCommand(data) {
    console.log(data)
    const question = /голос/i
    const alice = /лиса.*голос/i
    const gilticus = /(гилтикус|guilty|(guilty|gild|guild) (вкус|курс|гос))/i
    const bkt = /(бкт|бэкатэ|б как - то|бгг|б - карты|бк t|бк ты|б кт|б к т|богаты|бабка - то|бабка то|бк - то|бака t|будто)/i
    const slon = /слон/i
    const kamsky = /камски/i
    const lider = /лидер/i
    const savini = /савини/i

    // распознаём запрос
    if (alice.test(data)) {
        playAudio("alice")
    } else if (question.test(data)) {
        showVideoPopup()
    } else if (gilticus.test(data)) {
        playAudio("gilticus")
    } else if (bkt.test(data)) {
        playAudio("bkt")
    } else if (slon.test(data)) {
        playAudio("slon")
    } else if (kamsky.test(data)) {
        playAudio("kamsky")
    } else if (lider.test(data)) {
        playAudio("lider")
    } else if (savini.test(data)) {
        playAudio("savini")
    } else {
        alert('Команда не распознана')
    }
}

function showVideoPopup() {
  var videoPopup = document.getElementById('videoPopup');

  videoPopup.style.display = 'block';
  videoPopup.innerHTML = `        <video id="videoPlayer" autoplay>
            <source src="voice.mp4" type="video/mp4">
        </video>`
  document.getElementById('videoPlayer').addEventListener('ended', closeVideoPopup);
}

function closeVideoPopup() {
  var videoPopup = document.getElementById('videoPopup');
  var videoPlayer = document.getElementById('videoPlayer');

  videoPopup.style.display = 'none';
  videoPlayer.removeEventListener('ended', closeVideoPopup);
}

function showReferencePopup() {
    var iframeReferenceContainer = document.getElementById('iframeReferenceContainer')
    iframeReferenceContainer.style.display = 'flex'
    iframeReferenceContainer.innerHTML = referenceMenu
    playAudio('references')
}

function saveSettings() {
    var options = document.getElementById("iframeContainer").getElementsByClassName("menu-item")

    for (let i = 0; i < 7; i++) {
        var inputs = options[i].querySelectorAll('input')

        inputs.forEach((input, index) => {
          if (input.checked) {
            optionsValue[i] = index
          }
        });
    }

    stopPlayingAudio()
    iframeContainer.style.display = 'none'
}
