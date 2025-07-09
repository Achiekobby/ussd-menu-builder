import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, 
  Trash2, 
  Edit, 
  Copy as Duplicate,
  Lock,
  Unlock
} from "lucide-react";
import useStore from "../store";

const ContextMenu = memo(({ 
  isOpen, 
  position, 
  node, 
  onClose, 
  onEdit, 
  onDuplicate, 
  onDelete 
}) => {
  const { updateNodeData } = useStore();

  if (!isOpen || !node) return null;

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        onEdit?.(node);
        break;
      case 'duplicate':
        onDuplicate?.(node);
        break;
      case 'delete':
        onDelete?.(node);
        break;
      case 'lock':
        updateNodeData(node.id, { isLocked: !node.data.isLocked });
        break;
      case 'copy':
        navigator.clipboard.writeText(JSON.stringify(node, null, 2));
        break;
      default:
        break;
    }
    onClose();
  };

  const menuItems = [
    {
      id: 'edit',
      label: 'Edit Node',
      icon: Edit,
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: Duplicate,
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    {
      id: 'copy',
      label: 'Copy Data',
      icon: Copy,
      color: 'text-purple-600',
      bgColor: 'hover:bg-purple-50'
    },
    {
      id: 'lock',
      label: node.data.isLocked ? 'Unlock Node' : 'Lock Node',
      icon: node.data.isLocked ? Unlock : Lock,
      color: 'text-orange-600',
      bgColor: 'hover:bg-orange-50'
    },
    {
      id: 'delete',
      label: 'Delete Node',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 min-w-[200px]"
            style={{
              left: position.x,
              top: position.y
            }}
          >
            {/* Header */}
            <div className="px-4 py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                <span className="text-sm font-medium text-slate-700">
                  {node.data?.label || node.type}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {node.data?.description || 'Node actions'}
              </p>
            </div>
            
            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 ${item.bgColor}`}
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-slate-700">{item.label}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>ID: {node.id.slice(0, 8)}...</span>
                <span>{node.type}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ContextMenu.displayName = "ContextMenu";

export default ContextMenu; 