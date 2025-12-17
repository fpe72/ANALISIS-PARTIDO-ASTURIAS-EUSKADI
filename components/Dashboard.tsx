import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  BarChart2, 
  Shield, 
  Users, 
  Share2, 
  Map,
  User,
  Copy,
  Check,
  X,
  Link as LinkIcon,
  ExternalLink,
  Eye
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { MOCK_MATCH_DATA } from '../constants';
import { PlayerStats } from '../types';
import { analysisContent } from '../content/analysis';


// --- Helper Components ---

const StatCard = ({ label, value, subtext, icon: Icon, color = "emerald" }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start space-x-4 hover:border-slate-700 transition-all">
    <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-white flex items-center">
      <div className="w-1 h-6 bg-emerald-500 mr-3 rounded-full"></div>
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-sm ml-4 mt-1">{subtitle}</p>}
  </div>
);

const ProgressBar = ({ value, max = 100, label, color = "bg-emerald-500" }: any) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-white font-mono">{value}</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- Sub-views ---

const MatchOverview = ({ data }: { data: typeof MOCK_MATCH_DATA }) => {
  return (
    <div className="space-y-6">
      {/* Scoreboard */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500"></div>
        
        <div className="text-center md:text-left z-10">
          <h1 className="text-3xl font-black text-white tracking-tight">ASTURIAS</h1>
          <p className="text-emerald-400 font-semibold">LOCAL</p>
        </div>
        
        <div className="flex flex-col items-center mx-8 my-4 md:my-0 z-10">
          <div className="text-5xl font-mono font-bold text-white tracking-widest bg-slate-950 px-6 py-2 rounded-lg border border-slate-800 shadow-inner">
            {data.meta.score}
          </div>
          <div className="mt-2 text-slate-400 text-sm font-medium flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
            FULL TIME • {data.meta.duration}
          </div>
        </div>

        <div className="text-center md:text-right z-10">
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">{data.meta.opponent}</h1>
          <p className="text-slate-500 font-semibold">VISITANTE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collective Stats */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-2">
          <SectionHeader title="Estadísticas Colectivas" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Posesión y Pase</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Asturias</span>
                  <span>{data.stats.possession[0]}%</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-slate-800">
                  <div className="bg-emerald-500" style={{ width: `${data.stats.possession[0]}%` }}></div>
                  <div className="bg-blue-500" style={{ width: `${data.stats.possession[1]}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-slate-300 text-right">
                  <span>{data.stats.possession[1]}%</span>
                  <span>Rival</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950 p-3 rounded-lg text-center">
                   <p className="text-xs text-slate-400">Pases Totales</p>
                   <p className="text-xl font-bold text-emerald-400">{data.stats.passes[0]}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg text-center">
                   <p className="text-xs text-slate-400">Precisión</p>
                   <p className="text-xl font-bold text-emerald-400">78%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Ataque y Defensa</h3>
              <ProgressBar value={data.stats.shots[0]} max={20} label="Tiros Totales" />
              <ProgressBar value={data.stats.shotsOnTarget[0]} max={10} label="Tiros a Puerta" color="bg-blue-500" />
              <ProgressBar value={data.stats.duelsWonPercentage[0]} max={100} label="% Duelos Ganados" color="bg-yellow-500" />
              <ProgressBar value={data.stats.corners[0]} max={10} label="Saques de Esquina" color="bg-purple-500" />
            </div>
          </div>
        </div>

        {/* Team DNA / Analysis */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
           <SectionHeader title="ADN del Partido" />
           <div className="space-y-4 text-sm">
              <div className="p-3 bg-slate-950 rounded-lg border-l-2 border-emerald-500">
                <p className="text-slate-400 text-xs uppercase mb-1">Estilo de Juego</p>
                <p className="text-slate-200">{analysisContent.teamDNA.style}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border-l-2 border-blue-500">
                <p className="text-slate-400 text-xs uppercase mb-1">Organización Defensiva</p>
                <p className="text-slate-200">{analysisContent.teamDNA.defense}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase mb-2">Puntos Fuertes</p>
                <div className="flex flex-wrap gap-2">
                  {analysisContent.teamDNA.strengths.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase mb-2">Debilidades Clave</p>
                <div className="flex flex-col gap-2">
                  {analysisContent.teamDNA.weaknesses.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-xs border border-red-500/20">{s}</span>
                  ))}
                </div>
              </div>
           </div>
        </div>
      </div>
      
         {/* Event Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <SectionHeader title="Línea de Tiempo" />
            <div className="relative mt-8 pb-4">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2"></div>
              <div className="flex justify-between items-center relative z-10 px-4">
                {data.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center group cursor-pointer"
                    style={{ marginLeft: `${(event.minute / 95) * 10}%` }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform transform group-hover:scale-125
                        ${event.team === 'home'
                          ? 'bg-emerald-500 border-emerald-300 text-white'
                          : 'bg-slate-700 border-slate-500 text-slate-300'}
                      `}
                    >
                      {event.minute}'
                    </div>
    
                    <div className="absolute top-10 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 p-2 rounded text-xs border border-slate-700 pointer-events-none z-20">
                      <p className="font-bold text-white uppercase">{event.type}</p>
                      <p className="text-slate-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

      {/* Texto de Análisis (anchors por sección) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <SectionHeader title="Análisis (texto)" subtitle="Secciones editables con anclas" />
        <div className="space-y-6">
          {analysisContent.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h3 className="text-lg font-bold text-white mb-2">{section.heading}</h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
   
const HeatmapVisual = ({ data }: { data: number[][] }) => {
  const maxVal = Math.max(...data.flat());
  
  return (
    <div className="relative w-full aspect-[2/3] bg-emerald-900/20 border-2 border-slate-700 rounded-lg overflow-hidden flex flex-col">
      {/* Pitch markings overlay */}
      <div className="absolute inset-0 pointer-events-none border border-white/10 m-4 rounded-sm"></div>
      <div className="absolute top-1/2 w-full h-[1px] bg-white/10"></div>
      <div className="absolute left-1/2 h-full w-[1px] bg-white/10"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      {data.map((row, rIdx) => (
        <div key={rIdx} className="flex-1 flex">
          {row.map((val, cIdx) => {
            const intensity = val / (maxVal || 1);
            return (
              <div 
                key={`${rIdx}-${cIdx}`} 
                className="flex-1 transition-all duration-500"
                style={{ 
                  backgroundColor: `rgba(16, 185, 129, ${intensity * 0.8})`,
                  opacity: intensity > 0 ? 1 : 0
                }}
              />
            );
          })}
        </div>
      ))}
      <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-[10px] text-white">Ataque &uarr;</div>
    </div>
  );
};

const PlayerAnalysis = ({ player }: { player: PlayerStats }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Column 1: Profile & Key Metrics */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <User size={120} />
          </div>
          <div className="relative z-10">
             <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-emerald-500 shadow-lg shadow-emerald-500/20">
                <span className="text-3xl font-bold text-white">{player.number}</span>
             </div>
             <h2 className="text-2xl font-bold text-white">{player.name}</h2>
             <p className="text-emerald-400 font-medium">{player.position}</p>
             <div className="mt-4 flex justify-center space-x-4 text-sm">
                <div className="bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  <span className="text-slate-400">Min:</span> <span className="text-white font-mono">{player.minutesPlayed}'</span>
                </div>
                <div className="bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  <span className="text-slate-400">Rating:</span> <span className="text-emerald-400 font-bold">{player.rating}</span>
                </div>
             </div>
          </div>
        </div>

        <StatCard 
          label="Pases Completados" 
          value={`${player.passes.successful}/${player.passes.total}`}
          subtext={`${Math.round((player.passes.successful/player.passes.total)*100)}% Efectividad`}
          icon={Activity}
          color="blue"
        />
        <StatCard 
          label="Recuperaciones" 
          value={player.defensive.recoveries}
          subtext="Balones recuperados"
          icon={Shield}
          color="emerald"
        />
         <StatCard 
          label="Distancia" 
          value={`${player.physical.distanceKm} km`}
          subtext={`${player.physical.sprints} Sprints de alta intensidad`}
          icon={Activity}
          color="purple"
        />
      </div>

      {/* Column 2: Detailed Text Analysis */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <SectionHeader title="Informe Técnico-Táctico" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                 <div>
                    <h4 className="text-emerald-400 font-bold text-sm uppercase mb-2">Perfil Táctico</h4>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      {player.analysis.tactical}
                    </p>
                 </div>
                 <div>
                    <h4 className="text-blue-400 font-bold text-sm uppercase mb-2">Fase Ofensiva / Técnica</h4>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      {player.analysis.technical} <br/><br/> {player.analysis.offensive}
                    </p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div>
                    <h4 className="text-red-400 font-bold text-sm uppercase mb-2">Fase Defensiva</h4>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/50">
                      {player.analysis.defensive}
                    </p>
                 </div>
                 <div>
                   <h4 className="text-yellow-400 font-bold text-sm uppercase mb-2">Mapa de Calor (Posicionamiento)</h4>
                   <div className="flex space-x-4">
                      <div className="w-1/3">
                        <HeatmapVisual data={player.heatmap} />
                      </div>
                      <div className="w-2/3 flex flex-col justify-center">
                         <p className="text-slate-300 text-sm italic">"{player.analysis.conclusion}"</p>
                      </div>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Comparison = ({ p1, p2 }: { p1: PlayerStats, p2: PlayerStats }) => {
  // Normalize data for Radar Chart
  const radarData = [
    { subject: 'Pases', A: (p1.passes.successful/40)*100, B: (p2.passes.successful/40)*100, fullMark: 100 },
    { subject: 'Defensa', A: (p1.defensive.duelsWon/12)*100, B: (p2.defensive.duelsWon/12)*100, fullMark: 100 },
    { subject: 'Físico', A: (p1.physical.distanceKm/12)*100, B: (p2.physical.distanceKm/12)*100, fullMark: 100 },
    { subject: 'Técnica', A: p1.rating * 10, B: p2.rating * 10, fullMark: 100 },
    { subject: 'Ofensiva', A: (p1.offensive.chancesCreated + p1.passes.progressive)*5, B: (p2.offensive.chancesCreated + p2.passes.progressive)*5, fullMark: 100 },
    { subject: 'Recuperación', A: (p1.defensive.recoveries/15)*100, B: (p2.defensive.recoveries/15)*100, fullMark: 100 },
  ];

  const barData = [
    { name: 'Pases Progresivos', p1: p1.passes.progressive, p2: p2.passes.progressive },
    { name: 'Duelos Ganados', p1: p1.defensive.duelsWon, p2: p2.defensive.duelsWon },
    { name: 'Intercepciones', p1: p1.defensive.interceptions, p2: p2.defensive.interceptions },
    { name: 'Sprints', p1: p1.physical.sprints, p2: p2.physical.sprints },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center">
          <SectionHeader title="Comparativa Global" subtitle="Análisis dimensional" />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={p1.name} dataKey="A" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.3} />
                <Radar name={p2.name} dataKey="B" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Side by Side */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <SectionHeader title="Métricas Clave" subtitle="Comparación directa (Valores absolutos)" />
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart
                 data={barData}
                 layout="vertical"
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
               >
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={120} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }} />
                 <Bar dataKey="p1" name={p1.name} fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                 <Bar dataKey="p2" name={p2.name} fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                 <Legend wrapperStyle={{ paddingTop: '20px' }}/>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <SectionHeader title="Veredicto Final" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
           <div>
              <h3 className="text-emerald-400 font-bold mb-2">{p1.name} (#{p1.number})</h3>
              <p className="text-slate-300 leading-relaxed">
                Jugadora fundamental para la estructura defensiva. Destaca su capacidad de mando y juego aéreo. Su perfil es más conservador pero ofrece una seguridad vital para el equipo en momentos de presión alta. Ideal para partidos donde se requiere solidez en bloque bajo.
              </p>
           </div>
           <div>
              <h3 className="text-blue-400 font-bold mb-2">{p2.name} (#{p2.number})</h3>
              <p className="text-slate-300 leading-relaxed">
                Aporta el factor desequilibrio desde el lateral. Su volumen físico es superior, permitiéndole cubrir toda la banda. Técnicamente arriesga más, lo que conlleva más pérdidas pero también mayor generación de peligro. Perfil moderno de lateral con proyección.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const ShareModal = ({ isOpen, onClose, url }: { isOpen: boolean, onClose: () => void, url: string }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const isLocalhost = url.includes("localhost") || url.includes("127.0.0.1");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-emerald-500/10 p-3 rounded-full">
            <LinkIcon className="text-emerald-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Informe Público</h3>
            <p className="text-sm text-slate-400">Enlace de sesión generado</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          Los datos interactivos de este partido ahora están accesibles a través del siguiente enlace único.
        </p>

        {isLocalhost && (
           <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start space-x-2">
             <div className="text-yellow-400 shrink-0 mt-0.5"><Eye size={16}/></div>
             <p className="text-xs text-yellow-200">
               <strong>Nota Importante:</strong> Esta URL funcionará correctamente si la aplicación está desplegada en un entorno accesible. Si estás en un entorno de pruebas privado, el enlace solo funcionará para usuarios autorizados.
             </p>
           </div>
        )}

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center space-x-2 mb-6">
          <div className="flex-1 text-slate-400 text-sm truncate font-mono select-all">
            <input 
              readOnly 
              value={url} 
              className="bg-transparent w-full focus:outline-none"
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
          <button 
            onClick={handleCopy}
            className={`p-2 rounded-md transition-all ${
              copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Copiar al portapapeles"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all flex items-center justify-center"
            title="Abrir en nueva pestaña"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

// --- Main Layout ---

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'p1' | 'p2' | 'compare'>('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isPublicView, setIsPublicView] = useState(false);

  const data = MOCK_MATCH_DATA;
  const p1 = data.players[0];
  const p2 = data.players[1];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'public') {
        setIsPublicView(true);
      }
      
      const tabParam = params.get('tab');
      if (tabParam && ['overview', 'p1', 'p2', 'compare'].includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Clean generation: Base URL (origin + pathname) + ONLY our new params
      // This ensures we strip any existing junk from the current URL
      let baseUrl = "http://localhost:3000";
      if (typeof window !== "undefined") {
         baseUrl = window.location.origin + window.location.pathname;
      }
      
      const newUrl = `${baseUrl}?report_id=AST-EUS-${uniqueId}&view=public&tab=${activeTab}`;
      
      setShareUrl(newUrl);
      setIsExporting(false);
      setShowShareModal(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row relative">
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} url={shareUrl} />
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 md:h-screen sticky top-0 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
             <Activity className="text-white" size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">Futbol<span className="text-emerald-500">Analytics</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BarChart2 size={18} />
            <span>Resumen Partido</span>
          </button>
          
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Análisis Individual</div>
          
          <button 
            onClick={() => setActiveTab('p1')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${activeTab === 'p1' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="flex items-center space-x-3">
              <User size={18} />
              <span>{p1.name}</span>
            </div>
            <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded">#{p1.number}</span>
          </button>

          <button 
            onClick={() => setActiveTab('p2')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${activeTab === 'p2' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <div className="flex items-center space-x-3">
              <User size={18} />
              <span>{p2.name}</span>
            </div>
            <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded">#{p2.number}</span>
          </button>

          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Herramientas</div>

          <button 
            onClick={() => setActiveTab('compare')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'compare' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={18} />
            <span>Comparativa</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
               <span className="animate-pulse">Generando...</span>
            ) : (
              <>
                <Share2 size={16} />
                <span>Compartir Informe</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area (INTERACTIVE) */}
      <main className="flex-1 h-screen overflow-y-auto bg-slate-950 p-6 md:p-10 relative scroll-smooth">
        
        {isPublicView && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-center justify-between animate-in slide-in-from-top">
            <div className="flex items-center space-x-3">
               <div className="bg-blue-500 p-1.5 rounded-full"><Eye size={16} className="text-white"/></div>
               <div>
                  <p className="text-white text-sm font-bold">Modo Invitado</p>
                  <p className="text-slate-400 text-xs">Estás viendo un informe compartido públicamente.</p>
               </div>
            </div>
          </div>
        )}

        <div className="bg-slate-950"> 
          {/* Header always visible */}
          <header className="flex justify-between items-center mb-8">
             <div>
               <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>{analysisContent.title}</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center space-x-2">
                  <Map size={14} />
                  <span>
                    {data.meta.competition} • {data.meta.date} • Actualizado: {analysisContent.updatedAtISO}
                  </span>
                </p>

             </div>
             <div className="hidden md:block">
                <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20 flex items-center space-x-2 text-sm font-medium animate-pulse">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                   <span>Live Data Mode</span>
                </div>
             </div>
          </header>

          {activeTab === 'overview' && <MatchOverview data={data} />}
          {activeTab === 'p1' && <PlayerAnalysis player={p1} />}
          {activeTab === 'p2' && <PlayerAnalysis player={p2} />}
          {activeTab === 'compare' && <Comparison p1={p1} p2={p2} />}
        </div>

      </main>
    </div>
  );
}
