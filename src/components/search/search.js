export function SearchH1({ headerRef }) {
  return (
    <h1
      ref={headerRef}
      className="mb-[20px] text-center text-[calc(23px_+_1vw)] font-semibold md:mb-[40px] md:mt-[20px]"
    >
      Search Products
    </h1>
  );
}

export function SearchFrom({ handleSearch, setSearchQuery, searchQuery }) {
  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto mb-[20px] mt-[50px] flex justify-between md:max-w-[600px] lg:max-w-[800px]"
    >
      <input
        type="text"
        className="w-[60%] rounded-full border-[.3px] border-solid border-slate-500 px-[15px] py-[10px] placeholder:text-[16px] placeholder:capitalize focus:bg-slate-50 focus:outline-none md:px-[30px] md:text-[20px] md:placeholder:text-[20px]"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="product name"
      />
      <button
        type="submit"
        className="rounded-full bg-slate-300 px-[20px] text-[14px] uppercase transition-colors hover:bg-slate-200 md:px-[40px] md:text-[20px]"
      >
        Search
      </button>
    </form>
  );
}
