import NepaliDate from "nepali-date-converter";
import Navbar from "../Navbar";

const MagluLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* top nav  */}
      <div className="flex flex-col p-4  text-center   sm:text-center md:text-center lg:pl-12 lg:text-left ">
        <div className="text-4xl font-extrabold">
          itnotes
          <span className="text-primary">.study</span>
        </div>
        <div className="text-sm ">{new NepaliDate(new Date()).toString()}</div>
      </div>
      <Navbar />
      {children}
      {/* footer */}
    </>
  );
};
export default MagluLayout;
