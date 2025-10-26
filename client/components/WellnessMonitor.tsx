import { motion } from "framer-motion";
import { Eye, Brain, Heart, Activity, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface WellnessData {
  drowsiness: number;
  stress: number;
  fatigue: number;
  heartRate: number;
  eyeBlink: number;
  focus: number;
}

export default function WellnessMonitor() {
  const [wellnessData, setWellnessData] = useState<WellnessData>({
    drowsiness: 28,
    stress: 35,
    fatigue: 22,
    heartRate: 75,
    eyeBlink: 18,
    focus: 82,
  });

  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    const interval = setInterval(() => {
      setWellnessData((prev) => {
        const drowsiness = Math.max(0, Math.min(100, prev.drowsiness + (Math.random() - 0.5) * 3));
        const stress = Math.max(0, Math.min(100, prev.stress + (Math.random() - 0.5) * 2.5));
        const fatigue = Math.max(0, Math.min(100, prev.fatigue + (Math.random() - 0.5) * 2));
        
        // Update trend
        const avgChange = (drowsiness - prev.drowsiness + stress - prev.stress + fatigue - prev.fatigue) / 3;
        setTrend(avgChange > 1 ? 'up' : avgChange < -1 ? 'down' : 'stable');

        return {
          drowsiness,
          stress,
          fatigue,
          heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 2)),
          eyeBlink: Math.max(5, Math.min(35, prev.eyeBlink + (Math.random() - 0.5) * 2)),
          focus: Math.max(50, Math.min(100, 100 - drowsiness * 0.6)),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusLevel = (value: number): 'safe' | 'warning' | 'critical' => {
    if (value < 30) return 'safe';
    if (value < 60) return 'warning';
    return 'critical';
  };

  const getStatusColor = (level: 'safe' | 'warning' | 'critical') => {
    switch (level) {
      case 'safe': return 'text-wellness-safe';
      case 'warning': return 'text-wellness-warning';
      case 'critical': return 'text-wellness-alert';
    }
  };

  const getStatusBg = (level: 'safe' | 'warning' | 'critical') => {
    switch (level) {
      case 'safe': return 'bg-wellness-safe/10 border-wellness-safe/20';
      case 'warning': return 'bg-wellness-warning/10 border-wellness-warning/20';
      case 'critical': return 'bg-wellness-alert/10 border-wellness-alert/20';
    }
  };

  const drowsinessStatus = getStatusLevel(wellnessData.drowsiness);
  const stressStatus = getStatusLevel(wellnessData.stress);
  const fatigueStatus = getStatusLevel(wellnessData.fatigue);

  const metrics = [
    {
      label: "Drowsiness",
      value: wellnessData.drowsiness,
      icon: Eye,
      status: drowsinessStatus,
      detail: `Eye blink: ${wellnessData.eyeBlink.toFixed(0)}%`,
    },
    {
      label: "Stress",
      value: wellnessData.stress,
      icon: Brain,
      status: stressStatus,
      detail: `HR: ${wellnessData.heartRate.toFixed(0)} BPM`,
    },
    {
      label: "Fatigue",
      value: wellnessData.fatigue,
      icon: Activity,
      status: fatigueStatus,
      detail: `Focus: ${wellnessData.focus.toFixed(0)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const statusColor = getStatusColor(metric.status);
        const statusBg = getStatusBg(metric.status);

        return (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-2xl border-2 ${statusBg} p-6 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-shadow`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.03, 
              y: -5,
              transition: { duration: 0.2, type: "spring", stiffness: 400 } 
            }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 60%)',
                  'radial-gradient(circle at 100% 100%, var(--secondary) 0%, transparent 60%)',
                  'radial-gradient(circle at 0% 100%, var(--primary) 0%, transparent 60%)',
                  'radial-gradient(circle at 100% 0%, var(--secondary) 0%, transparent 60%)',
                  'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 60%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${
                  metric.status === 'safe' ? 'rgba(34, 197, 94, 0.3)' :
                  metric.status === 'warning' ? 'rgba(251, 191, 36, 0.3)' :
                  'rgba(239, 68, 68, 0.3)'
                } 0%, transparent 50%)`,
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-xl ${
                        metric.status === 'safe' ? 'bg-wellness-safe/20' :
                        metric.status === 'warning' ? 'bg-wellness-warning/20' :
                        'bg-wellness-alert/20'
                      } flex items-center justify-center backdrop-blur-sm`}
                      animate={{ 
                        scale: metric.status === 'critical' ? [1, 1.1, 1] : 1,
                        boxShadow: metric.status === 'critical' ? [
                          '0 0 0 0 rgba(239, 68, 68, 0.4)',
                          '0 0 0 10px rgba(239, 68, 68, 0)',
                          '0 0 0 0 rgba(239, 68, 68, 0.4)',
                        ] : '0 0 0 0 rgba(0, 0, 0, 0)',
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className={`w-6 h-6 ${statusColor}`} />
                    </motion.div>
                    {/* Pulse ring for critical status */}
                    {metric.status === 'critical' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-wellness-alert"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [1, 0],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <h3 className="font-bold text-foreground text-lg">{metric.label}</h3>
                </div>
                
                {/* Status indicator */}
                <motion.div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                    metric.status === 'safe' ? 'bg-wellness-safe/20' :
                    metric.status === 'warning' ? 'bg-wellness-warning/20' :
                    'bg-wellness-alert/20'
                  } backdrop-blur-sm`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {metric.status === 'safe' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-wellness-safe" />
                      <span className="text-xs font-bold text-wellness-safe">SAFE</span>
                    </>
                  )}
                  {metric.status === 'warning' && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-wellness-warning" />
                      <span className="text-xs font-bold text-wellness-warning">CAUTION</span>
                    </>
                  )}
                  {metric.status === 'critical' && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-wellness-alert" />
                      <span className="text-xs font-bold text-wellness-alert">CRITICAL</span>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Value Display */}
              <div className="mb-4">
                <motion.div
                  className="flex items-baseline gap-2"
                  key={metric.value}
                  initial={{ scale: 1.3, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  <span className={`text-6xl font-black ${statusColor} tracking-tight`}>
                    {metric.value.toFixed(0)}
                  </span>
                  <span className="text-3xl text-foreground/40 font-light">%</span>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full bg-foreground/10 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                <motion.div
                  className={`absolute left-0 top-0 h-full rounded-full ${
                    metric.status === 'safe' ? 'bg-gradient-to-r from-wellness-safe to-wellness-safe/70' :
                    metric.status === 'warning' ? 'bg-gradient-to-r from-wellness-warning to-wellness-warning/70' :
                    'bg-gradient-to-r from-wellness-alert to-wellness-alert/70'
                  } shadow-lg`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, ease: "easeOut", type: "spring" }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-100%', '500%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                />
              </div>

              {/* Detail Info */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/70 font-medium">{metric.detail}</span>
                <motion.div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${
                    trend === 'up' ? 'bg-wellness-alert/10' :
                    trend === 'down' ? 'bg-wellness-safe/10' :
                    'bg-foreground/5'
                  }`}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {trend === 'up' && <TrendingUp className="w-3 h-3 text-wellness-alert" />}
                  {trend === 'down' && <TrendingDown className="w-3 h-3 text-wellness-safe" />}
                  <span className={`capitalize font-bold ${
                    metric.status === 'safe' ? 'text-wellness-safe' :
                    metric.status === 'warning' ? 'text-wellness-warning' :
                    'text-wellness-alert'
                  }`}>
                    {metric.status}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Corner accent with glow */}
            <motion.div
              className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full blur-2xl ${
                metric.status === 'safe' ? 'bg-wellness-safe/30' :
                metric.status === 'warning' ? 'bg-wellness-warning/30' :
                'bg-wellness-alert/30'
              }`}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
