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
      <div className="field">
        <label className="label">House</label>
        <select
          className="control"
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
      </div>
      {isHouseDisabled ? (
        <small>House filter only applies to All</small>
      ) : null}

      <div className="field">
        <label className="label">Group</label>
        <select
          className="control"
          value={selectedGroup}
          onChange={(event) => onGroupChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="students">Students</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="field">
        <label className="label">Search</label>
        <input
          className="control"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <label className="field">
        <input
          className="checkbox"
          type="checkbox"
          checked={onlyWithImage}
          onChange={(event) => onOnlyWithImageChange(event.target.checked)}
        />
        <span className="label-inline">Only with image</span>
      </label>
    </div>
  );
}
