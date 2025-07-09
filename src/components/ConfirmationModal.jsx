import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning" // warning, danger, info
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: AlertTriangle,
          iconColor: "text-error-600",
          bgColor: "bg-error-50",
          borderColor: "border-error-200",
          buttonColor: "bg-error-600 hover:bg-error-700"
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-warning-600",
          bgColor: "bg-warning-50",
          borderColor: "border-warning-200",
          buttonColor: "bg-warning-600 hover:bg-warning-700"
        };
      default:
        return {
          icon: AlertTriangle,
          iconColor: "text-primary-600",
          bgColor: "bg-primary-50",
          borderColor: "border-primary-200",
          buttonColor: "bg-primary-600 hover:bg-primary-700"
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-strong border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 ${styles.bgColor} border-b ${styles.borderColor}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${styles.bgColor} rounded-xl flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-white/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-secondary-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-secondary-700 leading-relaxed mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-secondary-700 bg-secondary-100 hover:bg-secondary-200 rounded-lg font-medium transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 px-4 py-2 text-white ${styles.buttonColor} rounded-lg font-medium transition-colors`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal; 