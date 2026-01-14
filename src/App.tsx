import { useEffect } from 'react';
import { getCurrentWindow } from "@tauri-apps/api/window";
import './App.css';
const appWindow = getCurrentWindow();
function App() {
  useEffect(() => {
    // Kéo thả bằng chuột trái bất kỳ đâu trên nút
    const handleMouseDown = async (e: MouseEvent) => {
      if (e.button === 0) { // Chuột trái
        await getCurrentWindow().startDragging();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'grab',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      onMouseDown={async (e) => e.button === 0 && await appWindow.startDragging()}
      onClick={() => console.log("click")}
    >
      <span
        style={{
          color: 'black',
          fontSize: '25px',
          fontWeight: 'bold',
          pointerEvents: 'none',
          lineHeight: 1,
          display: 'block',
        }}
      >
        D
      </span>
    </div>
  );
}

export default App;