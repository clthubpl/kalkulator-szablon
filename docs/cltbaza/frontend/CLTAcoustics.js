// CLT Acoustic Performance React UI
import { useState } from 'react';
export default function CLTAcoustics() {
  const [layers, setLayers] = useState([{material:'CLT', thickness:120, mass:62, e_modulus:11000}]);
  const [finishes, setFinishes] = useState([]);
  const [result, setResult] = useState(null);
  async function calc() {
    const res = await fetch('/api/clt/acoustics/calculate', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({layers, finishes})});
    setResult(await res.json());
  }
  return (<div>
    <button onClick={calc}>Calculate Acoustic Performance</button>
    {result && (<div>
      <div>Rw: {result.rw} dB</div>
      <div>Ln,w: {result.lnw} dB</div>
      <div>C: {result.c}</div>
      <div>Ctr: {result.ctr}</div>
      <div>ΔLw: {result.dlw}</div>
      <div>PL WT2021: {result.norm_compliance?.PL_WT2021?'OK':'NOT OK'}</div>
    </div>)}
  </div>);
}
