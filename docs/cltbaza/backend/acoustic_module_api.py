# CLT Acoustic Module - FastAPI (schematic)
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
app = FastAPI()

class Layer(BaseModel):
    material: str
    thickness: float
    mass: float
    e_modulus: float

class Junction(BaseModel):
    type: str
    geometry: str
    mass: float
    connectors: str

class AcousticInput(BaseModel):
    layers: list
    junctions: list = []
    lab_data: dict = None
    finishes: list = []
    scenarios: list = []
    frequency_range: list = [100, 3150]
    export_pdf: bool = False

@app.post('/api/clt/acoustics/calculate')
async def calculate(inp: AcousticInput):
    # Dynamic mass law (simplified): R = 20*log10(mf) - 47
    masses = [l['mass'] for l in inp.layers] + [f['mass'] for f in inp.finishes]
    m_total = sum(masses)
    rw = round(20*np.log10(m_total*500)-47,1)  # 500Hz point, sample
    lnw = 55 - 0.02*m_total   # dummy
    c = -1.0
    ctr = -5.0
    dlw = 15.0
    freq_curve = [rw-5, rw, rw-10]
    scenario_comp = []
    if inp.scenarios:
      for s in inp.scenarios:
        s_m = sum([l['mass'] for l in s['layers']])
        s_rw = round(20*np.log10(s_m*500)-47,1)
        scenario_comp.append({'rw': s_rw, 'layers': s['layers']})
    result = {
      "rw": rw, "c": c, "ctr": ctr, "lnw": lnw, "dlw": dlw, "frequency_curve": freq_curve,
      "junction_losses": [], "scenario_comparison": scenario_comp,
      "norm_compliance": {"PL_WT2021": rw>=52, "ISO12354": True}, "pdf_base64": ""
    }
    return result
