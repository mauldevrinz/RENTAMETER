const products = [
  // === 1. SENSOR DAN TRANSDUSER ===
  { id: 1, title: 'RTD (Pt100/Pt1000)', category: 'Sensor & Transduser', buyPrice: 'Rp 1.500.000', rating: 4.8, reviews: 124 },
  { id: 2, title: 'Thermocouple (Tipe K)', category: 'Sensor & Transduser', buyPrice: 'Rp 750.000', rating: 4.7, reviews: 98 },
  { id: 3, title: 'Thermocouple (Tipe J)', category: 'Sensor & Transduser', buyPrice: 'Rp 800.000', rating: 4.6, reviews: 85 },
  { id: 4, title: 'Thermocouple (Tipe S/R)', category: 'Sensor & Transduser', buyPrice: 'Rp 2.500.000', rating: 4.9, reviews: 42 },
  { id: 5, title: 'Thermistor', category: 'Sensor & Transduser', buyPrice: 'Rp 350.000', rating: 4.5, reviews: 215 },
  { id: 6, title: 'Bimetal Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 1.200.000', rating: 4.4, reviews: 67 },
  { id: 7, title: 'Orifice Plate', category: 'Sensor & Transduser', buyPrice: 'Rp 4.500.000', rating: 4.7, reviews: 38 },
  { id: 8, title: 'Venturi Tube', category: 'Sensor & Transduser', buyPrice: 'Rp 8.500.000', rating: 4.8, reviews: 22 },
  { id: 9, title: 'Pitot Tube', category: 'Sensor & Transduser', buyPrice: 'Rp 3.500.000', rating: 4.6, reviews: 56 },
  { id: 10, title: 'Flow Nozzle', category: 'Sensor & Transduser', buyPrice: 'Rp 5.200.000', rating: 4.5, reviews: 19 },
  { id: 11, title: 'Magnetic Flow Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 15.000.000', rating: 4.9, reviews: 74 },
  { id: 12, title: 'Ultrasonic Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 12.500.000', rating: 4.8, reviews: 112 },
  { id: 13, title: 'Coriolis Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 45.000.000', rating: 4.9, reviews: 15 },
  { id: 14, title: 'Vortex Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 18.000.000', rating: 4.7, reviews: 33 },
  { id: 15, title: 'Turbine Flow Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 10.500.000', rating: 4.6, reviews: 48 },
  { id: 16, title: 'Rotameter', category: 'Sensor & Transduser', buyPrice: 'Rp 2.800.000', rating: 4.5, reviews: 95 },
  { id: 17, title: 'Differential Pressure (DP) Cell', category: 'Sensor & Transduser', buyPrice: 'Rp 14.500.000', rating: 4.8, reviews: 62 },
  { id: 18, title: 'Strain Gauge', category: 'Sensor & Transduser', buyPrice: 'Rp 1.200.000', rating: 4.6, reviews: 142 },
  { id: 19, title: 'Bourdon Tube', category: 'Sensor & Transduser', buyPrice: 'Rp 950.000', rating: 4.5, reviews: 88 },
  { id: 20, title: 'Capacitive Pressure Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 5.500.000', rating: 4.7, reviews: 45 },
  { id: 21, title: 'Piezoelectric Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 7.500.000', rating: 4.8, reviews: 29 },
  { id: 22, title: 'Float Switch', category: 'Sensor & Transduser', buyPrice: 'Rp 1.500.000', rating: 4.4, reviews: 165 },
  { id: 23, title: 'Displacer', category: 'Sensor & Transduser', buyPrice: 'Rp 9.500.000', rating: 4.6, reviews: 24 },
  { id: 24, title: 'Radar Level Sensor (Guided)', category: 'Sensor & Transduser', buyPrice: 'Rp 28.000.000', rating: 4.9, reviews: 31 },
  { id: 25, title: 'Radar Level Sensor (Non-Contact)', category: 'Sensor & Transduser', buyPrice: 'Rp 35.000.000', rating: 4.9, reviews: 27 },
  { id: 26, title: 'Hydrostatic Level Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 8.500.000', rating: 4.7, reviews: 54 },
  { id: 27, title: 'Conductivity Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 4.500.000', rating: 4.6, reviews: 82 },
  { id: 28, title: 'pH Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 3.800.000', rating: 4.7, reviews: 194 },
  { id: 29, title: 'ORP Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 4.200.000', rating: 4.5, reviews: 38 },
  { id: 30, title: 'Turbidity Sensor', category: 'Sensor & Transduser', buyPrice: 'Rp 12.000.000', rating: 4.6, reviews: 21 },
  { id: 31, title: 'Gas Sensor (Catalytic)', category: 'Sensor & Transduser', buyPrice: 'Rp 6.500.000', rating: 4.8, reviews: 55 },
  { id: 32, title: 'Gas Sensor (Infrared)', category: 'Sensor & Transduser', buyPrice: 'Rp 15.000.000', rating: 4.8, reviews: 42 },
  { id: 33, title: 'Gas Sensor (Electrochemical)', category: 'Sensor & Transduser', buyPrice: 'Rp 8.500.000', rating: 4.7, reviews: 68 },
  { id: 34, title: 'Proximity Sensor (Inductive)', category: 'Sensor & Transduser', buyPrice: 'Rp 850.000', rating: 4.7, reviews: 210 },
  { id: 35, title: 'Proximity Sensor (Capacitive)', category: 'Sensor & Transduser', buyPrice: 'Rp 1.100.000', rating: 4.7, reviews: 145 },
  { id: 36, title: 'Proximity Sensor (Optical)', category: 'Sensor & Transduser', buyPrice: 'Rp 1.500.000', rating: 4.6, reviews: 132 },
  { id: 37, title: 'LVDT', category: 'Sensor & Transduser', buyPrice: 'Rp 12.000.000', rating: 4.8, reviews: 35 },

  // === 2. TRANSMITTER ===
  { id: 38, title: 'Pressure Transmitter', category: 'Transmitter', buyPrice: 'Rp 12.500.000', rating: 4.9, reviews: 112 },
  { id: 39, title: 'Temperature Transmitter', category: 'Transmitter', buyPrice: 'Rp 8.500.000', rating: 4.8, reviews: 95 },
  { id: 40, title: 'Level Transmitter', category: 'Transmitter', buyPrice: 'Rp 15.500.000', rating: 4.9, reviews: 64 },
  { id: 41, title: 'Flow Transmitter', category: 'Transmitter', buyPrice: 'Rp 22.000.000', rating: 4.9, reviews: 45 },
  { id: 42, title: 'Differential Pressure Transmitter', category: 'Transmitter', buyPrice: 'Rp 18.500.000', rating: 4.8, reviews: 78 },
  { id: 43, title: 'Analytical Transmitter (pH)', category: 'Transmitter', buyPrice: 'Rp 12.000.000', rating: 4.7, reviews: 34 },
  { id: 44, title: 'Analytical Transmitter (Conductivity)', category: 'Transmitter', buyPrice: 'Rp 14.500.000', rating: 4.7, reviews: 29 },
  { id: 45, title: 'Vibration Transmitter', category: 'Transmitter', buyPrice: 'Rp 18.000.000', rating: 4.8, reviews: 52 },
  { id: 46, title: 'Position Transmitter', category: 'Transmitter', buyPrice: 'Rp 10.500.000', rating: 4.7, reviews: 41 },

  // === 3. ACTUATOR DAN FINAL CONTROL ELEMENT ===
  { id: 47, title: 'Control Valve (Globe)', category: 'Actuator & Control', buyPrice: 'Rp 35.000.000', rating: 4.8, reviews: 42 },
  { id: 48, title: 'Control Valve (Ball)', category: 'Actuator & Control', buyPrice: 'Rp 28.000.000', rating: 4.7, reviews: 55 },
  { id: 49, title: 'Control Valve (Butterfly)', category: 'Actuator & Control', buyPrice: 'Rp 18.000.000', rating: 4.6, reviews: 68 },
  { id: 50, title: 'Control Valve (Plug)', category: 'Actuator & Control', buyPrice: 'Rp 22.000.000', rating: 4.6, reviews: 31 },
  { id: 51, title: 'Solenoid Valve', category: 'Actuator & Control', buyPrice: 'Rp 3.500.000', rating: 4.7, reviews: 185 },
  { id: 52, title: 'Pneumatic Actuator (Diaphragm)', category: 'Actuator & Control', buyPrice: 'Rp 12.500.000', rating: 4.8, reviews: 48 },
  { id: 53, title: 'Pneumatic Actuator (Piston)', category: 'Actuator & Control', buyPrice: 'Rp 15.000.000', rating: 4.8, reviews: 35 },
  { id: 54, title: 'Electric Actuator', category: 'Actuator & Control', buyPrice: 'Rp 25.000.000', rating: 4.9, reviews: 28 },
  { id: 55, title: 'Hydraulic Actuator', category: 'Actuator & Control', buyPrice: 'Rp 45.000.000', rating: 4.8, reviews: 19 },
  { id: 56, title: 'Valve Positioner', category: 'Actuator & Control', buyPrice: 'Rp 18.500.000', rating: 4.9, reviews: 62 },
  { id: 57, title: 'I/P Converter', category: 'Actuator & Control', buyPrice: 'Rp 6.500.000', rating: 4.7, reviews: 75 },
  { id: 58, title: 'Variable Speed Drive (VSD/VFD)', category: 'Actuator & Control', buyPrice: 'Rp 12.000.000', rating: 4.8, reviews: 94 },
  { id: 59, title: 'Motorized Valve (MOV)', category: 'Actuator & Control', buyPrice: 'Rp 48.000.000', rating: 4.9, reviews: 22 },
  { id: 60, title: 'Damper', category: 'Actuator & Control', buyPrice: 'Rp 8.500.000', rating: 4.5, reviews: 38 },

  // === 4. ALAT KALIBRASI (CALIBRATION TOOLS) ===
  { id: 61, title: 'Dead Weight Tester', category: 'Alat Kalibrasi', buyPrice: 'Rp 85.000.000', rating: 4.9, reviews: 12 },
  { id: 62, title: 'Dry Block Calibrator', category: 'Alat Kalibrasi', buyPrice: 'Rp 65.000.000', rating: 4.9, reviews: 18 },
  { id: 63, title: 'Temperature Bath', category: 'Alat Kalibrasi', buyPrice: 'Rp 55.000.000', rating: 4.8, reviews: 14 },
  { id: 64, title: 'Pneumatic Hand Pump', category: 'Alat Kalibrasi', buyPrice: 'Rp 12.500.000', rating: 4.7, reviews: 82 },
  { id: 65, title: 'Hydraulic Hand Pump', category: 'Alat Kalibrasi', buyPrice: 'Rp 18.000.000', rating: 4.7, reviews: 64 },
  { id: 66, title: 'Digital Pressure Gauge (Master)', category: 'Alat Kalibrasi', buyPrice: 'Rp 15.500.000', rating: 4.9, reviews: 52 },
  { id: 67, title: 'Multifunction Process Calibrator', category: 'Alat Kalibrasi', buyPrice: 'Rp 75.000.000', rating: 4.9, reviews: 41 },
  { id: 68, title: 'HART Communicator', category: 'Alat Kalibrasi', buyPrice: 'Rp 45.000.000', rating: 4.9, reviews: 68 },
  { id: 69, title: 'Loop Calibrator', category: 'Alat Kalibrasi', buyPrice: 'Rp 12.000.000', rating: 4.7, reviews: 92 },
  { id: 70, title: 'Signal Generator', category: 'Alat Kalibrasi', buyPrice: 'Rp 18.500.000', rating: 4.8, reviews: 48 },
  { id: 71, title: 'Standard Gas Cylinder', category: 'Alat Kalibrasi', buyPrice: 'Rp 4.500.000', rating: 4.5, reviews: 36 },
  { id: 72, title: 'Decade Box (R/C)', category: 'Alat Kalibrasi', buyPrice: 'Rp 8.500.000', rating: 4.6, reviews: 29 },
  { id: 73, title: 'Oscilloscope', category: 'Alat Kalibrasi', buyPrice: 'Rp 12.000.000', rating: 4.8, reviews: 112 },
  { id: 74, title: 'Digital Multimeter (High Accuracy)', category: 'Alat Kalibrasi', buyPrice: 'Rp 6.500.000', rating: 4.9, reviews: 245 },

  // === 5. MICROCONTROLLER ===
  { id: 75, title: 'NodeMCU ESP32 Development Board', category: 'Microcontroller', buyPrice: 'Rp 95.000', rating: 4.9, reviews: 852 },
  { id: 76, title: 'STM32F103C8T6 Blue Pill Board', category: 'Microcontroller', buyPrice: 'Rp 65.000', rating: 4.8, reviews: 531 },
]

