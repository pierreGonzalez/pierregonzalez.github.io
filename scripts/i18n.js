// EN/FR language toggle. English lives in index.html; French in scripts/i18n-fr.js.
(function () {
  var FR = window.I18N_FR;
  if (!FR) return;

  var STORE = 'cv-lang';
  var textNodes = [];
  var attrEls = [];

  function norm(t) { return t.replace(/\s+/g, ' ').trim(); }

  // Collect translatable text nodes once, remembering the English original.
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      var tag = n.parentNode && n.parentNode.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
      return norm(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) {
    var node = walker.currentNode;
    var fr = FR.text[norm(node.nodeValue)];
    if (fr === undefined) continue;
    var en = node.nodeValue;
    var lead = en.match(/^\s*/)[0];
    var trail = en.match(/\s*$/)[0];
    textNodes.push({ node: node, en: en, fr: lead + fr + trail });
  }
  document.querySelectorAll('[alt],[title]').forEach(function (el) {
    ['alt', 'title'].forEach(function (a) {
      var v = el.getAttribute(a);
      if (v && FR.attrs[v]) attrEls.push({ el: el, attr: a, en: v, fr: FR.attrs[v] });
    });
  });

  var metaDesc = document.querySelector('meta[name="description"]');
  var enTitle = document.title;
  var enDesc = metaDesc ? metaDesc.getAttribute('content') : '';

  function setLang(lang) {
    var fr = lang === 'fr';
    var toggle = document.querySelector('.lang-toggle');
    var before = toggle ? toggle.getBoundingClientRect().top : 0;
    textNodes.forEach(function (t) { t.node.nodeValue = fr ? t.fr : t.en; });
    attrEls.forEach(function (a) { a.el.setAttribute(a.attr, fr ? a.fr : a.en); });
    document.title = fr ? FR.meta.title : enTitle;
    if (metaDesc) metaDesc.setAttribute('content', fr ? FR.meta.description : enDesc);
    document.documentElement.lang = fr ? 'fr' : 'en-US';
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    // Keep the toggle where it was on screen so the page does not jump when text reflows.
    if (toggle && window.scrollY > 0) window.scrollBy(0, toggle.getBoundingClientRect().top - before);
    try { localStorage.setItem(STORE, lang); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  var initial = 'en';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    initial = q === 'fr' || q === 'en' ? q : (localStorage.getItem(STORE) || 'en');
  } catch (e) { /* ignore */ }
  if (initial === 'fr') setLang('fr');
})();
