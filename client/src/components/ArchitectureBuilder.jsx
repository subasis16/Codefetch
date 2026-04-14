import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  Panel,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { FiServer, FiDatabase, FiCloud, FiMonitor, FiCpu, FiLayers, FiTrash2 } from 'react-icons/fi';

export const nodeConfig = [
  { type: 'Client', icon: <FiMonitor size={18} />, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { type: 'Gateway', icon: <FiCloud size={18} />, bg: 'bg-purple-500/10', color: 'text-purple-400' },
  { type: 'Service', icon: <FiServer size={18} />, bg: 'bg-green-500/10', color: 'text-green-400' },
  { type: 'Database', icon: <FiDatabase size={18} />, bg: 'bg-yellow-500/10', color: 'text-yellow-400' },
  { type: 'Queue', icon: <FiLayers size={18} />, bg: 'bg-orange-500/10', color: 'text-orange-400' },
  { type: 'Lambda', icon: <FiCpu size={18} />, bg: 'bg-pink-500/10', color: 'text-pink-400' },
];

// Custom Node Definition for Sleek Minimalism
const CustomNode = ({ data, isConnectable }) => {
  return (
    <div className="relative group px-4 py-2.5 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] min-w-[140px] hover:border-white/30 hover:bg-[#111]/90 transition-all font-sans cursor-grab active:cursor-grabbing flex items-center gap-3">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-1.5 h-1.5 bg-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className={`flex items-center justify-center opacity-80 ${data.color}`}>
        {nodeConfig.find(c => c.type === data.type)?.icon || data.icon}
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-[10px] font-bold tracking-wide text-white/90 leading-none mb-0.5">
          {data.label}
        </div>
        <div className="text-[7px] uppercase tracking-widest text-white/40 font-medium">
          {data.type}
        </div>
      </div>
      <button 
        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all drop-shadow-lg scale-75"
        onClick={data.onDelete}
      >
        <FiTrash2 size={10} />
      </button>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-1.5 h-1.5 bg-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const defaultNodes = [
  { id: '1', type: 'custom', position: { x: 250, y: 50 }, data: { label: 'Web Client', type: 'Client', bg: 'bg-blue-500/10', color: 'text-blue-400' } },
  { id: '2', type: 'custom', position: { x: 250, y: 200 }, data: { label: 'NGINX Load Balancer', type: 'Gateway', bg: 'bg-purple-500/10', color: 'text-purple-400' } },
  { id: '3', type: 'custom', position: { x: 100, y: 350 }, data: { label: 'Auth Service', type: 'Service', bg: 'bg-green-500/10', color: 'text-green-400' } },
  { id: '4', type: 'custom', position: { x: 400, y: 350 }, data: { label: 'User Data', type: 'Database', bg: 'bg-yellow-500/10', color: 'text-yellow-400' } },
];

const defaultEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } },
];

let idCounter = 5;
const getId = () => `${idCounter++}`;

const BuilderFlow = ({ initialNodesProp, initialEdgesProp, minimal }) => {
  const [nodes, setNodes] = useState(initialNodesProp || defaultNodes);
  const [edges, setEdges] = useState(initialEdgesProp || defaultEdges);
  const reactFlowWrapper = useRef(null);

  // Sync state if props change (for dynamic switching between items)
  useEffect(() => {
    if (initialNodesProp) setNodes(initialNodesProp);
    if (initialEdgesProp) setEdges(initialEdgesProp);
  }, [initialNodesProp, initialEdgesProp]);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 } }, eds));
  }, []);

  const deleteNode = useCallback((idToDelete) => {
    setNodes((nds) => nds.filter((node) => node.id !== idToDelete));
    setEdges((eds) => eds.filter((edge) => edge.source !== idToDelete && edge.target !== idToDelete));
  }, []);

  const nodesWithCallbacks = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      onDelete: () => deleteNode(node.id)
    }
  })).concat([
    // Invisible dummy node to shift fitView center to the right away from the left overlay
    { 
      id: 'dummy-offset-left', 
      type: 'default', 
      position: { x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : -300, y: 0 }, 
      data: { label: '' }, 
      style: { opacity: 0, pointerEvents: 'none', width: 1, height: 1 } 
    }
  ]);

  const onDragStart = (event, nodeTypeConfig) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeTypeConfig));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const typeConfigString = event.dataTransfer.getData('application/reactflow');
      if (!typeConfigString) return;

      const typeConfig = JSON.parse(typeConfigString);
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      const position = {
        x: event.clientX - reactFlowBounds.left - 90, 
        y: event.clientY - reactFlowBounds.top - 30,
      };

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: `New ${typeConfig.type}`,
          type: typeConfig.type,
          bg: typeConfig.bg,
          color: typeConfig.color
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    []
  );

  return (
    <div className={`${minimal ? 'h-[400px] bg-transparent border-0' : 'h-[700px] lg:h-[800px] bg-[#050505] lg:shadow-2xl'} w-full overflow-hidden relative flex`}>
      
      {/* Main Flow Canvas - Now takes full area without sidebar */}
      <div className="flex-1 h-full relative" ref={reactFlowWrapper} onDrop={onDrop} onDragOver={onDragOver}>
        {minimal && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/40 border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30 backdrop-blur-md">
            Interactive Architecture
          </div>
        )}
        <ReactFlow
          nodes={nodesWithCallbacks}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1, maxZoom: 1.1 }}
          minZoom={0.4}
          maxZoom={1.2}
          zoomOnScroll={!minimal}
          zoomOnPinch={!minimal}
          zoomOnDoubleClick={!minimal}
          nodesDraggable={true}
          panOnDrag={!minimal}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }} 
        >
          <Background color="#fff" gap={24} size={minimal ? 0.5 : 1} opacity={minimal ? 0.03 : 0.05} />
        </ReactFlow>
      </div>

    </div>
  );
};

export default function ArchitectureBuilder({ initialNodesProp, initialEdgesProp, minimal = false }) {
  return (
    <ReactFlowProvider>
      <BuilderFlow initialNodesProp={initialNodesProp} initialEdgesProp={initialEdgesProp} minimal={minimal} />
    </ReactFlowProvider>
  );
}
