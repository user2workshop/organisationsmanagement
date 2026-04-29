import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import OrgUebersicht from './pages/OrgUebersicht'
import MitarbeiterPage from './pages/MitarbeiterPage'
import StellenPage from './pages/StellenPage'
import VertretungsregelnPage from './pages/VertretungsregelnPage'
import KostenstellenPage from './pages/KostenstellenPage'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-700 text-white'
            : 'text-blue-100 hover:bg-blue-600'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
            <span className="text-white font-bold text-lg mr-6">Organisationsmanagement</span>
            <NavItem to="/" label="Org-Übersicht" />
            <NavItem to="/mitarbeiter" label="Mitarbeiter" />
            <NavItem to="/stellen" label="Stellen" />
            <NavItem to="/vertretungsregeln" label="Vertretungsregeln" />
            <NavItem to="/kostenstellen" label="Kostenstellen" />
            <a
              href="/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
              className="ml-auto px-4 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white"
            >
              API-Docs ↗
            </a>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<OrgUebersicht />} />
            <Route path="/mitarbeiter" element={<MitarbeiterPage />} />
            <Route path="/stellen" element={<StellenPage />} />
            <Route path="/vertretungsregeln" element={<VertretungsregelnPage />} />
            <Route path="/kostenstellen" element={<KostenstellenPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
