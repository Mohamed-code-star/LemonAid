const fill = c => `style="fill:var(--icon-fill,var(--${c}))"`;
const icons = {
  lemon: `<ellipse ${fill('lemon')} cx="24" cy="28" rx="18" ry="13" transform="rotate(-25 24 28)"/><path d="M40 21l4-2M8 35l-4 2"/><path style="fill:var(--leaf)" d="M27 15c0-6 6-9 12-8 0 6-5 10-12 8z"/>`,
  cup: `<path style="fill:var(--cream)" d="M10 12h28l-4 31H14z"/><path ${fill('lemon')} d="M12 24h24l-2 19H14z"/><path d="M29 4l-3 20"/>`,
  sun: `<circle ${fill('lemon')} cx="24" cy="24" r="10"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/>`,
  heart: `<path ${fill('pink')} d="M24 42C8 31 5 20 11 14c5-4 11-2 13 4 2-6 8-8 13-4 6 6 3 17-13 28z"/>`,
  // #new-icon
  ice: `<rect ${fill('cream')} x="9" y="9" width="30" height="30" rx="8" transform="rotate(-8 24 24)"/><path d="M16 19l5-3"/>`,
  leaf: `<path ${fill('leaf')} d="M8 40C6 20 18 8 40 8c0 22-12 34-32 32z"/><path d="M8 40L28 20"/>`
};

const symbols = Object.entries(icons).map(([id, body]) =>
  `<symbol id="${id}" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</g></symbol>`
).join('');

document.body.insertAdjacentHTML('afterbegin',
  `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0">
    <defs><pattern id="wave" width="40" height="24" patternUnits="userSpaceOnUse"><path d="M0 12Q10 0 20 12T40 12" style="fill:none;stroke:var(--ink);stroke-width:4;stroke-linecap:round"/></pattern></defs>
    ${symbols}
  </svg>`);
