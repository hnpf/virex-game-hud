// tab content map — each tab id maps to a render function
const _panels = {
  page1:  _renderOne,
  page2: _renderTwo,
  page3: _renderThree,
  page4: _renderFour,
  page5:  _renderFive,
  page6:  _renderSix,
}

function vxRender(tabId) {
  const panel = document.getElementById('vx-panel-inner')
  panel.innerHTML = ''
  const fn = _panels[tabId]
  if (fn) fn(panel)
}

// listen for tab switches
document.addEventListener('vx:tab', e => vxRender(e.detail.id))

// ── panels ───────────────────────────────────────────────

function _renderOne(el) {
  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(true)),
    _optionRow('toggle placeholder', _switch(false)),
    _optionRow('toggle placeholder', _switch(true)),
  ]))
  el.appendChild(_section('actions'))
  el.appendChild(_group([
    _optionRow('split button', _splitButton('primary action', [
      { label: 'option one', onClick: () => console.log('1') },
      { label: 'option two', onClick: () => console.log('2') },
      { label: 'option three', onClick: () => console.log('3') },
    ])),
    _optionRow('tonal split', _splitButton('secondary', [
      { label: 'tonal 1', onClick: () => {} },
      { label: 'tonal 2', onClick: () => {} },
    ], 'tonal')),
  ]))
  el.appendChild(_section('title2placeholder'))
  el.appendChild(_group([
    _optionRow('slider placeholder', _slider(100, 50, 150, '°')),
    _optionRow('slider placeholder', _slider(100, 50, 150)),
  ]))
}

function _renderTwo(el) {
  el.appendChild(_section('title3placeholder'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(true)),
    _optionRow('outlined split', _splitButton('outlined', [
      { label: 'item 1', onClick: () => {} },
      { label: 'item 2', onClick: () => {} },
    ], 'outlined')),
    _optionRow('elevated split', _splitButton('elevated', [
      { label: 'elevated 1', onClick: () => {} },
    ], 'elevated')),
  ]))
  el.appendChild(_section('title4placeholder'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(true)),
    _optionRow('toggle placeholder', _switch(false)),
  ]))
}

function _renderThree(el) {
  el.appendChild(_section('dev placeholder'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(false)),
    _optionRow('toggle placeholder', _switch(false)),
  ]))
  el.appendChild(_section('dev placeholder'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(true)),
  ]))
}

function _renderFour(el) {
  el.appendChild(_section('dev placeholder'))
  el.appendChild(_group([
    _optionRow('toggle placeholder', _switch(true)),
    _optionRow('toggle placeholder', _switch(true)),
  ]))
}

function _renderFive(el) {
  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('tonal split', _splitButton('text', [
      { label: 'opt1', onClick: () => console.log('load') },
      { label: 'opt2', onClick: () => console.log('save') },
      { label: 'opt3', onClick: () => console.log('export') },
      { label: 'opt4', onClick: () => console.log('delete') },
    ], 'tonal')),
    _optionRow('toggle placeholder', _switch(true)),
  ]))

  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('split button', _splitButton('text', [
      { label: 'opt1', onClick: () => {} },
      { label: 'opt2', onClick: () => {} },
      { label: 'opt3', onClick: () => {} },
      { label: 'opt4', onClick: () => {} },
    ], 'filled')),
    _optionRow('slider', _slider(100, 50, 150, '%')),
    _optionRow('toggle placeholder', _switch(false)),
  ]))

  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('text placeholder', _text('vertext')),
    _optionRow('textplaceholder', _text('text')),
    _optionRow('toggle placeholder', _switch(false)),
  ]))
}

function _renderSix(el) {
  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('slider placeholder', _slider(100, 50, 150, '%')),
    _optionRow('toggle placeholder', _switch(false)),
  ]))
  
  el.appendChild(_section('title'))
  el.appendChild(_group([
    _optionRow('slider placeholder', _slider(100, 50, 150)),
    _optionRow('placeholder', _switch(false)),
  ]))
}


// ── components ───────────────────────────────────────────

function _switch(active = false) {
  const el = document.createElement('div')
  el.className = `vx-switch ${active ? 'active' : ''}`
  el.innerHTML = `
    <div class="vx-switch-handle">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  `
  el.addEventListener('click', (e) => {
    e.stopPropagation()
    el.classList.toggle('active')
    const parent = el.closest('.vx-option')
    if (parent) parent.classList.toggle('active', el.classList.contains('active'))
  })
  return el
}

