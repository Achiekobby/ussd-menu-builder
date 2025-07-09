import { motion } from "framer-motion";
import { Users, MessageSquare, Share2, Clock } from "lucide-react";

const CollaborationPanel = () => {
  const collaborators = [
    { name: "Sarah Chen", role: "Product Manager", status: "online" },
    { name: "Marcus Rodriguez", role: "UX Designer", status: "online" },
    { name: "Emily Watson", role: "Marketing Lead", status: "away" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-success-600" />
        <h3 className="font-semibold text-secondary-900">Team Collaboration</h3>
      </div>
      
      <div className="space-y-3">
        {collaborators.map((collaborator, index) => (
          <div key={index} className="flex items-center gap-3 p-2 bg-secondary-50 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${
              collaborator.status === 'online' ? 'bg-success-500' : 'bg-warning-500'
            }`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-secondary-900">{collaborator.name}</div>
              <div className="text-xs text-secondary-600">{collaborator.role}</div>
            </div>
            <MessageSquare className="w-4 h-4 text-secondary-400" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <button className="w-full btn-secondary text-sm">
          <Share2 className="w-4 h-4 mr-2" />
          Invite Team Member
        </button>
      </div>
    </motion.div>
  );
};

export default CollaborationPanel; 