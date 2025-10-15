import React from "react";

interface Cuenta {
  id?: number;
  banco: string;
  cuenta_corriente: string;
  titular: string;
  monto_cheque: number;
  mandato?: string;
}

interface Props {
  index: number;
  data: Cuenta;
  onChange: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export const CuentaForm: React.FC<Props> = ({ index, data, onChange, onRemove }) => (
  <div className="border p-3 rounded mb-2 flex flex-col gap-2">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Banco"
        value={data.banco}
        onChange={(e) => onChange(index, "banco", e.target.value)}
        className="border p-1 rounded flex-1"
      />
      <input
        type="text"
        placeholder="Cuenta corriente"
        value={data.cuenta_corriente}
        onChange={(e) => onChange(index, "cuenta_corriente", e.target.value)}
        className="border p-1 rounded flex-1"
      />
      <input
        type="text"
        placeholder="Titular"
        value={data.titular}
        onChange={(e) => onChange(index, "titular", e.target.value)}
        className="border p-1 rounded flex-1"
      />
      <input
        type="number"
        placeholder="Monto cheque"
        value={data.monto_cheque}
        onChange={(e) => onChange(index, "monto_cheque", parseFloat(e.target.value))}
        className="border p-1 rounded w-32"
      />
      <button onClick={() => onRemove(index)} className="bg-red-500 text-white px-2 rounded">
        X
      </button>
    </div>
    <input
      type="text"
      placeholder="Mandato"
      value={data.mandato || ""}
      onChange={(e) => onChange(index, "mandato", e.target.value)}
      className="border p-1 rounded mt-1"
    />
  </div>
);
