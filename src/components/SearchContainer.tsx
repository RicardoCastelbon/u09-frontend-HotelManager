import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    sort,
    sortOptions,
    statusOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e: any) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search */}
          <FormRow
          labelText="search by last name"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* filter by status */}
          <FormRowSelect
            labelText="booking status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn_danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
