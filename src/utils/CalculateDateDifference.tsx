import { DateTime, DurationObjectUnits } from "luxon";

export const CalculateDateDiferrence = (
  dateSaved: string
): DurationObjectUnits => {
  const todayDate = DateTime.fromISO(new Date().toISOString());
  const dateOfApproval = DateTime.fromISO(dateSaved);

  const diff = dateOfApproval.diff(todayDate, ["months"]);

  return diff.toObject();
};
