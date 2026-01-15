import { useEffect, useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let mouseDownPos = { x: 0, y: 0 };
    let hasMoved = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Only left click
      mouseDownPos = { x: e.clientX, y: e.clientY };
      hasMoved = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // If moved > 5px, consider it a drag
      const distance = Math.sqrt(
        Math.pow(e.clientX - mouseDownPos.x, 2) +
        Math.pow(e.clientY - mouseDownPos.y, 2)
      );

      if (distance > 5 && !hasMoved) {
        hasMoved = true;
        getCurrentWindow().startDragging();
      }
    };

    const handleMouseUp = () => {
      hasMoved = false;
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const toggleSidebar = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn kéo thả khi click

    const allWindows = await WebviewWindow.getAll();
    let sidebarWindow = allWindows.find(w => w.label === 'main');

    const shouldOpen = !isSidebarOpen;

    if (sidebarWindow) {
      if (shouldOpen) {
        await sidebarWindow.show();
        await sidebarWindow.setFocus();
      } else {
        await sidebarWindow.hide();
      }
    } else if (shouldOpen) {
      // Tạo mới nếu chưa có (chỉ khi muốn mở)
      sidebarWindow = new WebviewWindow('main', {
        url: '/', // Load React app với Sider UI
        width: 500,
        height: 800,
        resizable: true,
        decorations: false,
        transparent: false,
        shadow: false,
        alwaysOnTop: true,
        skipTaskbar: true,
      });
      await sidebarWindow.show();
    }

    setIsSidebarOpen(shouldOpen); // Cập nhật state để lần sau click đúng
  };

  return (
    <div
      className="container"
      style={{
        width: '100px',
        height: '100px',
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        onClick={toggleSidebar}
        style={{
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            pointerEvents: 'none',
          }}
        >
          <g id="Icons">
            <rect fill="#47a6e3" height="9" rx="2" width="9" x="1" y="1" />
            <rect fill="#f55fa6" height="9" rx="2" width="9" x="14" y="1" />
            <rect fill="#da3380" height="9" rx="2" width="9" x="1" y="14" />
            <rect fill="#0e7cc9" height="9" rx="2" width="9" x="14" y="14" />
            <path fill="#f55fa6" d="M10,16a2.006,2.006,0,0,1-2,2H3a2,2,0,0,1,0-4H8A2.006,2.006,0,0,1,10,16Z" />
            <path fill="#47a6e3" d="M23,16a2.006,2.006,0,0,1-2,2H16a2,2,0,0,1,0-4h5A2.006,2.006,0,0,1,23,16Z" />
          </g>
          <g data-name="Layer 4" id="Layer_4">
            <path fill="#6c2e7c" d="M8,0H3A3,3,0,0,0,0,3V8a3,3,0,0,0,3,3H8a3,3,0,0,0,3-3V3A3,3,0,0,0,8,0ZM9,8A1,1,0,0,1,8,9H3A1,1,0,0,1,2,8V3A1,1,0,0,1,3,2H8A1,1,0,0,1,9,3Z" />
            <path fill="#6c2e7c" d="M21,0H16a3,3,0,0,0-3,3V8a3,3,0,0,0,3,3h5a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0Zm1,8a1,1,0,0,1-1,1H16a1,1,0,0,1-1-1V3a1,1,0,0,1,1-1h5a1,1,0,0,1,1,1Z" />
            <path fill="#6c2e7c" d="M8,13H3a3,3,0,0,0-3,3v5a3,3,0,0,0,3,3H8a3,3,0,0,0,3-3V16A3,3,0,0,0,8,13Zm1,8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V16a1,1,0,0,1,1-1H8a1,1,0,0,1,1,1Z" />
            <path fill="#6c2e7c" d="M21,13H16a3,3,0,0,0-3,3v5a3,3,0,0,0,3,3h5a3,3,0,0,0,3-3V16A3,3,0,0,0,21,13Zm1,8a1,1,0,0,1-1,1H16a1,1,0,0,1-1-1V16a1,1,0,0,1,1-1h5a1,1,0,0,1,1,1Z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;