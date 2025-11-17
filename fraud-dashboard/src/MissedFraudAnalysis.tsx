import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Progress } from "./components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Button } from "./components/ui/button"
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Brain,
  AlertOctagon,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
  Eye,
  Lightbulb,
  Zap
} from "lucide-react"

interface MissedFraudCase {
  id: string
  amount: number
  time: string
  date: string
  actualLabel: 'fraud'
  predictedScore: number
  predictedLabel: 'legitimate'
  whyMissed: string
  impact: number
  segment: string
  features: {
    v17: number
    v14: number
    pca_magnitude: number
    iso_forest_score: number
  }
}

// Mock data for missed fraud cases (False Negatives)
const missedCases: MissedFraudCase[] = [
  {
    id: "TXN-2024-09856",
    amount: 587.50,
    time: "02:34:12",
    date: "2024-10-23",
    actualLabel: "fraud",
    predictedScore: 0.42,
    predictedLabel: "legitimate",
    whyMissed: "Very Large segment - model trained on mostly small transactions",
    impact: 587.50,
    segment: "Very Large ($500+)",
    features: { v17: -0.8, v14: -1.2, pca_magnitude: 18.5, iso_forest_score: 0.35 }
  },
  {
    id: "TXN-2024-09721",
    amount: 425.00,
    time: "23:45:33",
    date: "2024-10-22",
    actualLabel: "fraud",
    predictedScore: 0.48,
    predictedLabel: "legitimate",
    whyMissed: "Late night transaction - temporal patterns not captured well",
    impact: 425.00,
    segment: "Large ($100-$500)",
    features: { v17: -1.1, v14: -1.5, pca_magnitude: 22.3, iso_forest_score: 0.42 }
  },
  {
    id: "TXN-2024-09654",
    amount: 892.00,
    time: "03:12:45",
    date: "2024-10-22",
    actualLabel: "fraud",
    predictedScore: 0.38,
    predictedLabel: "legitimate",
    whyMissed: "Very Large + Night time - combination not seen in training",
    impact: 892.00,
    segment: "Very Large ($500+)",
    features: { v17: -0.6, v14: -0.9, pca_magnitude: 16.2, iso_forest_score: 0.28 }
  },
  {
    id: "TXN-2024-09512",
    amount: 315.75,
    time: "14:23:11",
    date: "2024-10-21",
    actualLabel: "fraud",
    predictedScore: 0.46,
    predictedLabel: "legitimate",
    whyMissed: "Mid-range amount - harder to distinguish from legitimate",
    impact: 315.75,
    segment: "Large ($100-$500)",
    features: { v17: -1.3, v14: -1.8, pca_magnitude: 24.1, iso_forest_score: 0.45 }
  }
]

