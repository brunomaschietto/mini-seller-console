export default function OpportunitiesTable({ opportunities }) {
  if (opportunities.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-semibold mb-2">Opportunities</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Stage</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Account</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp.id} className="border-t">
              <td className="px-4 py-2">{opp.name}</td>
              <td className="px-4 py-2">{opp.stage}</td>
              <td className="px-4 py-2">{opp.amount ?? "-"}</td>
              <td className="px-4 py-2">{opp.accountName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
