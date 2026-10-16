/* Thème portfolio MakerSpace — scripts communs (aucune dépendance obligatoire) */
document.addEventListener('DOMContentLoaded', function () {

  /* 1. Menu burger Bulma (mobile) */
  document.querySelectorAll('.navbar-burger').forEach(function (burger) {
    burger.addEventListener('click', function () {
      var cible = document.getElementById(burger.dataset.target);
      burger.classList.toggle('is-active');
      cible.classList.toggle('is-active');
      burger.setAttribute('aria-expanded', burger.classList.contains('is-active'));
    });
  });

  /* 2. Table des matières générée depuis les titres h2/h3 */
  document.querySelectorAll('.mks-toc').forEach(function (toc) {
    var article = document.querySelector(toc.dataset.tocTarget);
    var liste = toc.querySelector('.mks-toc-list');
    if (!article || !liste) return;
    var titres = article.querySelectorAll('h2, h3');
    if (titres.length < 2) { toc.style.display = 'none'; return; }
    var liens = [];
    titres.forEach(function (h, i) {
      if (!h.id) h.id = 'section-' + i;
      var li = document.createElement('li');
      li.className = 'toc-' + h.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      liste.appendChild(li);
      liens.push({ h: h, a: a });
    });
    /* surligne la section visible */
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) {
          if (e.isIntersecting) {
            liens.forEach(function (l) { l.a.classList.toggle('is-active', l.h === e.target); });
          }
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      liens.forEach(function (l) { obs.observe(l.h); });
    }
  });

  /* 3. Filtres de la page projets */
  var boutons = document.querySelectorAll('.mks-filtres [data-filtre]');
  boutons.forEach(function (b) {
    b.addEventListener('click', function () {
      boutons.forEach(function (x) { x.classList.remove('is-primary'); });
      b.classList.add('is-primary');
      var f = b.dataset.filtre;
      document.querySelectorAll('.mks-projet-item').forEach(function (item) {
        var ok = f === '*' || (' ' + item.dataset.tags + ' ').indexOf(' ' + f + ' ') !== -1;
        item.classList.toggle('is-hidden', !ok);
      });
    });
  });

  /* 4. Graphiques Chart.js déclarés par {% include chart.html %} */
  var rouge = getComputedStyle(document.documentElement).getPropertyValue('--mks-primary').trim() || '#ef2e31';
  var palette = [rouge, '#1f2a37', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'];
  if (window.Chart) {
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    (window.MKS_CHARTS || []).forEach(function (cfg) {
      var el = document.getElementById(cfg.id);
      if (!el) return;
      (cfg.data.datasets || []).forEach(function (ds, i) {
        var c = palette[i % palette.length];
        if (!ds.backgroundColor) ds.backgroundColor = ['pie', 'doughnut', 'polarArea'].indexOf(cfg.type) !== -1 ? palette : c + 'cc';
        if (!ds.borderColor) ds.borderColor = c;
      });
      new Chart(el, { type: cfg.type, data: cfg.data, options: cfg.options });
    });

    /* 5. Radar de la page compétences */
    var radar = document.getElementById('mks-radar');
    var d = window.MKS_COMPETENCES;
    if (radar && d) {
      var datasets = [{
        label: 'Niveau actuel', data: d.niveau,
        backgroundColor: rouge + '33', borderColor: rouge, pointBackgroundColor: rouge, pointRadius: 5
      }];
      if (d.objectif.some(function (v) { return v > 0; })) {
        datasets.push({
          label: 'Niveau visé', data: d.objectif,
          backgroundColor: 'transparent', borderColor: '#1f2a37', borderDash: [6, 4], pointRadius: 3, pointBackgroundColor: '#1f2a37'
        });
      }
      new Chart(radar, {
        type: 'radar',
        data: { labels: d.labels, datasets: datasets },
        options: {
          scales: { r: { min: 0, max: d.max, ticks: { stepSize: 1 }, pointLabels: { font: { size: 12 } } } },
          plugins: { legend: { position: 'bottom' } },
          onClick: function (evt, elements) {
            if (elements.length) location.hash = d.ids[elements[0].index];
          }
        }
      });
    }
  }

  /* 6. Icônes Lucide */
  if (window.lucide) lucide.createIcons();
});
