import { useEffect, useState } from "react";
import SearchFilterBar from "./components/SearchFilterBar";
import LeadTable from "./components/LeadTable";
import LeadDetailPanel from "./components/LeadDetailPanel";
import OpportunitiesTable from "./components/OpportunitiesTable";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const [statusFilter, setStatusFilter] = useState(() => localStorage.getItem("statusFilter") || "");

  const [selectedLead, setSelectedLead] = useState(null);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const storedLeads = localStorage.getItem("leads");
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
        setLoading(false);
      } else {
        import("./data/leads.json")
          .then((data) => {
            setLeads(data.default);
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load leads.");
            setLoading(false);
          });
      }
    }, 800);
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem("leads", JSON.stringify(leads));
    }
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("statusFilter", statusFilter);
  }, [statusFilter]);

  const filteredLeads = leads
    .filter(
      (l) =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((l) => (statusFilter ? l.status === statusFilter : true))
    .sort((a, b) => b.score - a.score);

    const updateLead = (id, changes) => {
      setLeads((prev) => {
        const previous = prev.find((l) => l.id === id);
        const updated = prev.map((l) => (l.id === id ? { ...l, ...changes } : l));
    
        setTimeout(() => {
          const success = Math.random() > 0.2;
          if (!success) {
            alert("Failed to save. Reverting changes.");
            setLeads((latest) =>
              latest.map((l) => (l.id === id ? previous : l))
            );
          }
        }, 1000);
    
        return updated;
      });
    };
    

  const convertLead = (lead) => {
    const newOpp = {
      id: Date.now(),
      name: lead.name,
      stage: "New",
      amount: lead.amount ?? null,
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, newOpp]);
  };

  if (loading) return <div className="p-4 text-gray-500">Loading leads...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (leads.length === 0) return <div className="p-4 text-gray-500">No leads found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mini Seller Console</h1>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <LeadTable leads={filteredLeads} onSelectLead={setSelectedLead} />

      <OpportunitiesTable opportunities={opportunities} />

      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={updateLead}
          onConvert={convertLead}
        />
      )}
    </div>
  );
}