// Auto-fill patterns
products.forEach(p => {
  // Image path: LOCAL public/images/products/
  p.image = `/images/products/product-${p.id}.jpg`
  
  // Rent price = 0.5% of buy per day
  const val = parseInt(p.buyPrice.replace(/[^\d]/g, ''))
  const rent = Math.round(val * 0.005)
  p.rentPrice = `Rp ${rent.toLocaleString('id-ID')} / hari`

  // Default specs based on category
  const specMap = {
    'Sensor & Transduser': [
      { label:'Akurasi', value:'±0.1% FS' },
      { label:'Range Suhu', value:'-40°C ~ 85°C' },
      { label:'Output', value:'4-20 mA / HART' },
      { label:'Sertifikasi', value:'ATEX / IECEx' },
    ],
    'Transmitter': [
      { label:'Protokol', value:'HART / FF / Modbus' },
      { label:'Akurasi', value:'±0.04% Span' },
      { label:'Power Supply', value:'12-42 VDC' },
      { label:'Display', value:'LCD Backlit' },
    ],
    'Actuator & Control': [
      { label:'Tipe Aksi', value:'Double Acting' },
      { label:'Torsi', value:'Up to 500 Nm' },
      { label:'Tekanan Kerja', value:'6-10 bar' },
      { label:'Proteksi', value:'IP67' },
    ],
    'Alat Kalibrasi': [
      { label:'Akurasi', value:'±0.02% Reading' },
      { label:'Resolusi', value:'5.5 Digit' },
      { label:'Sertifikasi', value:'ISO 17025' },
      { label:'Baterai', value:'Rechargeable Li-ion' },
    ],
    'Microcontroller': [
      { label:'Clock Speed', value:'Up to 240 MHz' },
      { label:'Memori', value:'Flash / SRAM' },
      { label:'Konektivitas', value:'WiFi / Bluetooth / GPIO' },
      { label:'Power Supply', value:'3.3V - 5V DC' },
    ],
  }
  p.specs = specMap[p.category] || specMap['Sensor & Transduser']
})

export default products