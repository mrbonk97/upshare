import { PulseLoader } from "react-spinners";

export const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <PulseLoader
      color="#8b5cf6"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      loading={loading}
      size={32}
    />
  );
};
