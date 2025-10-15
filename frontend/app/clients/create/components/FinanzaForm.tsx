import React from "react";

interface Finanza {
  id?: number;
  credito: number;
  deuda: number;
  solicitado: number;
  dia_pago: number;
}

interface Props {
  index: number;
  data: Finanza;
  onChange: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export const FinanzaForm: React.FC<Props> = ({ index, data, onChange, onRemove }) => (
  <div className="border p-3 rounded mb-2 flex flex-col gap-2">
    <div className="flex gap-2">
      <input
        type="number"
        placeholder="Crédito"
        value={data.credito}
        onChange={(e) => onChange(index, "credito", parseFloat(e.target.value))}
        className="border p-1 rounded flex-1"
      />
      <input
        type="number"
        placeholder="Deuda"
        value={data.deuda}
        onChange={(e) => onChange(index, "deuda", parseFloat(e.target.value))}
        className="border p-1 rounded flex-1"
      />
      <input
        type="number"
        placeholder="Solicitado"
        value={data.solicitado}
        onChange={(e) => onChange(index, "solicitado", parseFloat(e.target.value))}
        className="border p-1 rounded flex-1"
      />
      <input
        type="number"
        placeholder="Día de pago"
        value={data.dia_pago}
        onChange={(e) => onChange(index, "dia_pago", parseInt(e.target.value))}
        className="border p-1 rounded w-24"
        min={1}
        max={31}
      />
      <button onClick={() => onRemove(index)} className="bg-red-500 text-white px-2 rounded">
        X
      </button>
    </div>
  </div>
);
