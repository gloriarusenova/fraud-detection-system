import { Badge } from "./ui/badge"
import {
  LayoutDashboard,
  Search,
  AlertTriangle,
  Activity
} from "lucide-react"

interface SidebarProps {
  currentView: string
  onNavigate: (view: string) => void
}

function Sidebar({ 
  currentView, 
  onNavigate
}: SidebarProps) {
  const stats = {
    totalTransactions: 284807,
    fraudCases: 492,
    fraudRate: 0.173,
    accuracy: 84
  }

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', emoji: '📊' },
    { id: 'investigation', icon: Search, label: 'Fraud Investigation', emoji: '🔍' },
    { id: 'missed', icon: AlertTriangle, label: 'Missed Cases Analysis', emoji: '⚠️' }
  ]

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 bg-red-100 rounded-lg">
            <Activity className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Fraud Detection</h1>
            <p className="text-xs text-muted-foreground">Real-time System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm flex-1 text-left">{item.label}</span>
              {isActive && (
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Stats Section */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500">
          <Activity className="w-4 h-4" />
          <span>STATS</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Transactions</span>
            <span className="font-medium">{stats.totalTransactions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fraud Cases</span>
            <span className="font-medium text-red-600">
              {stats.fraudCases} ({stats.fraudRate}%)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Model Accuracy</span>
            <span className="font-medium text-green-600">{stats.accuracy}%</span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Last Updated</span>
              <Badge variant="secondary" className="text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
