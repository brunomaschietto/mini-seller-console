export default function SearchFilterBar({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
      </select>
    </div>
  );
}
