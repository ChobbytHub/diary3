import { useAppSelector } from "../../redux/hooks";
import { toIsoString } from "../../utils/dateUtils";
import YearGroup from "./YearGroup";

export default function ThreeYearEntries() {
  const selectedDate = useAppSelector((state) => state.selectedDate.value);
  const diaries = useAppSelector((state) => state.diary.diaries);

  const threeYearEntries = [-2, -1, 0].map((yearOffset) => {
    const base = new Date(selectedDate);
    base.setFullYear(base.getFullYear() + yearOffset);
    const iso = toIsoString(base);

    const matched = diaries.filter((d) => d.diaryDate === iso);
    return { diaryDate: iso, diary: matched };
  });

  return (
    <>
      {threeYearEntries
        .sort((a, b) => a.diaryDate.localeCompare(b.diaryDate))
        .map(({ diaryDate, diary }) => (
          <YearGroup key={diaryDate} date={diaryDate} diary={diary} />
        ))}
    </>
  );
}
