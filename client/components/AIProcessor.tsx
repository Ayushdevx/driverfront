import { motion } from "framer-motion";
import { Cpu, Activity, Zap } from "lucide-react";

interface AIProcessorProps {
  isProcessing?: boolean;
  accuracy?: number;
}

export default function AIProcessor({ isProcessing = true, accuracy = 98 }: AIProcessorProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cpu className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-foreground">AI Processing Engine</h3>
            <p className="text-xs text-foreground/60">Real-time inference</p>
          </div>
        </div>
        {isProcessing && (
          <motion.div
            className="flex items-center gap-1"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-2 h-2 bg-wellness-safe rounded-full"></span>
            <span className="text-xs font-medium text-wellness-safe">Active</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {/* Processing Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Models", value: "7", icon: Zap },
            { label: "Threads", value: "16", icon: Activity },
            { label: "Latency", value: "45ms", icon: Cpu },
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-3 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-xs text-foreground/70">{metric.label}</p>
                <p className="text-sm font-bold text-primary">{metric.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Inference Accuracy */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Inference Accuracy</p>
            <motion.p
              className="text-sm font-bold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {accuracy}%
            </motion.p>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: `${accuracy}%` }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="flex gap-2 text-xs text-foreground/70">
          <motion.span
            className="inline-block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⚙️ Processing...
          </motion.span>
          <span>|</span>
          <span>✓ All systems nominal</span>
        </div>
      </div>
    </motion.div>
  );
}
