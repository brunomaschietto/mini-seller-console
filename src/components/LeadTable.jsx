export default function LeadTable({ leads, onSelectLead }) {
  return (
    <div className="overflow-x-auto mb-8">
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
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectLead(lead)}
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
  );
}
