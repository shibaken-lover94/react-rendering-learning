import { useState, useCallback, useMemo } from "react";
import "./styles.css";
import { ChildArea } from "./ChildArea";

export default function App() {
  console.log("App");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (e) => setText(e.target.value);

  const onClickOpen = () => setOpen(!open);

  // アロー関数で書くと「毎回新しい関数を生成している」と判断されてしまう！！
  // onChangeTextが走る → 上から見ていく → onClickOpenが再生成される
  // propsとしては毎回違う関数、と判断してしまう → propsが変わっている → ChildArea更新
  // メモ化した子コンポーネントに関数を渡していく場合は、関数のメモ化（useCallback）が必要！
  const onClickClose = useCallback(() => setOpen(false), [setOpen]);

  const temp = useMemo(() => 1 + 3, []);
  console.log(temp);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  );
}
