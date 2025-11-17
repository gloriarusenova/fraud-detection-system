import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Progress } from "./components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Button } from "./components/ui/button"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  Shield,
  DollarSign,
  MapPin,
  Calendar,
  CreditCard,
  User,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  AlertOctagon
} from "lucide-react"

interface Transaction {
  id: string
  amount: number
  time: string
  date: string
  fraudScore: number
  status: 'pending' | 'confirmed_fraud' | 'confirmed_legitimate' | 'under_review'
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  features: {
    v17: number
    v14: number
    iso_forest_score: number
    pca_magnitude: number
  }
  location?: string
  cardLast4?: string
}

// Mock data - in production this would come from your API
const mockTransactions: Transaction[] = [
  {
    id: "TXN-2024-10001",
    amount: 378.92,
    time: "14:23:45",
    date: "2024-10-24",
    fraudScore: 0.94,
    status: "pending",
    riskLevel: "critical",
    features: { v17: -2.8, v14: -5.1, iso_forest_score: 0.89, pca_magnitude: 45.2 },
    location: "Online - IP: 185.220.101.X",
    cardLast4: "4532"
  },
  {
    id: "TXN-2024-10002",
    amount: 892.15,
    time: "14:18:32",
    date: "2024-10-24",
    fraudScore: 0.91,
    status: "pending",
    riskLevel: "critical",
    features: { v17: -3.2, v14: -4.8, iso_forest_score: 0.85, pca_magnitude: 42.1 },
    location: "Online - IP: 203.112.45.X",
    cardLast4: "8821"
  },
  {
    id: "TXN-2024-10003",
    amount: 45.20,
    time: "14:15:11",
    date: "2024-10-24",
    fraudScore: 0.87,
    status: "under_review",
    riskLevel: "high",
    features: { v17: -2.1, v14: -3.9, iso_forest_score: 0.78, pca_magnitude: 38.5 },
    location: "Retail - NYC",
    cardLast4: "1234"
  },
  {
    id: "TXN-2024-10004",
    amount: 1250.00,
    time: "13:45:22",
    date: "2024-10-24",
    fraudScore: 0.82,
    status: "pending",
    riskLevel: "high",
    features: { v17: -1.8, v14: -3.2, iso_forest_score: 0.72, pca_magnitude: 35.8 },
    location: "Online - IP: 157.88.23.X",
    cardLast4: "9987"
  },
  {
    id: "TXN-2024-10005",
    amount: 67.89,
    time: "13:12:05",
    date: "2024-10-24",
    fraudScore: 0.76,
    status: "confirmed_legitimate",
    riskLevel: "medium",
    features: { v17: -1.2, v14: -2.5, iso_forest_score: 0.65, pca_magnitude: 28.3 },
    location: "Gas Station - CA",
    cardLast4: "5566"
  }
]

