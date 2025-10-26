import { motion } from "framer-motion";
import { Cpu, HardDrive, Wifi, Camera, Shield, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface SystemStatus {
  component: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  load: number;
  icon: any;
}

export default function SystemHealth() {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      component: 'AI Processing Unit',
      status: 'online',
      uptime: '99.8%',
      load: 67,
      icon: Cpu,
    },
    {
      component: 'Camera System',
      status: 'online',
      uptime: '100%',
      load: 45,
      icon: Camera,
    },
    {
      component: 'Network Connection',
      status: 'online',
      uptime: '98.2%',
      load: 32,
      icon: Wifi,
    },
    {
      component: 'Data Storage',
      status: 'warning',
      uptime: '100%',
      load: 88,
      icon: HardDrive,
    },
    {
      component: 'Security Layer',
      status: 'online',
      uptime: '100%',
      load: 28,
      icon: Shield,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(sys => ({
        ...sys,
        load: Math.max(0, Math.min(100, sys.load + (Math.random() - 0.5) * 5)),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-wellness-safe';
      case 'warning': return 'text-wellness-warning';
      case 'offline': return 'text-wellness-alert';
      default: return 'text-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'online': return 'bg-wellness-safe/10';
      case 'warning': return 'bg-wellness-warning/10';
      case 'offline': return 'bg-wellness-alert/10';
      default: return 'bg-muted';
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 50) return 'bg-wellness-safe';
    if (load < 80) return 'bg-wellness-warning';
    return 'bg-wellness-alert';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          System Health Monitor
        </h3>
        <motion.div
          className="flex items-center gap-2 px-3 py-1 bg-wellness-safe/10 rounded-full"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-2 h-2 bg-wellness-safe rounded-full"></span>
          <span className="text-xs font-medium text-wellness-safe">All Systems Operational</span>
        </motion.div>
      </div>

      <div className="space-y-3">
        {systems.map((system, index) => {
          const Icon = system.icon;
          
          return (
            <motion.div
              key={index}
              className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-10 h-10 rounded-lg ${getStatusBg(system.status)} flex items-center justify-center`}
                  animate={system.status === 'online' ? {
                    scale: [1, 1.05, 1],
                  } : system.status === 'warning' ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className={`w-5 h-5 ${getStatusColor(system.status)}`} />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">
                      {system.component}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-foreground/60">
                        Uptime: {system.uptime}
                      </span>
                      {system.status === 'online' && (
                        <CheckCircle className="w-4 h-4 text-wellness-safe" />
                      )}
                      {system.status === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-wellness-warning" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground/60">Load</span>
                      <span className={`font-medium ${getStatusColor(system.status)}`}>
                        {system.load.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className={`h-full ${getLoadColor(system.load)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${system.load}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* System Summary Stats */}
      <motion.div
        className="grid grid-cols-3 gap-3 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: 'Avg Load', value: '52%', color: 'text-wellness-safe' },
          { label: 'Response Time', value: '12ms', color: 'text-primary' },
          { label: 'Errors', value: '0', color: 'text-wellness-safe' },
        ].map((stat, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-foreground/60 mb-1">{stat.label}</p>
            <motion.p
              className={`text-lg font-bold ${stat.color}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            >
              {stat.value}
            </motion.p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
