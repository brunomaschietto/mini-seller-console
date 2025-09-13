import { useState } from "react";

export default function LeadDetailPanel({ lead, onClose, onSave, onConvert }) {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format");
      return;
    }
    onSave(lead.id, { email, status });
    onClose();
  };

  const handleConvert = () => {
    onConvert({ ...lead, amount: amount ? Number(amount) : null });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end sm:items-stretch sm:justify-end">
      <div className="bg-white w-full sm:w-96 h-full shadow-xl p-6 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Lead Details</h2>
        <p><span className="font-semibold">Name:</span> {lead.name}</p>
        <p><span className="font-semibold">Company:</span> {lead.company}</p>

        <div className="mt-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Opportunity Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Optional"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleConvert}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto sm:ml-auto"
          >
            Convert Lead
          </button>
        </div>
      </div>
    </div>
  );
}
