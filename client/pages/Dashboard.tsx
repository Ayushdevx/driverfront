import Layout from "@/components/Layout";
import AIProcessor from "@/components/AIProcessor";
import WellnessMonitor from "@/components/WellnessMonitor";
import SafetyInterventions from "@/components/SafetyInterventions";
import WearableIntegration from "@/components/WearableIntegration";
import SystemHealth from "@/components/SystemHealth";
import {
  AlertTriangle,
  Camera,
  Heart,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Clock,
  Download,
  Calendar,
  Gauge,
  Eye,
  Brain,
  Wind,
  Smartphone,
  Database,
  Shield,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts";

interface Alert {
  id: number;
  type: "warning" | "critical" | "info";
  message: string;
  time: string;
  action?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const drowsinessData = [
  { time: "12:00", level: 15, heartRate: 70, eyeClosure: 8 },
  { time: "12:15", level: 18, heartRate: 72, eyeClosure: 10 },
  { time: "12:30", level: 22, heartRate: 75, eyeClosure: 13 },
  { time: "12:45", level: 28, heartRate: 78, eyeClosure: 16 },
  { time: "1:00", level: 32, heartRate: 80, eyeClosure: 19 },
  { time: "1:15", level: 38, heartRate: 82, eyeClosure: 23 },
  { time: "1:30", level: 35, heartRate: 79, eyeClosure: 20 },
  { time: "1:45", level: 28, heartRate: 76, eyeClosure: 15 },
];

const performanceData = [
  { name: "Focus", value: 85 },
  { name: "Alertness", value: 78 },
  { name: "Reaction Time", value: 82 },
  { name: "Coordination", value: 75 },
  { name: "Safety", value: 88 },
  { name: "Stability", value: 80 },
];

const hourlyData = [
  { hour: "12:00", drowsy: 15, stressed: 10, normal: 75 },
  { hour: "1:00", drowsy: 32, stressed: 25, normal: 43 },
  { hour: "2:00", drowsy: 45, stressed: 35, normal: 20 },
  { hour: "3:00", drowsy: 52, stressed: 42, normal: 6 },
];

const correlationData = [
  { stress: 15, drowsiness: 20 },
  { stress: 25, drowsiness: 35 },
  { stress: 35, drowsiness: 45 },
  { stress: 45, drowsiness: 60 },
  { stress: 55, drowsiness: 70 },
  { stress: 65, drowsiness: 75 },
  { stress: 75, drowsiness: 85 },
];

const vehicleMetricsData = [
  { time: "12:00", steeringVariance: 2.1, laneOffset: 0.3 },
  { time: "12:15", steeringVariance: 2.3, laneOffset: 0.4 },
  { time: "12:30", steeringVariance: 3.2, laneOffset: 0.6 },
  { time: "12:45", steeringVariance: 4.5, laneOffset: 0.9 },
  { time: "1:00", steeringVariance: 5.8, laneOffset: 1.3 },
  { time: "1:15", steeringVariance: 6.2, laneOffset: 1.5 },
  { time: "1:30", steeringVariance: 5.1, laneOffset: 1.1 },
  { time: "1:45", steeringVariance: 3.8, laneOffset: 0.7 },
];

export default function Dashboard() {
  const [drowsinessLevel, setDrowsinessLevel] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [alerts] = useState<Alert[]>([
    {
      id: 1,
      type: "warning",
      message: "Elevated eye closure detected (23%)",
      time: "2 minutes ago",
      action: "Rest break recommended",
    },
    {
      id: 2,
      type: "info",
      message: "Steering behavior normal - variance 3.8°",
      time: "5 minutes ago",
    },
    {
      id: 3,
      type: "critical",
      message: "Heart rate elevated - stress level 45%",
      time: "8 minutes ago",
      action: "Play relaxation audio",
    },
  ]);

  useEffect(() => {
    const drowsyInterval = setInterval(() => {
      setDrowsinessLevel((prev) => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 1500);

    const stressInterval = setInterval(() => {
      setStressLevel((prev) => {
        const change = (Math.random() - 0.5) * 4;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);

    return () => {
      clearInterval(drowsyInterval);
      clearInterval(stressInterval);
    };
  }, []);

  const getStatusColor = (level: number) => {
    if (level < 33) return "text-wellness-safe";
    if (level < 67) return "text-wellness-warning";
    return "text-wellness-alert";
  };

  const getStatusLabel = (level: number) => {
    if (level < 33) return "Safe";
    if (level < 67) return "Caution";
    return "Critical";
  };

  const getGaugeColor = (level: number) => {
    if (level < 33) return "from-wellness-safe to-wellness-safe/50";
    if (level < 67) return "from-wellness-warning to-wellness-warning/50";
    return "from-wellness-alert to-wellness-alert/50";
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-background to-muted/30 min-h-screen pb-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/20 rounded-3xl p-8 shadow-2xl">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(0, 136, 255, 0.1) 0%, rgba(0, 170, 136, 0.1) 100%)',
                    'linear-gradient(225deg, rgba(0, 170, 136, 0.1) 0%, rgba(0, 136, 255, 0.1) 100%)',
                    'linear-gradient(135deg, rgba(0, 136, 255, 0.1) 0%, rgba(0, 170, 136, 0.1) 100%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3 tracking-tight">
                    Real-Time Driver <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Wellness Monitor</span>
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 bg-wellness-safe/20 border border-wellness-safe/30 rounded-full backdrop-blur-sm"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.span
                        className="w-3 h-3 bg-wellness-safe rounded-full shadow-lg"
                        animate={{ 
                          boxShadow: [
                            '0 0 0 0 rgba(34, 197, 94, 0.7)',
                            '0 0 0 8px rgba(34, 197, 94, 0)',
                            '0 0 0 0 rgba(34, 197, 94, 0.7)',
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-bold text-wellness-safe">AI Engine Active</span>
                    </motion.div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">All Systems Online</span>
                    </div>
                  </div>
                </div>
                <motion.button 
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:shadow-2xl transition-all shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  Export Report
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* AI Processor Component */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AIProcessor accuracy={98} isProcessing={true} />
          </motion.div>

          {/* Wellness Monitor Cards */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WellnessMonitor />
          </motion.div>

          {/* Video Feed with Image */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Main Video Feed with Real Image */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <div className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-border rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all">
                {/* Real Image Background */}
                <div className="relative aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/10480629/pexels-photo-10480629.jpeg"
                    alt="Cabin video feed"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/40"></div>

                  {/* AI Overlay Elements */}
                  <div className="relative space-y-4 text-center z-10">
                    <motion.div
                      className="inline-flex items-center gap-3 px-6 py-3 bg-primary/30 backdrop-blur-xl border-2 border-primary/50 rounded-2xl shadow-2xl"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 20px rgba(0, 136, 255, 0.3)',
                          '0 0 40px rgba(0, 136, 255, 0.5)',
                          '0 0 20px rgba(0, 136, 255, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Camera className="w-5 h-5 text-white" />
                      <p className="text-sm font-black text-white tracking-wide">
                        AI VISION PROCESSING
                      </p>
                      <motion.div
                        className="w-2 h-2 bg-wellness-safe rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  {/* Status Indicator */}
                  <motion.div
                    className="absolute top-6 right-6 flex items-center gap-2 bg-background/90 backdrop-blur-xl px-4 py-2 rounded-full text-sm border-2 border-wellness-safe/50 shadow-lg"
                    animate={{ 
                      opacity: [1, 0.8, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0.4)',
                        '0 0 0 8px rgba(34, 197, 94, 0)',
                        '0 0 0 0 rgba(34, 197, 94, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.span
                      className="w-2.5 h-2.5 bg-wellness-safe rounded-full shadow-lg"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="font-black text-wellness-safe">LIVE FEED</span>
                  </motion.div>

                  {/* AI Detection Boxes Animation */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-24 border-3 border-primary rounded-xl shadow-lg"
                    style={{ borderWidth: '3px' }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.95, 1.05, 0.95],
                      borderColor: ['rgba(0, 136, 255, 0.6)', 'rgba(0, 170, 136, 0.6)', 'rgba(0, 136, 255, 0.6)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Additional detection box */}
                  <motion.div
                    className="absolute top-1/3 right-1/4 w-28 h-28 border-3 border-secondary rounded-xl shadow-lg"
                    style={{ borderWidth: '3px' }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                </div>

                {/* Video Stats */}
                <div className="grid grid-cols-3 border-t-2 border-border bg-gradient-to-r from-muted/50 to-muted/30">
                  {[
                    { label: "FPS", value: "30", icon: "📊", color: "text-primary" },
                    { label: "Resolution", value: "1080p", icon: "📹", color: "text-secondary" },
                    { label: "Confidence", value: "98.5%", icon: "✓", color: "text-wellness-safe" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-5 border-r-2 border-border last:border-r-0 hover:bg-primary/5 transition-all cursor-pointer"
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        backgroundColor: 'rgba(0, 136, 255, 0.05)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="text-xs text-foreground/60 mb-2 font-semibold flex items-center gap-1">
                        <span className="text-base">{stat.icon}</span> {stat.label}
                      </p>
                      <motion.p
                        className={`text-3xl font-black ${stat.color}`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        {stat.value}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Quick Stats */}
            <motion.div className="space-y-6" variants={containerVariants}>
              {/* System Health Monitor */}
              <motion.div
                className="bg-card border border-border rounded-2xl p-6"
                variants={itemVariants}
              >
                <SystemHealth />
              </motion.div>

              {/* Session Info */}
              <motion.div
                className="bg-card border border-border rounded-2xl p-6"
                variants={itemVariants}
              >
                <p className="text-sm text-foreground/70 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Session Duration
                </p>
                <motion.p
                  className="text-3xl font-bold text-primary mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  2h 45m
                </motion.p>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <span>⏱️ Started 2 hours ago</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Charts - 3 Column Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Drowsiness & Heart Rate Trend */}
            <motion.div
              className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="border-b border-border px-6 py-4 bg-muted/50">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Biometric Trends
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={drowsinessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="level"
                      fill="#0088ff"
                      stroke="#0088ff"
                      fillOpacity={0.2}
                      name="Drowsiness"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#ff6b6b"
                      strokeWidth={2}
                      name="Heart Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Vehicle Metrics */}
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="border-b border-border px-6 py-4 bg-muted/50">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Vehicle Control
                </h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vehicleMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="steeringVariance"
                      stroke="#ffa500"
                      strokeWidth={2}
                      name="Steering Var."
                    />
                    <Line
                      type="monotone"
                      dataKey="laneOffset"
                      stroke="#ff6b6b"
                      strokeWidth={2}
                      name="Lane Offset"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>

          {/* Stress-Drowsiness Correlation & Hourly Breakdown */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Correlation Scatter */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Stress-Drowsiness Correlation
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stress" name="Stress %" />
                  <YAxis dataKey="drowsiness" name="Drowsiness %" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Correlation"
                    data={correlationData}
                    fill="#0088ff"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Hourly Status */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Hourly Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="drowsy" stackId="a" fill="#ff6b6b" />
                  <Bar dataKey="stressed" stackId="a" fill="#ffa500" />
                  <Bar dataKey="normal" stackId="a" fill="#00aa88" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Performance Radar & Biometric Cards */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Performance Profile */}
            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              variants={itemVariants}
            >
              <h3 className="font-semibold text-foreground mb-4">
                Driver Performance Profile
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#0088ff"
                    fill="#0088ff"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Biometric Metrics Grid */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
            >
              {[
                {
                  icon: Heart,
                  label: "Heart Rate",
                  value: "72",
                  unit: "BPM",
                  status: "Normal",
                  detail: "Resting state",
                  color: "text-primary",
                },
                {
                  icon: Eye,
                  label: "Eye Closure",
                  value: "12",
                  unit: "%",
                  status: "Normal",
                  detail: "Healthy blink rate",
                  color: "text-secondary",
                },
                {
                  icon: Wind,
                  label: "Respiration",
                  value: "16",
                  unit: "BPM",
                  status: "Normal",
                  detail: "Steady breathing",
                  color: "text-primary",
                },
                {
                  icon: Activity,
                  label: "Movement",
                  value: "85",
                  unit: "%",
                  status: "Active",
                  detail: "Normal activity",
                  color: "text-secondary",
                },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-card to-muted/50 border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-xs font-semibold text-wellness-safe">
                        ✓ {metric.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-1">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {metric.value}
                      <span className="text-xs text-foreground/60 ml-1">
                        {metric.unit}
                      </span>
                    </p>
                    <p className="text-xs text-foreground/60">{metric.detail}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Safety Interventions and Wearable Integration */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Safety Interventions */}
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="border-b border-border px-6 py-4 bg-muted/50">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety Interventions
                </h3>
              </div>
              <div className="p-6">
                <SafetyInterventions />
              </div>
            </motion.div>

            {/* Wearable Integration */}
            <motion.div
              className="bg-card border border-border rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              <div className="border-b border-border px-6 py-4 bg-muted/50">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Wearable Devices
                </h3>
              </div>
              <div className="p-6">
                <WearableIntegration />
              </div>
            </motion.div>
          </motion.div>

          {/* Today's Summary */}
          <motion.div
            className="bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="border-b border-border px-6 py-4 bg-muted/50">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Database className="w-5 h-5" />
                Session Analytics Summary
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
              {[
                {
                  label: "Total Drive Time",
                  value: "4h 20m",
                  color: "text-primary",
                  icon: "⏱️",
                },
                {
                  label: "Avg Drowsiness",
                  value: "28%",
                  color: "text-primary",
                  icon: "😴",
                },
                {
                  label: "Peak Stress",
                  value: "52%",
                  color: "text-wellness-warning",
                  icon: "📊",
                },
                {
                  label: "AI Alerts",
                  value: "12",
                  color: "text-wellness-warning",
                  icon: "🔔",
                },
                {
                  label: "Interventions",
                  value: "3",
                  color: "text-secondary",
                  icon: "✓",
                },
                {
                  label: "Safety Score",
                  value: "8.7/10",
                  color: "text-wellness-safe",
                  icon: "🛡️",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-xs text-foreground/70 mb-2">
                    {stat.icon} {stat.label}
                  </p>
                  <motion.p
                    className={`text-lg font-bold ${stat.color}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                  >
                    {stat.value}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
