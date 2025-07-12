// CLT Thermal Bridges Form (React minimal)
import { useState } from 'react';
export default function ThermalBridgesCalc() {
  const [uBase, setUBase] = useState(0.18);
  const [area, setArea] = useState(100);
  const [linear, setLinear] = useState([{name:'Balkon', psi:0.12, length:3.0}]);
  const [point, setPoint] = useState([{name:'Kotwa', chi:0.15, quantity:5}]);
  const [result, setResult] = useState(null);
  async function calc() {
    const res = await fetch('/api/clt/thermal-bridges/calculate', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({area_m2:area,u_base:uBase,linear_bridges:linear,point_bridges:point})});
    setResult(await res.json());
  }
  return (<div>
    <input value={uBase} onChange={e=>setUBase(Number(e.target.value))} placeholder='U base'/>
    <input value={area} onChange={e=>setArea(Number(e.target.value))} placeholder='Area [m2]'/>
    <button onClick={calc}>Oblicz / Calculate</button>
    {result && <div>ΔU: {result.u_bridge_addition} | U_total: {result.u_total}</div>}
  </div>);
}