function FraudInvestigation() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterRisk, setFilterRisk] = useState<string>("all")

  const stats = {
    pendingReview: 24,
    confirmedFraud: 12,
    falsePositives: 8,
    avgInvestigationTime: "3.2 min",
    todayAlerts: 24,
    escalatedCases: 6
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'confirmed_fraud':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Fraud</Badge>
      case 'confirmed_legitimate':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Legitimate</Badge>
      case 'under_review':
        return <Badge variant="secondary"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleMarkAsFraud = (txn: Transaction) => {
    console.log('Marking as fraud:', txn.id)
    // In production: API call to update transaction status
    alert(`Transaction ${txn.id} marked as FRAUD and blocked.`)
  }

  const handleMarkAsLegitimate = (txn: Transaction) => {
    console.log('Marking as legitimate:', txn.id)
    // In production: API call to update transaction status
    alert(`Transaction ${txn.id} marked as LEGITIMATE.`)
  }

  const handleEscalate = (txn: Transaction) => {
    console.log('Escalating:', txn.id)
    // In production: API call to escalate to senior investigator
    alert(`Transaction ${txn.id} escalated to senior investigator.`)
  }

  const filteredTransactions = mockTransactions.filter(txn => {
    if (filterStatus !== 'all' && txn.status !== filterStatus) return false
    if (filterRisk !== 'all' && txn.riskLevel !== filterRisk) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">🔍 Fraud Investigation Center</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Real-time fraud detection and investigation dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-base px-4 py-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {stats.pendingReview} Pending
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pendingReview}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed Fraud</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.confirmedFraud}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">False Positives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.falsePositives}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.avgInvestigationTime}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.todayAlerts}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Escalated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.escalatedCases}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Investigation Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Transaction List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertOctagon className="h-5 w-5 text-red-600" />
                      High-Risk Transactions
                    </CardTitle>
                    <CardDescription>
                      Transactions flagged by ML model - prioritized by fraud score
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      className="text-sm border rounded px-2 py-1"
                      value={filterRisk}
                      onChange={(e) => setFilterRisk(e.target.value)}
                    >
                      <option value="all">All Risks</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <select 
                      className="text-sm border rounded px-2 py-1"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="confirmed_fraud">Confirmed Fraud</option>
                      <option value="confirmed_legitimate">Legitimate</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    onClick={() => setSelectedTransaction(txn)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md bg-white ${
                      selectedTransaction?.id === txn.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          txn.riskLevel === 'critical' ? 'bg-red-100' : 
                          txn.riskLevel === 'high' ? 'bg-orange-100' : 
                          'bg-yellow-100'
                        }`}>
                          {txn.riskLevel === 'critical' ? (
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{txn.id}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {txn.date} at {txn.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${txn.amount.toFixed(2)}</p>
                        <div className="flex items-center gap-1 justify-end">
                          <p className="text-sm font-medium">Fraud Score:</p>
                          <p className="text-sm font-bold text-red-600">{(txn.fraudScore * 100).toFixed(0)}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        <span>****{txn.cardLast4}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{txn.location}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Model Confidence</span>
                        <span className="font-medium">{(txn.fraudScore * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={txn.fraudScore * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Transaction Details Panel */}
          <div className="lg:col-span-1">
            {selectedTransaction ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Investigation Details</CardTitle>
                  <CardDescription>
                    Review transaction data and take action
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Transaction ID</span>
                      <span className="font-medium">{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-bold text-lg">${selectedTransaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fraud Score</span>
                      <span className="font-bold text-red-600">{(selectedTransaction.fraudScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <Badge className={getRiskColor(selectedTransaction.riskLevel)}>
                        {selectedTransaction.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Feature Analysis</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>PCA Magnitude</span>
                          <span className="font-medium">{selectedTransaction.features.pca_magnitude}</span>
                        </div>
                        <Progress value={selectedTransaction.features.pca_magnitude} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Isolation Forest Score</span>
                          <span className="font-medium">{(selectedTransaction.features.iso_forest_score * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={selectedTransaction.features.iso_forest_score * 100} className="h-1.5" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="border rounded p-2">
                          <p className="text-muted-foreground">V17</p>
                          <p className="font-medium">{selectedTransaction.features.v17.toFixed(2)}</p>
                        </div>
                        <div className="border rounded p-2">
                          <p className="text-muted-foreground">V14</p>
                          <p className="font-medium">{selectedTransaction.features.v14.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Additional Context</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedTransaction.date} at {selectedTransaction.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedTransaction.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span>Card ending in {selectedTransaction.cardLast4}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <h4 className="font-medium mb-3">Take Action</h4>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => handleMarkAsFraud(selectedTransaction)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Confirm Fraud & Block
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleMarkAsLegitimate(selectedTransaction)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Legitimate
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-full"
                      onClick={() => handleEscalate(selectedTransaction)}
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      Escalate to Senior
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6">
                <CardContent className="flex flex-col items-center justify-center h-96 text-center">
                  <Search className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">Select a Transaction</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a transaction from the list to view details and take action
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FraudInvestigation
