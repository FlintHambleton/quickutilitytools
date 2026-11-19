/* Google Analytics 4: optional, consent-gated measurement. */
(function () {
  'use strict';
  var measurementId = 'G-N57LW2G39J';
  var key = 'quickutility_analytics_consent_v1';
  var choice;
  try { choice = localStorage.getItem(key); } catch (e) { choice = null; }
  function enable() {
    if (window.__calculatorAnalyticsLoaded) return;
    window.__calculatorAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
  }
  if (choice === 'yes') enable();
  function save(value, panel) {
    try { localStorage.setItem(key, value); } catch (e) { /* Consent is not persisted if storage is unavailable. */ }
    if (panel) panel.remove();
    if (value === 'yes') enable();
    else if (window.__calculatorAnalyticsLoaded) window.location.reload();
  }
  function showPanel() {
    if (document.getElementById('calculator-analytics-consent')) return;
    var panel = document.createElement('section');
    panel.id = 'calculator-analytics-consent';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Analytics privacy choices');
    panel.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;max-width:580px;margin:auto;z-index:2147483647;background:#fff;color:#172033;border:1px solid #ccd4df;border-radius:10px;box-shadow:0 4px 24px #0003;padding:16px;font:14px/1.5 system-ui,sans-serif';
    var p = document.createElement('p');
    p.style.margin = '0 0 12px';
    p.textContent = 'May we use Google Analytics to understand visits and improve our tools? Analytics is optional and stays off unless you accept.';
    panel.appendChild(p);
    [['Accept analytics','yes'],['Decline','no']].forEach(function (pair) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = pair[0];
      btn.style.cssText = 'cursor:pointer;padding:8px 14px;margin-right:10px;border:1px solid #687589;border-radius:6px;background:#f6f8fc;color:#172033';
      btn.addEventListener('click', function () { save(pair[1], panel); });
      panel.appendChild(btn);
    });
    document.body.appendChild(panel);
  }
  function init() {
    if (!choice) showPanel();
    var footer = document.querySelector('footer') || document.body;
    var link = document.createElement('button');
    link.type = 'button'; link.textContent = 'Analytics privacy choices';
    link.style.cssText = 'display:inline-block;margin:12px;padding:4px;background:transparent;border:0;text-decoration:underline;color:inherit;cursor:pointer;font:inherit';
    link.addEventListener('click', showPanel);
    footer.appendChild(link);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
