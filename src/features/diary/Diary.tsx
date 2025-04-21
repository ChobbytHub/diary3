import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/diarySlice";
import {
  selectThreeYearDiaries,
  selectSelectedDate,
} from "../../redux/selectors";
import DateNavigation from "./DateNavigation";
import YearGroup from "./YearGroup";

export default function Diary() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const threeYearDiaries = useSelector(selectThreeYearDiaries);

  const toIso = (d: Date) => d.toISOString().split("T")[0];

  const handleChangeDate = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    dispatch(setSelectedDate(toIso(d)));
  };

  return (
    <div>
      <DateNavigation
        onPrev={() => handleChangeDate(-1)}
        onNext={() => handleChangeDate(1)}
      />
      {[...threeYearDiaries] // スプレッドでコピーしてから
        .sort((a, b) => a.diaryDate.localeCompare(b.diaryDate)) // 昇順にソート（古い→新しい）
        .map(({ diaryDate, diary }) => (
          <YearGroup key={diaryDate} date={diaryDate} diary={diary} />
        ))}
      <DateNavigation
        onPrev={() => handleChangeDate(-1)}
        onNext={() => handleChangeDate(1)}
      />
    </div>
  );
}
