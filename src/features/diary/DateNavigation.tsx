// src/features/diary/DateNavigation.tsx
import Button from "../../components/ui/Button";
import { useAppDispatch } from "../../redux/hooks";
import { incrementDate, decrementDate, setSelectedDate } from "../../redux/slices/selectedDateSlice";
import { toIsoString } from "../../utils/dateUtils";

export default function DateNavigation() {
  const dispatch = useAppDispatch();

  const handleToday = () => {
    const today = toIsoString(new Date());
    dispatch(setSelectedDate(today));
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
      <Button onClick={() => dispatch(decrementDate())}>← 前日へ</Button>
      <Button onClick={handleToday}>今日</Button>
      <Button onClick={() => dispatch(incrementDate())}>翌日へ →</Button>
    </div>
  );
}
