import { Box } from "@material-ui/core";

const getStatusColor = (status: String) =>
  status === "cold"
    ? "#7dbde8"
    : status === "warm"
    ? "#e8cb7d"
    : status === "hot"
    ? "#e88b7d"
    : status === "in-contract"
    ? "#a4e87d"
    : "#000";

const Status = ({ status }: { status: string }) => (
  <Box
    width={10}
    height={10}
    display="inline-block"
    borderRadius={5}
    bgcolor={getStatusColor(status)}
    component="span"
  />
);

export default Status;
