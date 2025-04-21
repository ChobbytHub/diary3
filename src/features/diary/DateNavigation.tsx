import Button from "../../components/ui/Button";

interface DateNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function DateNavigation({ onPrev, onNext }: DateNavigationProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
      <Button onClick={onPrev}>← 前日へ</Button>
      <Button onClick={onNext}>翌日へ →</Button>
    </div>
  );
}
