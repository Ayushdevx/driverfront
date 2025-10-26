import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Music, Phone, MapPin, Volume2, Wind, AlertCircle, CheckCircle2, Clock, Navigation } from "lucide-react";
import { useState, useEffect } from "react";

interface Intervention {
  id: number;
  type: 'break' | 'audio' | 'alert' | 'navigation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: any;
  action: string;
  activated?: boolean;
}

export default function SafetyInterventions() {
  const [activeInterventions, setActiveInterventions] = useState<Intervention[]>([
    {
      id: 1,
      type: 'break',
      title: 'Rest Break Recommended',
      description: 'You\'ve been driving for 2h 45m. Fatigue levels increasing.',
      priority: 'high',
      icon: Coffee,
      action: 'Find Rest Stop',
    },
    {
      id: 2,
      type: 'audio',
      title: 'Stress Relief Audio',
      description: 'Elevated stress detected. Play calming soundscape.',
      priority: 'medium',
      icon: Music,
      action: 'Play Audio',
    },
    {
      id: 3,
      type: 'navigation',
      title: 'Nearest Safe Location',
      description: 'Rest area available in 2.3 miles ahead.',
      priority: 'medium',
      icon: MapPin,
      action: 'Navigate',
    },
  ]);

  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    // Simulate new interventions appearing
    const interval = setInterval(() => {
      const shouldAddIntervention = Math.random() > 0.85;
      
      if (shouldAddIntervention && activeInterventions.length < 5) {
        const newInterventions: Intervention[] = [
          {
            id: Date.now(),
            type: 'alert',
            title: 'Drowsiness Alert',
            description: 'Eye closure pattern detected. Consider stopping.',
            priority: 'high',
            icon: AlertCircle,
            action: 'Acknowledge',
          },
          {
            id: Date.now() + 1,
            type: 'audio',
            title: 'Alertness Boost',
            description: 'Play energizing audio to increase alertness.',
            priority: 'low',
            icon: Volume2,
            action: 'Activate',
          },
        ];

        const randomIntervention = newInterventions[Math.floor(Math.random() * newInterventions.length)];
        setActiveInterventions(prev => [randomIntervention, ...prev].slice(0, 5));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeInterventions.length]);

  const handleActivate = (id: number) => {
    setActiveInterventions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, activated: true } : item
      )
    );

    // Remove after animation
    setTimeout(() => {
      setActiveInterventions(prev => prev.filter(item => item.id !== id));
    }, 1000);
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-wellness-alert/30 bg-wellness-alert/5';
      case 'medium': return 'border-wellness-warning/30 bg-wellness-warning/5';
      case 'low': return 'border-primary/30 bg-primary/5';
    }
  };

  const getIconColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-wellness-alert';
      case 'medium': return 'text-wellness-warning';
      case 'low': return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Mode Toggle */}
      <motion.div
        className={`p-6 rounded-2xl border-2 transition-all shadow-lg ${
          emergencyMode
            ? 'bg-gradient-to-br from-wellness-alert/20 to-wellness-alert/10 border-wellness-alert shadow-wellness-alert/30'
            : 'bg-gradient-to-br from-card to-muted/30 border-border'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01, y: -2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                emergencyMode ? 'bg-wellness-alert/20' : 'bg-foreground/5'
              }`}
              animate={emergencyMode ? {
                scale: [1, 1.15, 1],
                rotate: [0, 10, -10, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: emergencyMode ? Infinity : 0 }}
            >
              <AlertCircle className={`w-7 h-7 ${emergencyMode ? 'text-wellness-alert' : 'text-foreground/50'}`} />
            </motion.div>
            <div>
              <h3 className="font-bold text-foreground text-lg mb-1">Emergency Mode</h3>
              <p className="text-xs text-foreground/60 font-medium">Immediate assistance & critical alerts</p>
            </div>
          </div>
          
          <button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              emergencyMode ? 'bg-wellness-alert' : 'bg-foreground/20'
            }`}
          >
            <motion.span
              className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
              animate={{ x: emergencyMode ? 30 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <AnimatePresence>
          {emergencyMode && (
            <motion.div
              className="mt-4 p-4 bg-wellness-alert/10 rounded-lg border border-wellness-alert/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 px-4 py-3 bg-wellness-alert text-white rounded-lg hover:bg-wellness-alert/90 transition-colors font-medium">
                  <Phone className="w-4 h-4" />
                  Call Support
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium">
                  <MapPin className="w-4 h-4" />
                  Emergency Stop
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Active Interventions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Active Interventions
          </h3>
          <span className="text-xs text-foreground/60 bg-muted px-3 py-1 rounded-full">
            {activeInterventions.length} active
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {activeInterventions.length === 0 ? (
            <motion.div
              className="p-8 text-center bg-card border border-border rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 className="w-12 h-12 text-wellness-safe mx-auto mb-2" />
              <p className="font-medium text-foreground">All Clear</p>
              <p className="text-sm text-foreground/60">No interventions needed</p>
            </motion.div>
          ) : (
            activeInterventions.map((intervention) => {
              const Icon = intervention.icon;
              
              return (
                <motion.div
                  key={intervention.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ 
                    opacity: intervention.activated ? 0 : 1,
                    x: intervention.activated ? 100 : 0,
                    scale: intervention.activated ? 0.8 : 1,
                  }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl border ${getPriorityColor(intervention.priority)} backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${getIconColor(intervention.priority)}`}
                      animate={{
                        scale: intervention.priority === 'high' ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        repeat: intervention.priority === 'high' ? Infinity : 0,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground text-sm">
                          {intervention.title}
                        </h4>
                        {intervention.priority === 'high' && (
                          <motion.span
                            className="text-xs font-bold text-wellness-alert uppercase"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Urgent
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/70 mb-3">
                        {intervention.description}
                      </p>
                      
                      <button
                        onClick={() => handleActivate(intervention.id)}
                        disabled={intervention.activated}
                        className={`text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                          intervention.activated
                            ? 'bg-wellness-safe text-white'
                            : `${getIconColor(intervention.priority)} bg-background/80 hover:bg-background`
                        }`}
                      >
                        {intervention.activated ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Activated
                          </span>
                        ) : (
                          intervention.action
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { icon: Coffee, label: 'Break', color: 'text-primary' },
          { icon: Navigation, label: 'Navigate', color: 'text-secondary' },
          { icon: Phone, label: 'Call', color: 'text-wellness-warning' },
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-5 h-5 ${action.color} mx-auto mb-2`} />
              <p className="text-xs font-medium text-foreground">{action.label}</p>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
