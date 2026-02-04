export default function Filters({
  selectedHouse,
  onHouseChange,
  selectedGroup,
  onGroupChange,
  search,
  onSearchChange,
  onlyWithImage,
  onOnlyWithImageChange,
}) {
  const isHouseDisabled =
    selectedGroup === "students" || selectedGroup === "staff";

  return (
    <div className="filters">
      <label>
        House
        <select
          value={selectedHouse}
          onChange={(event) => onHouseChange(event.target.value)}
          disabled={isHouseDisabled}
        >
          <option value="">All houses</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Slytherin">Slytherin</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Hufflepuff">Hufflepuff</option>
        </select>
      </label>
      {isHouseDisabled ? (
        <small>House filter only applies to All</small>
      ) : null}

      <label>
        Group
        <select
          value={selectedGroup}
          onChange={(event) => onGroupChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="students">Students</option>
          <option value="staff">Staff</option>
        </select>
      </label>

      <label>
        Search
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={onlyWithImage}
          onChange={(event) => onOnlyWithImageChange(event.target.checked)}
        />
        Only with image
      </label>
    </div>
  );
}
