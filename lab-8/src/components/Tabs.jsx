import { createContext, use, useId, useRef, useState } from 'react'
/**
 * Вкладки — складений компонент (compound component): `Tabs` і його частини
 * `Tabs.List`, `Tabs.Tab` і `Tabs.Panel`. Вміст кожної частини приходить між
 * її тегами як `children`, а яка вкладка обрана, частини дізнаються з
 * контексту, який створює `Tabs`.
 *
 * Використання:
 *   <Tabs defaultValue="brew">
 *     <Tabs.List aria-label="Про каву">
 *       <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
 *       <Tabs.Tab value="reviews">Відгуки</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="brew">…</Tabs.Panel>
 *     <Tabs.Panel value="reviews">…</Tabs.Panel>
 *   </Tabs>
 *
 * Вимоги — у тестах tests/Tabs.children.test.jsx і tests/Tabs.a11y.test.jsx.
 */
const TabsContext = createContext(null)

function useTabsContext(componentName) {
  const ctx = use(TabsContext)
  if (!ctx) {
    throw new Error(`${componentName} must be used within <Tabs>`)
  }
  return ctx
}

function TabsList({ children, 'aria-label': ariaLabel, className = '' }) {
  const { handleKeyDown } = useTabsContext('Tabs.List')

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`tab-list ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

function TabsTab({ value, children, className = '' }) {
  const { selectedValue, selectValue, getTabId, getPanelId, registerTab } =
    useTabsContext('Tabs.Tab')

  const isSelected = selectedValue === value
  const tabId = getTabId(value)
  const panelId = getPanelId(value)

  return (
    <button
      ref={(el) => registerTab(value, el)}
      id={tabId}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      className={className || undefined}
      onClick={() => selectValue(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children, className = '' }) {
  const { selectedValue, getTabId, getPanelId } = useTabsContext('Tabs.Panel')
  const isSelected = selectedValue === value
  const tabId = getTabId(value)
  const panelId = getPanelId(value)

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isSelected}
      className={className || undefined}
    >
      {children}
    </div>
  )
}

function sanitizeKey(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '_')
}

export default function Tabs({ defaultValue, children, className = '' }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const baseId = useId()
  const tabRefs = useRef([])
  const tabValuesRef = useRef([])

  function registerTab(value, element) {
    const idx = tabValuesRef.current.indexOf(value)
    if (idx === -1) {
      tabValuesRef.current.push(value)
      tabRefs.current.push(element)
    } else {
      tabRefs.current[idx] = element
    }
  }

  function handleKeyDown(event) {
    const validEntries = tabRefs.current
      .map((el, i) => ({ el, value: tabValuesRef.current[i] }))
      .filter((item) => item.el && item.el.isConnected)

    const currentIndex = validEntries.findIndex(
      (item) => item.el === document.activeElement,
    )
    if (currentIndex === -1) return

    function selectByIndex(targetIdx) {
      const normalized =
        ((targetIdx % validEntries.length) + validEntries.length) %
        validEntries.length
      const chosen = validEntries[normalized]
      setSelectedValue(chosen.value)
      chosen.el.focus()
    }

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        selectByIndex(currentIndex + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        selectByIndex(currentIndex - 1)
        break
      case 'Home':
        event.preventDefault()
        selectByIndex(0)
        break
      case 'End':
        event.preventDefault()
        selectByIndex(validEntries.length - 1)
        break
      default:
        break
    }
  }

  const contextValue = {
    selectedValue,
    selectValue: setSelectedValue,
    getTabId: (value) => `${baseId}-tab-${sanitizeKey(value)}`,
    getPanelId: (value) => `${baseId}-panel-${sanitizeKey(value)}`,
    registerTab,
    handleKeyDown,
  }

  return (
    <TabsContext value={contextValue}>
      <div className={`tabs ${className}`.trim()}>{children}</div>
    </TabsContext>
  )
}

Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel
