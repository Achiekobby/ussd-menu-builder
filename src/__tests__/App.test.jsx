import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the store
jest.mock('../store', () => ({
  __esModule: true,
  default: () => ({
    nodes: [],
    edges: [],
    onNodesChange: jest.fn(),
    onEdgesChange: jest.fn(),
    onConnect: jest.fn(),
    onSelectionChange: jest.fn(),
    setNodes: jest.fn(),
  }),
}));

// Mock ReactFlow components
jest.mock('reactflow', () => ({
  ReactFlow: ({ children, ...props }) => (
    <div data-testid="react-flow" {...props}>
      {children}
    </div>
  ),
  Background: ({ children }) => <div data-testid="background">{children}</div>,
  Controls: () => <div data-testid="controls" />,
  MiniMap: () => <div data-testid="minimap" />,
  Panel: ({ children, position }) => (
    <div data-testid={`panel-${position}`}>{children}</div>
  ),
  ReactFlowProvider: ({ children }) => <div>{children}</div>,
}));

// Mock components
jest.mock('../components/LandingPage', () => {
  return function MockLandingPage({ onGetStarted }) {
    return (
      <div data-testid="landing-page">
        <button onClick={onGetStarted}>Get Started</button>
      </div>
    );
  };
});

jest.mock('../components/AIAssistant', () => {
  return function MockAIAssistant() {
    return <div data-testid="ai-assistant">AI Assistant</div>;
  };
});

jest.mock('../components/WidgetBar', () => {
  return function MockWidgetBar() {
    return <div data-testid="widget-bar">Widget Bar</div>;
  };
});

jest.mock('../components/PropertiesBar', () => {
  return function MockPropertiesBar() {
    return <div data-testid="properties-bar">Properties Bar</div>;
  };
});

jest.mock('../components/AnalyticsPanel', () => {
  return function MockAnalyticsPanel() {
    return <div data-testid="analytics-panel">Analytics Panel</div>;
  };
});

jest.mock('../components/CollaborationPanel', () => {
  return function MockCollaborationPanel() {
    return <div data-testid="collaboration-panel">Collaboration Panel</div>;
  };
});

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders landing page initially', () => {
    render(<App />);
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  test('shows main app when get started is clicked', async () => {
    render(<App />);
    
    const getStartedButton = screen.getByText('Get Started');
    fireEvent.click(getStartedButton);

    await waitFor(() => {
      expect(screen.getByTestId('react-flow')).toBeInTheDocument();
    });
  });

  test('renders main flow builder after getting started', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      // Check for main flow builder components
      expect(screen.getByTestId('react-flow')).toBeInTheDocument();
      expect(screen.getByTestId('background')).toBeInTheDocument();
      expect(screen.getByTestId('controls')).toBeInTheDocument();
      expect(screen.getByTestId('minimap')).toBeInTheDocument();
    });
  });

  test('renders all panels in flow builder', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      expect(screen.getByTestId('panel-top-left')).toBeInTheDocument();
      expect(screen.getByTestId('panel-top-right')).toBeInTheDocument();
      expect(screen.getByTestId('panel-top-center')).toBeInTheDocument();
      expect(screen.getByTestId('panel-bottom-center')).toBeInTheDocument();
    });
  });

  test('renders action buttons in top center panel', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      expect(screen.getByText('Landing')).toBeInTheDocument();
      expect(screen.getByText('AI Optimize')).toBeInTheDocument();
      expect(screen.getByText('Share')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
      expect(screen.getByText('Undo')).toBeInTheDocument();
      expect(screen.getByText('Redo')).toBeInTheDocument();
    });
  });

  test('undo and redo buttons are disabled initially', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      const undoButton = screen.getByText('Undo').closest('button');
      const redoButton = screen.getByText('Redo').closest('button');
      
      expect(undoButton).toBeDisabled();
      expect(redoButton).toBeDisabled();
    });
  });

  test('can return to landing page', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      expect(screen.getByTestId('react-flow')).toBeInTheDocument();
    });

    // Click landing button
    fireEvent.click(screen.getByText('Landing'));

    await waitFor(() => {
      expect(screen.getByTestId('landing-page')).toBeInTheDocument();
    });
  });

  test('shows analytics data in bottom panel', async () => {
    render(<App />);
    
    // Get started
    fireEvent.click(screen.getByText('Get Started'));

    await waitFor(() => {
      expect(screen.getByText('0 Touchpoints')).toBeInTheDocument();
      expect(screen.getByText('0% Conversion')).toBeInTheDocument();
      expect(screen.getByText('0s Avg Time')).toBeInTheDocument();
      expect(screen.getByText('0 AI Optimizations')).toBeInTheDocument();
    });
  });
});

describe('App Integration Tests', () => {
  test('demo page has proper styling and content', () => {
    render(<App />);
    
    // Check for demo page content
    expect(screen.getByTestId('demo-page')).toBeInTheDocument();
    expect(screen.getByText('Start Demo')).toBeInTheDocument();
  });

  test('flow builder has proper layout', async () => {
    render(<App />);
    
    // Start demo
    fireEvent.click(screen.getByText('Start Demo'));

    await waitFor(() => {
      // Check for proper layout structure
      const reactFlow = screen.getByTestId('react-flow');
      expect(reactFlow).toBeInTheDocument();
      
      // Check for background
      expect(screen.getByTestId('background')).toBeInTheDocument();
      
      // Check for controls
      expect(screen.getByTestId('controls')).toBeInTheDocument();
      
      // Check for minimap
      expect(screen.getByTestId('minimap')).toBeInTheDocument();
    });
  });
});