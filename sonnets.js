let sonnets = [];

async function loadSonnets() {
    const response = await fetch('data/sonnets.json');
    sonnets = await response.json();

    const hash = window.location.hash.slice(1);
    if (hash && !isNaN(hash)) {
        showSonnet(parseInt(hash) - 1);
    } else {
        showList();
    }
}

function showList() {
    document.getElementById('list').style.display = 'grid';
    document.getElementById('sonnet').classList.remove('active');

    const list = document.getElementById('list');
    list.innerHTML = sonnets.map((sonnet, i) =>
        `<a href="#${i + 1}" data-sonnet="${i}">${i + 1}</a>`
    ).join('');

    document.getElementById('main-title').style.display = 'block';
    document.getElementById('footer-title').style.display = 'block';
    document.getElementById('nav').style.display = 'none';

    document.querySelectorAll('#list a').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const index = parseInt(e.target.dataset.sonnet);
            document.getElementById('footer-title').textContent = sonnets[index][0];
        });
        link.addEventListener('mouseleave', () => {
            document.getElementById('footer-title').textContent = '';
        });
    });
}

function showSonnet(index) {
    if (index < 0 || index >= sonnets.length) return;

    document.getElementById('list').style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
    document.getElementById('sonnet').classList.add('active');

    document.getElementById('footer-title').style.display = 'none';
    document.getElementById('nav').style.display = 'flex';

    document.getElementById('sonnet-title').textContent = `Sonnet ${index + 1}`;
    document.getElementById('sonnet-text').innerHTML =
        sonnets[index].map(line => `${line}<br>`).join('');

    document.getElementById('prev').href = index > 0 ? `#${index}` : '#';
    document.getElementById('next').href = index < sonnets.length - 1 ? `#${index + 2}` : '#';

    document.getElementById('prev').style.visibility = index > 0 ? 'visible' : 'hidden';
    document.getElementById('next').style.visibility = index < sonnets.length - 1 ? 'visible' : 'hidden';
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && !isNaN(hash)) {
        showSonnet(parseInt(hash) - 1);
    } else {
        showList();
    }
});

document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
});

loadSonnets().catch(err => {
    document.getElementById('container').innerHTML =
        '<p>Error loading sonnets. Make sure you\'re running a local server (e.g., python3 -m http.server)</p>';
});
