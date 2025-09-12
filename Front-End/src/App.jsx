import { useEffect, useState } from "react";

function SlideOver({ lead, onClose, onSave }) {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [error, setError] = useState(null);

  const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);

  const handleSave = () => {
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    onSave({ ...lead, email, status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="bg-white w-full sm:w-96 h-full shadow-xl p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Lead Details</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{lead.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Company</p>
          <p className="font-medium">{lead.company}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <select
            className="border rounded-lg px-3 py-2 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

        <div className="mt-auto flex gap-2">
          <button
            className="flex-1 bg-gray-200 rounded-lg py-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-blue-600 text-white rounded-lg py-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      import("./data/leads.json")
        .then((data) => {
          setLeads(data.default);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load leads.");
          setLoading(false);
        });
    }, 800);
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading leads...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (leads.length === 0) {
    return <div className="p-4 text-gray-500">No leads found.</div>;
  }

  const filteredLeads = leads
    .filter((lead) => {
      const term = search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term)
      );
    })
    .filter((lead) =>
      statusFilter === "all" ? true : lead.status === statusFilter
    )
    .sort((a, b) => b.score - a.score);

  const uniqueStatuses = Array.from(new Set(leads.map((l) => l.status)));

  const handleSaveLead = (updatedLead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );
    setSelectedLead(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mini Seller Console</h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          className="border rounded-lg px-3 py-2 w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 w-full sm:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.company}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2">{lead.score}</td>
                <td className="px-4 py-2">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <SlideOver
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
}
