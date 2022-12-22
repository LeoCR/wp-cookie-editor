import { DateTime } from "luxon";

export const CalculateDateDiferrence = (
  dateSaved: string
): luxon.DurationObjectUnits => {
  const todayDate = DateTime.fromISO(new Date().toISOString());
  const dateOfApproval = DateTime.fromISO(dateSaved);

  const diff = dateOfApproval.diff(todayDate, ["months"]);

  return diff.toObject();
};
