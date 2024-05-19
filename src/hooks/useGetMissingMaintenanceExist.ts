import { useQuery } from "react-query";
import { getMissingMaintenanceExist } from "../api/getMissingMaintenanceExist";

export default function useGetMissingMaintenanceExist() {
  const { data: isMissingMaintenance } = useQuery(["getMissingMaintenanceExist"], getMissingMaintenanceExist, {});

  return { isMissingMaintenance };
}
