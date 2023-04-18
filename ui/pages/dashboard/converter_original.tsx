const Converter = () => {
return (
  <div className="flex flex-col w-[340px] h-[340px] top-[82px] ml-auto rounded-xl border border-gray shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
  <div>
    <p className="text-[#312A64] font-bold font-poppins mt-3 ml-3">
      Exchange
    </p>
  </div>
  <div className="mt-auto flex flex-col items-center">
    <label htmlFor="from" className="self-start p-3">
      FROM
    </label>
    <select
      className="w-[308px] h-[50px] top-[204px] rounded-xl "
      id="from"
    >
      <option>1</option>
      <option>1</option>
      <option>1</option>
      <option>1</option>
    </select>
  </div>
  <div className="mt-auto mb-auto flex flex-col items-center">
    <label htmlFor="to" className="self-start p-3">
      TO
    </label>
    <select
      className="w-[308px] h-[50px] top-[290px] rounded-xl"
      id="to"
    >
      <option>2</option>
      <option>2</option>
      <option>2</option>
      <option>2</option>
    </select>
  </div>
  <div className="flex flex-col items-center">
    <button className="bg-btn text-white rounded-xl w-[306px] h-[50px] font-poppins font-bold">
      {" "}
      Compare
    </button>
  </div>
</div>
);
};
export default Converter;