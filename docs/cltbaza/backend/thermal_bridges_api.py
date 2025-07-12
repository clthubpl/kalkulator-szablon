# CLT Thermal Bridges Calculator - Python FastAPI
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class LinearBridge(BaseModel):
    name: str
    psi: float
    length: float

class PointBridge(BaseModel):
    name: str
    chi: float
    quantity: int

class BridgesInput(BaseModel):
    area_m2: float
    u_base: float
    linear_bridges: list = []
    point_bridges: list = []
    expert_mode: bool = False
    perimeter_m: float = None

@app.post('/api/clt/thermal-bridges/calculate')
async def calc(inp: BridgesInput):
    psi_sum = sum(b['psi']*b['length'] for b in inp.linear_bridges)
    chi_sum = sum(b['chi']*b['quantity'] for b in inp.point_bridges)
    delta_u_lin = psi_sum/inp.area_m2 if inp.area_m2 else 0
    delta_u_pt = chi_sum/inp.area_m2 if inp.area_m2 else 0
    u_bridge = delta_u_lin + delta_u_pt
    u_total = inp.u_base + u_bridge
    warnings = []
    if inp.perimeter_m and sum(b['length'] for b in inp.linear_bridges) > inp.perimeter_m:
        warnings.append('Sum of bridge lengths exceeds perimeter.')
    if any(b['psi'] > 0.5 or b['psi'] < 0 for b in inp.linear_bridges):
        warnings.append('Unusually high/low psi value.')
    if any(b['chi'] > 1.0 or b['chi'] < 0 for b in inp.point_bridges):
        warnings.append('Unusually high/low chi value.')
    result = {
      'u_total': round(u_total, 4),
      'u_bridge_addition': round(u_bridge, 4),
      'u_breakdown': {'linear': round(delta_u_lin, 4), 'point': round(delta_u_pt, 4)},
      'norm_compliance': {
        'PL_WT2021': u_total <= 0.20,
        'DE_GEG': u_total <= 0.24
      },
      'validation_warnings': warnings,
      'summary': {'area_m2': inp.area_m2, 'u_base': inp.u_base, 'linear_bridges_count': len(inp.linear_bridges), 'point_bridges_count': len(inp.point_bridges)}
    }
    return result
