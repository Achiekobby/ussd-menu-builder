// History management utilities for undo/redo functionality

class HistoryManager {
  constructor(maxHistory = 50) {
    this.history = [];
    this.currentIndex = -1;
    this.maxHistory = maxHistory;
  }

  // Save current state to history
  saveState(state) {
    // Remove any future history if we're not at the end
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Add new state
    this.history.push(JSON.parse(JSON.stringify(state)));
    this.currentIndex++;

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  // Undo to previous state
  undo() {
    if (this.canUndo()) {
      this.currentIndex--;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]));
    }
    return null;
  }

  // Redo to next state
  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]));
    }
    return null;
  }

  // Check if undo is possible
  canUndo() {
    return this.currentIndex > 0;
  }

  // Check if redo is possible
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }

  // Get current state
  getCurrentState() {
    if (this.currentIndex >= 0) {
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]));
    }
    return null;
  }

  // Clear history
  clear() {
    this.history = [];
    this.currentIndex = -1;
  }

  // Get history info
  getHistoryInfo() {
    return {
      totalStates: this.history.length,
      currentIndex: this.currentIndex,
      canUndo: this.canUndo(),
      canRedo: this.canRedo()
    };
  }
}

// Create a singleton instance
const historyManager = new HistoryManager();

export default historyManager;

// Utility functions for common operations
export const saveCurrentState = (nodes, edges) => {
  historyManager.saveState({ nodes, edges });
};

export const undo = () => {
  return historyManager.undo();
};

export const redo = () => {
  return historyManager.redo();
};

export const canUndo = () => {
  return historyManager.canUndo();
};

export const canRedo = () => {
  return historyManager.canRedo();
};

export const clearHistory = () => {
  historyManager.clear();
};

export const getHistoryInfo = () => {
  return historyManager.getHistoryInfo();
}; 