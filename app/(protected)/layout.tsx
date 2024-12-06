import { Navbar } from "@/components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default DashboardLayout;
