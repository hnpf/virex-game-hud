// tab registry — swap these freely at runtime
const vxTabs = [
  { id: 'page1',   label: 'aim assist',   icon: _icon('target') },
  { id: 'page2',  label: 'triggerbot',  icon: _icon('users') },
  { id: 'page3',     label: 'visuals',     icon: _icon('eye') },
  { id: 'page4',  label: 'world',  icon: _icon('sliders') },
  { id: 'page5',   label: 'miscellaneous',   icon: _icon('settings') },
  { id: 'page6',   label: 'fun',   icon: _icon('fun') },
]

let _activeTab = vxTabs[0].id

function vxInitTabs() {
  const nav = document.getElementById('vx-nav')
  nav.innerHTML = ''

  vxTabs.forEach((tab, index) => {
    const el = document.createElement('div')
    el.dataset.tabId = tab.id
    
    // rounding logic
    let roundClass = 'vx-round-mid'
    if (vxTabs.length === 1) roundClass = 'vx-round-all'
    else if (index === 0) roundClass = 'vx-round-top'
    else if (index === vxTabs.length - 1) roundClass = 'vx-round-bot'
    
    el.className = `vx-tab ${roundClass} ${tab.id === _activeTab ? 'active' : ''} vx-animate-sidebar-item`
    el.style.animationDelay = `${index * 50}ms`
    el.innerHTML = `
      <div class="vx-tab-icon-wrapper">${tab.icon}</div>
      <span class="vx-tab-label">${tab.label}</span>
    `

    el.addEventListener('click', () => {
      vxSetTab(tab.id)
    })

    nav.appendChild(el)
  })
}

function vxSetTab(id) {
  _activeTab = id
  document.querySelectorAll('.vx-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tabId === id)
  })
  // notify hud.js
  document.dispatchEvent(new CustomEvent('vx:tab', { detail: { id } }))
}

function vxAddTab(tab) {
  vxTabs.push(tab)
  vxInitTabs()
}

function vxRemoveTab(id) {
  const i = vxTabs.findIndex(t => t.id === id)
  if (i !== -1) vxTabs.splice(i, 1)
  if (_activeTab === id && vxTabs.length) vxSetTab(vxTabs[0].id)
  vxInitTabs()
}

// ── helpers ──────────────────────────────────────────────

function _icon(name) {
  const icons = {
    target:   `<svg class="vx-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    eye:      `<svg class="vx-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    sliders:  `<svg class="vx-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
    users:    `<svg class="vx-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    settings: `<svg class="vx-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    fun:      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-spline-icon lucide-chart-spline"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/></svg>`,
  }
  return icons[name] ?? ''
}

vxInitTabs()
