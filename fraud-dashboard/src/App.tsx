import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import FraudInvestigation from './FraudInvestigation'
import MissedFraudAnalysis from './MissedFraudAnalysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Progress } from "./components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import {
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Shield,
  Activity,
  Users,
  BarChart3,
  Zap,
  Brain,
  Eye,
  AlertCircle
} from "lucide-react"

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  // Comprehensive metrics from the fraud detection project
  const metrics = {
    totalTransactions: 284807,
    fraudCases: 492,
    fraudRate: 0.173,
    classImbalance: 578,
    
    // Model Performance
    recallRate: 83.8,
    precisionRate: 75.2,
    f1Score: 0.792,
    rocAuc: 0.968,
    falsePositiveRate: 0.048,
    
    // Business Impact
    annualSavings: 2728229.7,
    fraudPrevented: 2770000,
    fraudMissed: 535000,
    investigationCosts: 37000,
    roi: 16115,
    
    // System Performance
    responseTime: 47,
    fraudsCaught: 413,
    fraudsMissed: 79,
    falseAlarms: 41,
    trueNegatives: 284315 - 41,
    
    // Feature Engineering
    engineeredFeatures: 21,
    topFeature: 'pca_magnitude',
    topFeatureImportance: 34.5,
    
    // Segments
    highValueRecall: 94,
    mediumRecall: 89,
    nightRecall: 91,
    microRecall: 78
  }

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Dashboard</h1>
        <p className="text-gray-600 text-left">Fraud Detection System - Real-time Performance Dashboard</p>
        <div className="text-sm text-gray-500 mt-1 text-left">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Top Metrics - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 text-left">
            <CardDescription className="text-left">Total Transactions</CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <div className="text-3xl font-bold">{metrics.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Processed in dataset</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 text-left">
            <CardDescription className="text-left">Fraud Detection Rate</CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <div className="text-3xl font-bold text-red-600">{metrics.recallRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Of all fraud cases caught</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 text-left">
            <CardDescription className="text-left">Annual Value Add</CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <div className="text-3xl font-bold text-green-600">
              ${(metrics.annualSavings / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">Fraud prevented annually</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 text-left">
            <CardDescription className="text-left">ROI</CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <div className="text-3xl font-bold text-yellow-600">{metrics.roi.toLocaleString()}%</div>
            <p className="text-xs text-muted-foreground mt-1">Return on investment</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="model">Model Performance</TabsTrigger>
          <TabsTrigger value="business">Business Impact</TabsTrigger>
          <TabsTrigger value="features">Feature Analysis</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Performance Summary */}
            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  <CardTitle className="text-left">System Performance Summary</CardTitle>
                </div>
                <CardDescription className="text-left">Key performance indicators for fraud detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-left">Fraud Detection Rate</span>
                    <span className="font-semibold">{metrics.recallRate}%</span>
                  </div>
                  <Progress value={metrics.recallRate} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-left">False Positive Rate</span>
                    <span className="font-semibold">{metrics.falsePositiveRate}%</span>
                  </div>
                  <Progress value={metrics.falsePositiveRate * 10} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-left">Investigation Efficiency</span>
                    <span className="font-semibold">{metrics.precisionRate}%</span>
                  </div>
                  <Progress value={metrics.precisionRate} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-left">Response Time</span>
                    <span className="font-semibold">&lt;{metrics.responseTime}ms</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Fraud Statistics */}
            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <CardTitle className="text-left">Fraud Statistics</CardTitle>
                </div>
                <CardDescription className="text-left">Dataset composition and fraud patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground text-left">Total Transactions</span>
                  <span className="font-semibold">{metrics.totalTransactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground text-left">Fraud Cases</span>
                  <span className="font-semibold text-red-600">{metrics.fraudCases}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground text-left">Fraud Rate</span>
                  <span className="font-semibold">{metrics.fraudRate}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground text-left">Class Imbalance</span>
                  <span className="font-semibold">{metrics.classImbalance}:1</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground text-left">Fraud Amount Lost</span>
                  <span className="font-semibold">${(metrics.fraudCases * 122.21).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground text-left">Avg Fraud Amount</span>
                  <span className="font-semibold">$122.21</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confusion Matrix Breakdown */}
          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-left">Detection Results Breakdown</CardTitle>
              <CardDescription className="text-left">Detailed confusion matrix analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div className="text-xs text-muted-foreground text-left">True Positives</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600 text-left">{metrics.fraudsCaught}</div>
                  <div className="text-xs text-gray-500 text-left">(Fraud Caught)</div>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <div className="text-xs text-muted-foreground text-left">False Negatives</div>
                  </div>
                  <div className="text-2xl font-bold text-red-600 text-left">{metrics.fraudsMissed}</div>
                  <div className="text-xs text-gray-500 text-left">(Fraud Missed)</div>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <div className="text-xs text-muted-foreground text-left">False Positives</div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600 text-left">{metrics.falseAlarms}</div>
                  <div className="text-xs text-gray-500 text-left">(False Alarms)</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <div className="text-xs text-muted-foreground text-left">True Negatives</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 text-left">{metrics.trueNegatives.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 text-left">(Correct Approvals)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MODEL PERFORMANCE TAB */}
        <TabsContent value="model" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <CardTitle className="text-left">Model Metrics</CardTitle>
                </div>
                <CardDescription className="text-left">XGBoost classifier performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">ROC-AUC Score</span>
                    <span className="font-semibold">{metrics.rocAuc}</span>
                  </div>
                  <Progress value={metrics.rocAuc * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-left">Near-perfect discrimination</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">F1 Score</span>
                    <span className="font-semibold">{metrics.f1Score}</span>
                  </div>
                  <Progress value={metrics.f1Score * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-left">Balanced precision-recall</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">Recall (Sensitivity)</span>
                    <span className="font-semibold">{metrics.recallRate}%</span>
                  </div>
                  <Progress value={metrics.recallRate} className="h-2" />
                  <p className="text-xs text-muted-foreground text-left">Catches {metrics.fraudsCaught} of 492 frauds</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">Precision</span>
                    <span className="font-semibold">{metrics.precisionRate}%</span>
                  </div>
                  <Progress value={metrics.precisionRate} className="h-2" />
                  <p className="text-xs text-muted-foreground text-left">3 of 4 alerts are real fraud</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-left">Segment Performance</CardTitle>
                </div>
                <CardDescription className="text-left">Detection rates by transaction type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">High Value (&gt;$500)</span>
                    <span className="font-semibold text-green-600">{metrics.highValueRecall}%</span>
                  </div>
                  <Progress value={metrics.highValueRecall} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">Medium ($100-$500)</span>
                    <span className="font-semibold text-green-600">{metrics.mediumRecall}%</span>
                  </div>
                  <Progress value={metrics.mediumRecall} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">Night Transactions</span>
                    <span className="font-semibold text-green-600">{metrics.nightRecall}%</span>
                  </div>
                  <Progress value={metrics.nightRecall} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-left">
                    <span className="text-muted-foreground text-left">Micro (&lt;$10)</span>
                    <span className="font-semibold text-orange-600">{metrics.microRecall}%</span>
                  </div>
                  <Progress value={metrics.microRecall} className="h-2" />
                  <p className="text-xs text-orange-600 text-left">⚠️ Needs improvement - likely card testing</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-left">Model Comparison</CardTitle>
              <CardDescription className="text-left">Performance across different algorithms</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Model</th>
                      <th className="text-left py-2 px-4">F1 Score</th>
                      <th className="text-left py-2 px-4">Recall</th>
                      <th className="text-left py-2 px-4">Precision</th>
                      <th className="text-left py-2 px-4">ROC-AUC</th>
                      <th className="text-left py-2 px-4">Selected</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-left">Logistic Regression</td>
                      <td className="text-left py-2 px-4">0.108</td>
                      <td className="text-left py-2 px-4">86.5%</td>
                      <td className="text-left py-2 px-4">5.8%</td>
                      <td className="text-left py-2 px-4">0.968</td>
                      <td className="text-left py-2 px-4">Baseline</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-left">Random Forest</td>
                      <td className="text-left py-2 px-4 font-semibold">0.813</td>
                      <td className="text-left py-2 px-4">76.4%</td>
                      <td className="text-left py-2 px-4 font-semibold">86.9%</td>
                      <td className="text-left py-2 px-4">0.938</td>
                      <td className="text-left py-2 px-4">Best F1</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="py-2 px-4 font-semibold text-left">XGBoost</td>
                      <td className="text-left py-2 px-4">0.792</td>
                      <td className="text-left py-2 px-4 font-semibold">83.8%</td>
                      <td className="text-left py-2 px-4">75.2%</td>
                      <td className="text-left py-2 px-4 font-semibold">0.968</td>
                      <td className="text-left py-2 px-4">
                        <Badge className="bg-green-600">✓ Deployed</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BUSINESS IMPACT TAB */}
        <TabsContent value="business" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <CardTitle className="text-left">Financial Impact</CardTitle>
                </div>
                <CardDescription className="text-left">Annual cost-benefit analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex justify-between items-center py-3 border-b">
                  <div className="text-left">
                    <div className="font-semibold text-sm text-left">Fraud Prevented</div>
                    <div className="text-xs text-muted-foreground text-left">{metrics.fraudsCaught} cases caught × $122 avg</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+${(metrics.fraudPrevented / 1000000).toFixed(2)}M</div>
                    <div className="text-xs text-muted-foreground">Annual savings</div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <div className="text-left">
                    <div className="font-semibold text-sm text-left">Fraud Missed</div>
                    <div className="text-xs text-muted-foreground text-left">{metrics.fraudsMissed} cases × $122 avg</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">-${(metrics.fraudMissed / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">Annual loss</div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <div className="text-left">
                    <div className="font-semibold text-sm text-left">Investigation Costs</div>
                    <div className="text-xs text-muted-foreground text-left">{metrics.falseAlarms} FP × $5 + customer calls</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">-${(metrics.investigationCosts / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">Annual cost</div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 bg-green-50 rounded-lg px-4 mt-3">
                  <div className="text-left">
                    <div className="font-bold text-left">Net Annual Value</div>
                    <div className="text-xs text-muted-foreground text-left">Total impact</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-green-600">
                      ${(metrics.annualSavings / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-xs text-green-600">ROI: {metrics.roi.toLocaleString()}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-left">Operational Efficiency</CardTitle>
                </div>
                <CardDescription className="text-left">Analyst workload and system performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="p-4 bg-gray-100 rounded-lg text-left">
                  <div className="text-sm font-semibold mb-1 text-left">Investigation Efficiency</div>
                  <div className="text-2xl font-bold text-gray-900 text-left">{metrics.precisionRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    3 out of 4 alerts are real fraud - analysts focus on actual threats
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg text-left">
                  <div className="text-sm font-semibold mb-1 text-left">Transaction Coverage</div>
                  <div className="text-2xl font-bold text-gray-900 text-left">99.9%</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    Robust to missing data - handles all transactions
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg text-left">
                  <div className="text-sm font-semibold mb-1 text-left">Response Time (p95)</div>
                  <div className="text-2xl font-bold text-gray-900 text-left">&lt;{metrics.responseTime}ms</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    Real-time capable - can process 52M transactions/year
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg text-left">
                  <div className="text-sm font-semibold mb-1 text-left">Customer Impact</div>
                  <div className="text-2xl font-bold text-gray-900 text-left">99.95%</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    Of legitimate customers never experience friction
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-left">Cost-Benefit Comparison</CardTitle>
              <CardDescription className="text-left">System performance vs. alternatives</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4">Scenario</th>
                      <th className="text-left py-2 px-4">Frauds Caught</th>
                      <th className="text-left py-2 px-4">False Alarms</th>
                      <th className="text-left py-2 px-4">Annual Cost</th>
                      <th className="text-left py-2 px-4">Net Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-left">No Detection System</td>
                      <td className="text-left py-2 px-4">0</td>
                      <td className="text-left py-2 px-4">0</td>
                      <td className="text-left py-2 px-4 text-red-600">-$3.3M</td>
                      <td className="text-left py-2 px-4 font-semibold text-red-600">-$3.3M</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-left">Review All Transactions</td>
                      <td className="text-left py-2 px-4">492</td>
                      <td className="text-left py-2 px-4">284,315</td>
                      <td className="text-left py-2 px-4 text-orange-600">-$260K</td>
                      <td className="text-left py-2 px-4 font-semibold text-orange-600">+$3.0M</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="py-2 px-4 font-semibold text-left">Our ML System</td>
                      <td className="text-left py-2 px-4 font-semibold">{metrics.fraudsCaught}</td>
                      <td className="text-left py-2 px-4 font-semibold">{metrics.falseAlarms}</td>
                      <td className="text-left py-2 px-4 text-green-600">-$37K</td>
                      <td className="text-left py-2 px-4 font-bold text-green-600">+$2.73M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FEATURE ANALYSIS TAB */}
        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <CardTitle className="text-left">Top Features</CardTitle>
                </div>
                <CardDescription className="text-left">Most important features for fraud detection</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-left">
                      <span className="font-semibold text-left">1. pca_magnitude</span>
                      <span className="text-muted-foreground">{metrics.topFeatureImportance}%</span>
                    </div>
                    <Progress value={metrics.topFeatureImportance * 2.5} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-left">Custom engineered - Euclidean norm of PCA components</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1 text-left">
                      <span className="font-semibold text-left">2. V17</span>
                      <span className="text-muted-foreground">18.2%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-left">Original PCA feature from dataset</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1 text-left">
                      <span className="font-semibold text-left">3. iso_forest_score</span>
                      <span className="text-muted-foreground">12.8%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-left">Anomaly detection score - 217× fraud lift</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1 text-left">
                      <span className="font-semibold text-left">4. V14</span>
                      <span className="text-muted-foreground">9.5%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-left">Original PCA feature</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1 text-left">
                      <span className="font-semibold text-left">5. log_amount</span>
                      <span className="text-muted-foreground">7.3%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-left">Engineered - Log-transformed transaction amount</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-left">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <CardTitle className="text-left">Feature Engineering</CardTitle>
                </div>
                <CardDescription className="text-left">Custom features created for this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="p-3 bg-purple-50 rounded-lg text-left">
                  <div className="font-semibold text-sm mb-1 text-left">Total Engineered Features</div>
                  <div className="text-3xl font-bold text-purple-600 text-left">{metrics.engineeredFeatures}</div>
                  <p className="text-xs text-muted-foreground mt-1 text-left">
                    Across 3 tiers: Statistical, Behavioral, Advanced
                  </p>
                </div>

                <div className="text-left">
                  <div className="font-semibold text-sm mb-2 text-left">Feature Categories</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-left">Tier 1: Statistical (12 features)</span>
                      <Badge>Core</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-left">Tier 2: Behavioral (4 features)</span>
                      <Badge>Domain</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-left">Tier 3: Advanced (5 features)</span>
                      <Badge>ML</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg text-left">
                  <div className="font-semibold text-sm mb-1 text-left">Impact</div>
                  <p className="text-sm text-gray-700 text-left">
                    3 engineered features ranked in top-10 most important. 
                    Top feature (<span className="font-semibold">pca_magnitude</span>) is entirely custom-created.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-left">Key Feature Insights</CardTitle>
              <CardDescription className="text-left">Why certain features matter for fraud detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <Eye className="w-6 h-6 text-blue-500 mt-1" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm mb-1 text-left">Isolation Forest Outliers</div>
                      <div className="text-2xl font-bold text-blue-600 mb-1 text-left">217×</div>
                      <p className="text-xs text-muted-foreground text-left">
                        fraud concentration - Only 0.2% of transactions but contains 26% of all fraud
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-purple-500 mt-1" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm mb-1 text-left">Night Transactions</div>
                      <div className="text-2xl font-bold text-purple-600 mb-1 text-left">3×</div>
                      <p className="text-xs text-muted-foreground text-left">
                        higher fraud rate - Transactions between 11PM-6AM show elevated fraud patterns
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-green-500 mt-1" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm mb-1 text-left">PCA Magnitude</div>
                      <div className="text-2xl font-bold text-green-600 mb-1 text-left">3.2×</div>
                      <p className="text-xs text-muted-foreground text-left">
                        higher for fraud - Measures "overall intensity" in PCA space, fraud has stronger signals
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg text-left">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-orange-500 mt-1" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm mb-1 text-left">Transaction Amount</div>
                      <div className="text-2xl font-bold text-orange-600 mb-1 text-left">$122</div>
                      <p className="text-xs text-muted-foreground text-left">
                        avg fraud amount - Though fraud median is $9.25, mean is higher due to some large frauds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button 
          onClick={() => setCurrentView('investigation')}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            Investigate 492 Fraud Cases
          </div>
        </button>
        <button 
          onClick={() => setCurrentView('missed')}
          className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Analyze 79 Missed Frauds
          </div>
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 ml-72 pl-4 pr-8 py-8">
        <div className="max-w-7xl mx-auto px-0">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'investigation' && <FraudInvestigation />}
          {currentView === 'missed' && <MissedFraudAnalysis />}
        </div>
      </main>
    </div>
  )
}

export default App
