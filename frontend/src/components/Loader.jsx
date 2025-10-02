import { LoaderCircle } from "lucide-react";
const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <LoaderCircle className="animate-spin size-10" />
    </div>
  );
};

export default Loader;
