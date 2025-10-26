import { motion } from "framer-motion";
import { Smartphone, Watch, Heart, Activity, Bluetooth, BatteryCharging, Waves, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface WearableDevice {
  id: string;
  name: string;
  type: 'watch' | 'band' | 'ring';
  connected: boolean;
  battery: number;
  signalStrength: number;
}

interface BiometricReading {
  heartRate: number;
  hrv: number; // Heart rate variability
  spo2: number; // Blood oxygen
  temperature: number;
  steps: number;
  stressIndex: number;
}

export default function WearableIntegration() {
  const [devices] = useState<WearableDevice[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'watch',
      connected: true,
      battery: 78,
      signalStrength: 95,
    },
    {
      id: '2',
      name: 'Fitbit Charge 6',
      type: 'band',
      connected: false,
      battery: 45,
      signalStrength: 0,
    },
  ]);

  const [biometrics, setBiometrics] = useState<BiometricReading>({
    heartRate: 72,
    hrv: 45,
    spo2: 98,
    temperature: 36.7,
    steps: 4823,
    stressIndex: 35,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBiometrics(prev => ({
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 3)),
        hrv: Math.max(20, Math.min(80, prev.hrv + (Math.random() - 0.5) * 4)),
        spo2: Math.max(95, Math.min(100, prev.spo2 + (Math.random() - 0.5) * 0.5)),
        temperature: Math.max(36.0, Math.min(37.5, prev.temperature + (Math.random() - 0.5) * 0.1)),
        steps: prev.steps + Math.floor(Math.random() * 3),
        stressIndex: Math.max(0, Math.min(100, prev.stressIndex + (Math.random() - 0.5) * 2)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getDeviceIcon = (type: 'watch' | 'band' | 'ring') => {
    switch (type) {
      case 'watch': return Watch;
      case 'band': return Activity;
      case 'ring': return Waves;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-wellness-safe';
    if (level > 30) return 'text-wellness-warning';
    return 'text-wellness-alert';
  };

  const getStressColor = (stress: number) => {
    if (stress < 30) return 'text-wellness-safe';
    if (stress < 60) return 'text-wellness-warning';
    return 'text-wellness-alert';
  };

  return (
    <div className="space-y-6">
      {/* Connected Devices */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bluetooth className="w-5 h-5 text-primary" />
          Wearable Devices
        </h3>
        
        <div className="space-y-3">
          {devices.map((device) => {
            const DeviceIcon = getDeviceIcon(device.type);
            
            return (
              <motion.div
                key={device.id}
                className={`p-4 rounded-xl border transition-colors ${
                  device.connected
                    ? 'bg-primary/5 border-primary/30'
                    : 'bg-card border-border'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      device.connected ? 'bg-primary/20' : 'bg-foreground/5'
                    }`}
                    animate={device.connected ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <DeviceIcon className={`w-6 h-6 ${device.connected ? 'text-primary' : 'text-foreground/40'}`} />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {device.name}
                      </h4>
                      {device.connected && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle className="w-4 h-4 text-wellness-safe flex-shrink-0" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`flex items-center gap-1 ${getBatteryColor(device.battery)}`}>
                        <BatteryCharging className="w-3 h-3" />
                        {device.battery}%
                      </span>
                      {device.connected && (
                        <span className="flex items-center gap-1 text-foreground/60">
                          <Waves className="w-3 h-3" />
                          Signal: {device.signalStrength}%
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                      device.connected
                        ? 'bg-wellness-safe/10 text-wellness-safe hover:bg-wellness-safe/20'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {device.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Biometric Data */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-secondary" />
          Live Biometrics
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: 'Heart Rate',
              value: biometrics.heartRate.toFixed(0),
              unit: 'BPM',
              icon: Heart,
              color: 'text-wellness-alert',
              status: biometrics.heartRate < 80 ? 'Normal' : 'Elevated',
            },
            {
              label: 'HRV',
              value: biometrics.hrv.toFixed(0),
              unit: 'ms',
              icon: Activity,
              color: 'text-primary',
              status: biometrics.hrv > 35 ? 'Good' : 'Low',
            },
            {
              label: 'SpO₂',
              value: biometrics.spo2.toFixed(1),
              unit: '%',
              icon: Waves,
              color: 'text-secondary',
              status: biometrics.spo2 > 95 ? 'Normal' : 'Low',
            },
            {
              label: 'Stress',
              value: biometrics.stressIndex.toFixed(0),
              unit: '/100',
              icon: AlertCircle,
              color: getStressColor(biometrics.stressIndex),
              status: biometrics.stressIndex < 40 ? 'Low' : biometrics.stressIndex < 70 ? 'Moderate' : 'High',
            },
          ].map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <motion.div
                key={index}
                className="p-4 bg-gradient-to-br from-card to-muted/30 border border-border rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-xs font-medium text-foreground/70">
                    {metric.label}
                  </span>
                </div>
                
                <motion.div
                  className="mb-1"
                  key={metric.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-foreground/60 ml-1">
                    {metric.unit}
                  </span>
                </motion.div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/60">{metric.status}</span>
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      metric.status === 'Normal' || metric.status === 'Good' || metric.status === 'Low' 
                        ? 'bg-wellness-safe' 
                        : metric.status === 'Moderate' || metric.status === 'Elevated'
                        ? 'bg-wellness-warning'
                        : 'bg-wellness-alert'
                    }`}
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Activity Summary */}
      <motion.div
        className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Today's Activity
          </h4>
          <span className="text-xs text-foreground/60">Last updated: Now</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-foreground/70 mb-1">Steps</p>
            <motion.p
              className="text-lg font-bold text-primary"
              key={biometrics.steps}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
            >
              {biometrics.steps.toLocaleString()}
            </motion.p>
          </div>
          <div>
            <p className="text-xs text-foreground/70 mb-1">Calories</p>
            <p className="text-lg font-bold text-secondary">
              {Math.floor(biometrics.steps * 0.04)}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground/70 mb-1">Active Min</p>
            <p className="text-lg font-bold text-primary">
              {Math.floor(biometrics.steps / 100)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Data Sync Status */}
      <motion.div
        className="flex items-center justify-between p-3 bg-wellness-safe/10 border border-wellness-safe/30 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Waves className="w-4 h-4 text-wellness-safe" />
          </motion.div>
          <span className="text-xs font-medium text-wellness-safe">
            Syncing biometric data
          </span>
        </div>
        <span className="text-xs text-wellness-safe/70">Live</span>
      </motion.div>
    </div>
  );
}