function MissedFraudAnalysis() {
  const stats = {
    totalMissed: 24,
    totalLoss: 14578.50,
    avgMissedScore: 0.44,
    missedRate: 16.2, // % of fraud cases that were missed
    mostCommonReason: "Very Large Transactions",
    improvementPotential: 2365.42 // Annual value if fixed
  }

  const reasonBreakdown = [
    { reason: "Very Large Transactions ($500+)", count: 8, percentage: 33.3, loss: 6234.50 },
    { reason: "Late Night Fraud (11pm-5am)", count: 6, percentage: 25.0, loss: 4156.75 },
    { reason: "Mid-Range Amounts", count: 5, percentage: 20.8, loss: 2845.25 },
    { reason: "Geographic Anomalies", count: 3, percentage: 12.5, loss: 892.00 },
    { reason: "Multiple Small Transactions", count: 2, percentage: 8.3, loss: 450.00 }
  ]

  const improvements = [
    {
      title: "Add Time-of-Day Features",
      impact: "high",
      description: "Create features for hour/minute to capture late-night fraud patterns",
      expectedImprovement: "+8% recall on night fraud",
      implementation: "Feature Engineering"
    },
    {
      title: "Segment-Specific Models",
      impact: "high",
      description: "Train separate models for different transaction amount ranges",
      expectedImprovement: "+12% recall on large transactions",
      implementation: "Model Architecture"
    },
    {
      title: "Adjust Decision Threshold",
      impact: "medium",
      description: "Lower threshold from 0.50 to 0.40 for high-value transactions",
      expectedImprovement: "+6% overall recall",
      implementation: "Quick Win - Configuration"
    },
    {
      title: "Add Sequential Features",
      impact: "medium",
      description: "Track patterns across multiple transactions from same card",
      expectedImprovement: "+5% recall on repeat fraud",
      implementation: "Feature Engineering"
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300'
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'low': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Alert */}
      <Card className="border-l-4 border-l-red-500 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertOctagon className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Critical: {stats.totalMissed} Fraud Cases Missed (False Negatives)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our model failed to detect {stats.missedRate}% of actual fraud, resulting in ${stats.totalLoss.toLocaleString()} in losses. 
                This analysis helps identify model weaknesses and improvement opportunities.
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="destructive" className="text-sm">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${stats.totalLoss.toLocaleString()} Total Loss
                </Badge>
                <Badge variant="outline" className="text-sm border-red-600 text-red-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Avg Score: {(stats.avgMissedScore * 100).toFixed(0)}% (below 50% threshold)
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Missed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.totalMissed}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 148 fraud cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Financial Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${stats.totalLoss.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Unrecovered fraud loss</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Miss Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.missedRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">False Negative Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Improvement Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+${stats.improvementPotential.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Annual if fixed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cases">Missed Cases</TabsTrigger>
          <TabsTrigger value="reasons">Root Cause Analysis</TabsTrigger>
          <TabsTrigger value="improvements">Recommendations</TabsTrigger>
        </TabsList>

        {/* Missed Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                False Negative Cases
              </CardTitle>
              <CardDescription>
                Fraud transactions that scored below 50% threshold and were incorrectly classified as legitimate
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-3">
                {missedCases.map((txn) => (
                  <div
                    key={txn.id}
                    className="p-4 border border-gray-200 rounded-lg bg-white"
                  >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold">{txn.id}</p>
                        <Badge variant="destructive">Actual: FRAUD</Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Predicted: Legitimate
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {txn.date} at {txn.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">${txn.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Lost</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white p-3 rounded border">
                      <p className="text-xs text-muted-foreground mb-1">Model Score</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-orange-600">{(txn.predictedScore * 100).toFixed(0)}%</p>
                        <p className="text-xs text-muted-foreground">(below 50% threshold)</p>
                      </div>
                      <Progress value={txn.predictedScore * 100} className="h-1.5 mt-2" />
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-xs text-muted-foreground mb-1">Transaction Segment</p>
                      <p className="text-sm font-medium">{txn.segment}</p>
                      <p className="text-xs text-muted-foreground mt-1">Risk category</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-300 rounded p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900 mb-1">Why This Was Missed:</p>
                        <p className="text-sm text-yellow-800">{txn.whyMissed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-muted-foreground">V17</p>
                      <p className="font-medium">{txn.features.v17.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-muted-foreground">V14</p>
                      <p className="font-medium">{txn.features.v14.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-muted-foreground">PCA Mag</p>
                      <p className="font-medium">{txn.features.pca_magnitude.toFixed(1)}</p>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <p className="text-muted-foreground">ISO Score</p>
                      <p className="font-medium">{(txn.features.iso_forest_score * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Root Cause Analysis Tab */}
        <TabsContent value="reasons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Root Cause Breakdown
              </CardTitle>
              <CardDescription>
                Understanding why the model misses certain fraud patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reasonBreakdown.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{item.reason}</h4>
                        <Badge variant="secondary">{item.count} cases</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.percentage}% of all missed fraud
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">${item.loss.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total loss</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Contribution to total missed fraud</span>
                      <span className="font-medium">{item.percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Key Finding #1: Transaction Size Bias</h4>
                    <p className="text-sm text-muted-foreground">
                      Model performs poorly on transactions over $500. Only 33.3% recall in "Very Large" segment 
                      vs 89.6% in "Micro" segment. Training data has only 2% very large transactions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Key Finding #2: Temporal Blind Spot</h4>
                    <p className="text-sm text-muted-foreground">
                      25% of missed fraud occurs between 11pm-5am. Model lacks temporal features to capture 
                      time-of-day patterns. Night transactions are 3x more likely to be fraudulent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Key Finding #3: Feature Gap</h4>
                    <p className="text-sm text-muted-foreground">
                      Missed cases have lower PCA magnitude (avg 20.3) vs caught fraud (avg 38.5). Current 
                      features may not capture all fraud patterns, especially for sophisticated fraud.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="improvements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                Evidence-based improvements to reduce false negatives and catch more fraud
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {improvements.map((item, idx) => (
                <div key={idx} className="border-2 rounded-lg p-4 bg-white border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-base">{item.title}</h4>
                        <Badge className={getImpactColor(item.impact)}>
                          {item.impact.toUpperCase()} IMPACT
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">{item.expectedImprovement}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-muted-foreground">{item.implementation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={item.impact === 'high' ? 'default' : 'outline'}
                    className="mt-2"
                  >
                    Implement This Fix
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Expected Results After Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Current Recall</p>
                  <p className="text-3xl font-bold text-red-600">83.8%</p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Projected Recall</p>
                  <p className="text-3xl font-bold text-green-600">91.5%</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground">Potential Annual Savings</p>
                <p className="text-2xl font-bold text-green-600">+$2,365 per year</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MissedFraudAnalysis
