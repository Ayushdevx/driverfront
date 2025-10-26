import Layout from "@/components/Layout";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  Camera,
  Heart,
  AlertTriangle,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Users,
  Award,
  Smartphone,
  Cpu,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const safetyData = [
  { name: "Jan", accidents: 45, prevented: 12, incidents: 8 },
  { name: "Feb", accidents: 38, prevented: 18, incidents: 5 },
  { name: "Mar", accidents: 32, prevented: 25, incidents: 4 },
  { name: "Apr", accidents: 28, prevented: 32, incidents: 2 },
  { name: "May", accidents: 22, prevented: 38, incidents: 1 },
  { name: "Jun", accidents: 18, prevented: 42, incidents: 1 },
];

const detectionData = [
  { name: "Drowsiness", value: 42, color: "#0088ff" },
  { name: "Stress", value: 31, color: "#00aa88" },
  { name: "Fatigue", value: 18, color: "#ffa500" },
  { name: "Distraction", value: 9, color: "#ff6b6b" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground">
                  Keep Drivers
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Safe Every Journey
                  </span>
                </h1>
                <p className="text-xl text-foreground/70 max-w-lg">
                  AI-powered detection system that monitors driver wellness in real-time. Detect drowsiness, stress, and fatigue before they become dangerous.
                </p>
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/30 hover:shadow-2xl"
                >
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/5 transition-colors">
                  Learn More
                </button>
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-8 pt-4" variants={itemVariants}>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-bold text-primary">
                    <AnimatedCounter end={99.2} duration={2000} suffix="%" decimals={1} />
                  </p>
                  <p className="text-sm text-foreground/60 font-medium">Drowsiness Detection</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-bold text-secondary">
                    <AnimatedCounter end={24} duration={2000} suffix="/7" />
                  </p>
                  <p className="text-sm text-foreground/60 font-medium">Real-time Monitoring</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-bold text-primary">
                    <AnimatedCounter end={500} duration={2000} suffix="K+" />
                  </p>
                  <p className="text-sm text-foreground/60 font-medium">Drivers Protected</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Element with Real Image */}
            <motion.div
              className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/6028647/pexels-photo-6028647.jpeg"
                alt="Driver wellness"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="space-y-4 text-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="inline-block px-6 py-3 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-xl"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="text-lg font-semibold text-white">
                      AI-Powered Vision Detection
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Impact Chart */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Proven Safety Impact
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Real-world data showing accident reduction and prevention effectiveness
            </p>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={safetyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accidents"
                  stroke="#0088ff"
                  strokeWidth={3}
                  dot={{ fill: "#0088ff", r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Accidents"
                />
                <Line
                  type="monotone"
                  dataKey="prevented"
                  stroke="#00aa88"
                  strokeWidth={3}
                  dot={{ fill: "#00aa88", r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Prevented"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Monitoring
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Our multi-modal system uses cabin video, steering behavior analysis, and optional wearable integration for accurate wellness detection.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Feature 1 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <Camera className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Cabin Video Analysis
              </h3>
              <p className="text-foreground/70">
                Advanced AI vision detects facial features, eye closure patterns, and head position to identify drowsiness in real-time.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <Zap className="w-6 h-6 text-secondary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Steering Behavior
              </h3>
              <p className="text-foreground/70">
                Monitor steering input patterns, lane drift, and vehicle control metrics to detect impaired driving behavior.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <Heart className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Wearable Integration
              </h3>
              <p className="text-foreground/70">
                Optional smartwatch and biometric data provide heart rate, stress levels, and fatigue markers for enhanced accuracy.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <AlertTriangle className="w-6 h-6 text-secondary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Smart Interventions
              </h3>
              <p className="text-foreground/70">
                Receive non-distracting alerts and suggestions: rest breaks, route recommendations, or automated assistance.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <Shield className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Privacy First
              </h3>
              <p className="text-foreground/70">
                On-device processing and encryption ensure driver data stays secure and private at all times.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              className="group p-8 rounded-2xl border border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <TrendingUp className="w-6 h-6 text-secondary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-foreground/70">
                Comprehensive insights into driver wellness trends, patterns, and recommendations for safer driving habits.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Detection Breakdown Chart */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Detection Breakdown
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Distribution of wellness issues detected by our system
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-card border border-border rounded-2xl p-8"
              variants={itemVariants}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={detectionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {detectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
            >
              {detectionData.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  variants={itemVariants}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                  <p className="font-bold text-foreground">{item.value}%</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              A seamless integration of AI and vehicle sensors for continuous wellness monitoring.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Step 1 */}
            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0"
                whileHover={{ scale: 1.1 }}
              >
                1
              </motion.div>
              <h3 className="font-semibold text-center md:text-left mb-2">
                Capture Data
              </h3>
              <p className="text-sm text-foreground/70 text-center md:text-left">
                Multi-sensor collection from cabin video, vehicle systems, and optional wearables.
              </p>
              {/* Connector */}
              <div className="hidden md:block absolute top-6 left-14 w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            {/* Step 2 */}
            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0"
                whileHover={{ scale: 1.1 }}
              >
                2
              </motion.div>
              <h3 className="font-semibold text-center md:text-left mb-2">
                AI Analysis
              </h3>
              <p className="text-sm text-foreground/70 text-center md:text-left">
                Advanced machine learning models analyze patterns for drowsiness and stress indicators.
              </p>
              {/* Connector */}
              <div className="hidden md:block absolute top-6 left-14 w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            {/* Step 3 */}
            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0"
                whileHover={{ scale: 1.1 }}
              >
                3
              </motion.div>
              <h3 className="font-semibold text-center md:text-left mb-2">
                Detect Issues
              </h3>
              <p className="text-sm text-foreground/70 text-center md:text-left">
                Identify wellness threats in real-time before they become safety risks.
              </p>
              {/* Connector */}
              <div className="hidden md:block absolute top-6 left-14 w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </motion.div>

            {/* Step 4 */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="bg-secondary text-secondary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0"
                whileHover={{ scale: 1.1 }}
              >
                4
              </motion.div>
              <h3 className="font-semibold text-center md:text-left mb-2">
                Intervene Safely
              </h3>
              <p className="text-sm text-foreground/70 text-center md:text-left">
                Smart, non-distracting interventions suggest rest breaks or assistance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-16 text-primary-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter end={42} duration={2000} suffix="%" />
                </p>
                <p className="text-lg opacity-90">
                  Reduction in drowsy driving accidents
                </p>
              </motion.div>
              <motion.div
                className="text-center border-t md:border-t-0 md:border-l border-primary-foreground/30 pt-8 md:pt-0 md:pl-8"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter end={500} duration={2000} suffix="K+" />
                </p>
                <p className="text-lg opacity-90">
                  Drivers protected globally
                </p>
              </motion.div>
              <motion.div
                className="text-center border-t md:border-t-0 md:border-l border-primary-foreground/30 pt-8 md:pt-0 md:pl-8"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter end={24} duration={2000} suffix="/7" />
                </p>
                <p className="text-lg opacity-90">
                  Continuous monitoring and alerts
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real-World Case Study */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Real-World Impact
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              See how DriverWell has helped fleets reduce accidents and save lives
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-primary/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Case Study Image */}
              <motion.div
                className="relative h-96 md:h-full min-h-96 overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg"
                  alt="Analytics dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
              </motion.div>

              {/* Case Study Content */}
              <motion.div
                className="p-8 md:p-12 flex flex-col justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">
                  <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                    Case Study
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  TransportCo Fleet Success
                </h3>
                <p className="text-foreground/70 mb-6">
                  A regional logistics company with 500 drivers implemented DriverWell across their fleet. Within 6 months, they saw a 45% reduction in drowsy-related incidents.
                </p>

                <div className="space-y-4 mb-8">
                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/20">
                        <span className="text-primary font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        45% reduction in accidents
                      </p>
                      <p className="text-sm text-foreground/60">
                        Within first 6 months of deployment
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-secondary/20">
                        <span className="text-secondary font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        $250K insurance savings
                      </p>
                      <p className="text-sm text-foreground/60">
                        Reduced claim frequency and severity
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/20">
                        <span className="text-primary font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Zero fatalities in 12 months
                      </p>
                      <p className="text-sm text-foreground/60">
                        Safety record improvement across all routes
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Hear from companies that have transformed their driver safety programs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Fleet Manager, TransportCo",
                text: "DriverWell reduced our accident rate by 45% in just 6 months. The real-time alerts have been a game changer for our operations.",
              },
              {
                name: "Michael Chen",
                role: "Safety Director, LogisticsPro",
                text: "The system's accuracy in detecting fatigue is incredible. We've prevented multiple potential accidents before they happened.",
              },
              {
                name: "Emma Rodriguez",
                role: "Operations Lead, Express Delivery",
                text: "Easy to implement, non-intrusive, and genuinely improves driver safety. Our team loves how it helps them stay alert.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-2xl p-8"
                variants={itemVariants}
                whileHover={{ translateY: -5 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-foreground/70 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
            >
              Why Choose DriverWell?
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                {
                  icon: Award,
                  title: "Proven Effectiveness",
                  description: "Backed by peer-reviewed research and field-tested with fleet operators worldwide.",
                },
                {
                  icon: Smartphone,
                  title: "Easy Integration",
                  description: "Works with existing vehicle systems and seamlessly integrates into fleet management platforms.",
                },
                {
                  icon: Cpu,
                  title: "Minimal Disruption",
                  description: "Non-intrusive monitoring system doesn't distract drivers or interfere with their focus.",
                },
                {
                  icon: TrendingUp,
                  title: "Cost Savings",
                  description: "Reduce accidents, insurance claims, and operational costs while protecting lives.",
                },
                {
                  icon: Lock,
                  title: "Privacy Focused",
                  description: "Advanced encryption and on-device processing keep driver data completely secure.",
                },
                {
                  icon: Users,
                  title: "24/7 Support",
                  description: "Dedicated support team available around the clock to assist with monitoring and incidents.",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-foreground/70">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-16 text-center border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Protect Your Drivers?
            </motion.h2>
            <motion.p
              className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Start monitoring driver wellness today. Get real-time insights and reduce accident risk.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition-colors shadow-lg"
              >
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground/10 transition-colors">
                Schedule Demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
