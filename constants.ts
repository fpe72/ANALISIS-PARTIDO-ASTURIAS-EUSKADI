import { MatchData, PlayerStats } from './types';

// Datos ajustados al análisis de video: Asturias 0 - 1 País Vasco (Euskadi)
// Contexto: Campeonato Sub-16. Monólogo de Euskadi. Asturias en 4-1-4-1 bloque bajo.
export const MOCK_MATCH_DATA: MatchData = {
  meta: {
    title: "Asturias vs Euskadi",
    date: "Fase Oro - CNSA Sub-16",
    competition: "Cto. Nacional de Selecciones Autonómicas Sub-16",
    duration: "96:30",
    score: "0 - 1",
    opponent: "Euskadi",
  },
  stats: {
    possession: [24, 76], // Dominio territorial absoluto de Euskadi
    passes: [132, 580], // Asturias no logró conectar secuencias de pase
    shots: [1, 19], // Producción ofensiva casi nula de Asturias
    shotsOnTarget: [1, 8],
    fouls: [11, 5], // Interrupciones tácticas necesarias
    corners: [0, 12], // Indicador de la inclinación del campo
    duelsWonPercentage: [42, 58],
  },
  events: [
    { minute: 18, type: 'chance', description: 'Disparo de Euskadi al poste tras pérdida en salida de balón', team: 'away' },
    { minute: 32, type: 'chance', description: 'Sofía corrige posición y bloquea disparo en la frontal', team: 'home' },
    { minute: 44, type: 'chance', description: 'Intervención de la portera asturiana a mano cambiada', team: 'home' },
    { minute: 62, type: 'goal', description: 'Gol de Euskadi - Centro desde banda derecha asturiana rematado en el área', team: 'away' },
    { minute: 75, type: 'sub', description: 'Modificación táctica: Asturias intenta presionar más arriba sin éxito', team: 'home' },
  ],
  teamAnalysis: {
    style: "Resistencia Posicional (4-1-4-1). El plan de juego se basó exclusivamente en la contención espacial, renunciando a la iniciativa para minimizar la inferioridad técnica individual frente al rival.",
    defense: "Bloque Bajo Intensivo. La estructura defensiva funcionó bien durante 60 minutos gracias a la acumulación de hasta 9 jugadoras detrás del balón. El uso de un pivote defensivo (Sofía) por delante de la línea de 4 logró colapsar el carril central, obligando a Euskadi a circular en 'U' y buscar centros laterales constantes (12 corners en contra). Sin embargo, el hundimiento excesivo de la línea defensiva en el área propia impidió salir a la contra.",
    strengths: ["Solidaridad en las coberturas interiores", "Defensa de área en centros frontales", "Disciplina táctica para mantener el dibujo bajo presión extrema"],
    weaknesses: ["Incapacidad absoluta para superar la primera línea de presión (solo 132 pases)", "Aislamiento total de la punta, convirtiendo los despejes en entregas al rival", "Fatiga cognitiva: El gol llega tras un desajuste de marcas de las centrales en el área pequeña, sin responsabilidad de los laterales."],
  },
  players: [
    {
      id: 'p1',
      name: 'Sofía Palacios',
      number: 6,
      position: 'Pivote Defensivo (MCD)',
      minutesPlayed: 96,
      rating: 7.8, // Calificación basada en volumen defensivo
      passes: { total: 22, successful: 15, progressive: 2, key: 0 },
      defensive: { recoveries: 14, interceptions: 9, duelsWon: 8, duelsTotal: 12, tackles: 4 },
      offensive: { shots: 0, chancesCreated: 0, dribbles: 0 },
      physical: { distanceKm: 9.1, sprints: 5 },
      // Mapa de calor: Zona de Pivote (Fila 3) y Área propia (Fila 4) incrustándose entre centrales
      heatmap: [
        [0, 0, 0], 
        [0, 0, 0],
        [0, 20, 0], // Zona de pivote defensivo
        [10, 60, 10], // Zona frontal del área / ayuda a centrales
        [0, 0, 0] 
      ],
      analysis: {
        tactical: "Eje del sistema defensivo. Actuó por delante de la línea de cuatro, basculando para tapar líneas de pase interior. Frecuentemente se vio obligada a incrustarse como tercer central ante los centros laterales.",
        technical: "Limitada participación con balón. Su función principal fue el despeje y el pase de seguridad. No arriesgó en zonas comprometidas dada la presión rival.",
        defensive: "Alto volumen de intervenciones. Fundamental en las coberturas a la espalda de las interiores. Ganó duelos importantes en la frontal del área, aunque sufrió cuando Euskadi circuló rápido de lado a lado.",
        offensive: "Inexistente debido al plan de partido. No pisó campo rival en fase ofensiva, manteniéndose siempre como vigilante.",
        conclusion: "Sostén táctico. Su posicionamiento permitió al equipo resistir por el centro durante una hora. Partido de puro desgaste posicional sin balón."
      }
    },
    {
      id: 'p2',
      name: 'María Jareño',
      number: 3,
      position: 'Lateral Izquierdo (LI)',
      minutesPlayed: 96,
      rating: 6.5, // Subida ligera por corrección de análisis
      passes: { total: 10, successful: 5, progressive: 0, key: 0 },
      defensive: { recoveries: 4, interceptions: 2, duelsWon: 3, duelsTotal: 11, tackles: 2 },
      offensive: { shots: 0, chancesCreated: 0, dribbles: 0 },
      physical: { distanceKm: 10.5, sprints: 12 },
      // Mapa de calor: Carril Izquierdo muy profundo en defensa
      heatmap: [
        [0, 0, 0],   
        [0, 0, 0],
        [5, 0, 0],   
        [35, 5, 0],  
        [90, 10, 0]  // Zona defensiva baja (Córner propio izq)
      ],
      analysis: {
        tactical: "Disciplina posicional férrea. Mantuvo su posición cerrada para evitar filtraciones interiores y cumplió estrictamente con las vigilancias en su sector, sin verse arrastrada por el movimiento del balón.",
        technical: "Imprecisa bajo presión en la salida. Tuvo problemas para conectar con la extremo de su banda, perdiendo varios balones que resultaron en segundas jugadas para el rival.",
        defensive: "Sufrió el asedio constante. Es crucial destacar que NO tuvo responsabilidad en el gol encajado: la jugada vino por banda contraria y el remate se produjo por un fallo de marcaje en la zona central, ajeno a su jurisdicción.",
        offensive: "Nula profundidad. No pudo proyectarse en ataque en ningún momento del partido.",
        conclusion: "Partido de resistencia sin errores graves. Su actuación estuvo condicionada por el dominio rival, pero mantuvo el orden en su zona. Exenta de culpa en la jugada decisiva del encuentro."
      }
    }
  ]
};