function _splitButton(label, menuItems, variant = 'filled') {
  const container = document.createElement('div')
  container.className = `vx-split-container ${variant}`

  const btn = document.createElement('button')
  btn.className = 'vx-split-btn'
  btn.textContent = label
  container.appendChild(btn)

  const details = document.createElement('details')
  details.className = 'vx-split-details'
  
  const summary = document.createElement('summary')
  summary.className = 'vx-split-summary'
  summary.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `
  details.appendChild(summary)

  const menu = document.createElement('div')
  menu.className = 'vx-split-menu'
  menuItems.forEach(item => {
    const itemEl = document.createElement('div')
    itemEl.className = 'vx-split-menu-item'
    itemEl.textContent = item.label
    itemEl.addEventListener('click', (e) => {
      e.stopPropagation()
      if (item.onClick) item.onClick()
      details.open = false
    })
    menu.appendChild(itemEl)
  })
  details.appendChild(menu)
  container.appendChild(details)

  // sync openstate to parent vx-option z-index stacking
  details.addEventListener('toggle', () => {
    const parent = container.closest('.vx-option')
    if (parent) parent.classList.toggle('vx-open', details.open)
  })
  const close = (e) => {
    if (!details.contains(e.target)) {
      details.open = false
    }
  }
  window.addEventListener('click', close)
  return container
}

function _slider(val, min, max, unit = '') {
  const root = document.createElement('div')
  root.className = 'vx-slider'
  
  root.innerHTML = `
    <div class="vx-slider-value"></div>
    <div class="vx-slider-track-inactive"></div>
    <div class="vx-slider-track-active"></div>
    <div class="vx-slider-handle"></div>
  `
  
  const valEl = root.querySelector('.vx-slider-value')
  const activeTrack = root.querySelector('.vx-slider-track-active')
  const handle = root.querySelector('.vx-slider-handle')
  
  let targetP = (val - min) / (max - min)
  let currentP = targetP
  let isAnimating = false
  const updateDOM = (p) => {
    root.style.setProperty('--handle-p', p)
    const v = min + p * (max - min)
    valEl.textContent = Math.round(v) + unit
  }
  
  const animate = () => {
    const delta = targetP - currentP
    if (Math.abs(delta) > 0.0001) {
      currentP += delta * 0.12 // slow fluid follow like virex.lol
      updateDOM(currentP)
      requestAnimationFrame(animate)
    } else {
      currentP = targetP
      updateDOM(currentP)
      isAnimating = false
    }
  }

  const startAnimation = () => {
    if (!isAnimating) {
      isAnimating = true
      requestAnimationFrame(animate)
    }
  }
  
  updateDOM(currentP)
  const handleMove = (e) => {
    const rect = root.getBoundingClientRect()
    let p = (e.clientX - rect.left) / rect.width
    targetP = Math.max(0, Math.min(1, p))
    startAnimation()
  }

  root.addEventListener('mousedown', e => {
    handleMove(e)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleMove)
    }, { once: true })
  })
  
  return root
}

function _text(val) {
  const el = document.createElement('span')
  //el.className = 'vx-muted'
  el.style.fontSize = '13px'
  el.textContent = val
  return el
}

// ── dom helpers ──────────────────────────────────────────

function _section(title) {
  const el = document.createElement('div')
  el.className = 'vx-label vx-in'
  el.style.animationDelay = '0ms'
  el.textContent = title
  return el
}

function _group(children) {
  const el = document.createElement('div')
  el.className = 'vx-group'
  children.forEach((c, i) => {
    c.classList.add('vx-in')
    c.style.animationDelay = `${(i + 1) * 60}ms`
    // expressive rounding
    let roundClass = 'vx-round-mid'
    if (children.length === 1) roundClass = 'vx-round-all'
    else if (i === 0) roundClass = 'vx-round-top'
    else if (i === children.length - 1) roundClass = 'vx-round-bot'
    c.classList.add(roundClass)
    el.appendChild(c)
  })
  return el
}

function _optionRow(label, control = null) {
  const el = document.createElement('div')
  el.className = 'vx-option'
  el.innerHTML = `<span class="vx-option-label">${label}</span>`
  
  if (control) {
    const wrap = document.createElement('div')
    wrap.className = 'vx-option-control'
    const isFlex = control.classList.contains('vx-slider') || control.classList.contains('vx-split-container')
    wrap.style.flex = isFlex ? '1' : '0'
    wrap.style.display = 'flex'
    wrap.style.justifyContent = 'flex-end'
    wrap.appendChild(control)
    el.appendChild(wrap)
    // sync init active state if its a switch
    if (control.classList.contains('vx-switch')) {
      if (control.classList.contains('active')) {
        el.classList.add('active')
      }
      // caontin click toggles the switch
      el.addEventListener('click', () => {
        control.click()
      })
    }
  }
  
  return el
}

// initial render.
vxRender('page1')

// ── fire scrollbar sync ────────────────────────────────

function vxSyncScroll(container, scrollbarId) {
  const scrollbar = document.getElementById(scrollbarId)
  if (!scrollbar) return
  const thumb = scrollbar.querySelector('.vx-scrollbar-thumb')
  
  const update = () => {
    if (!container) return
    const ratio = container.clientHeight / container.scrollHeight
    if (ratio >= 1) {
      scrollbar.style.opacity = '0'
    } else {
      scrollbar.style.opacity = '1'
      thumb.style.height = `${Math.max(ratio * 100, 10)}%`
      thumb.style.top = `${(container.scrollTop / container.scrollHeight) * 100}%`
    }
  }
  
  container.addEventListener('scroll', update)
  new MutationObserver(update).observe(container, { childList: true, subtree: true })
  window.addEventListener('resize', update)
  update()
}

// init sync
setTimeout(() => {
  vxSyncScroll(document.getElementById('vx-panel-inner'), 'vx-scroll-panel')
}, 100)
