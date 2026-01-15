import { getCurrentWindow } from "@tauri-apps/api/window";
import './SideBar.css';

const SideBar = () => {
    const appWindow = getCurrentWindow();

    const handleClose = async () => {
        await appWindow.hide();
    };

    return (
        <div className="sidebar-container">
            {/* Header - Draggable */}
            <div
                className="sidebar-header"
                data-tauri-drag-region
                onMouseDown={(e) => e.button === 0 && appWindow.startDragging()}
            >
                <div className="header-logo">
                    <span className="header-title">OmniSide</span>
                </div>

                <div className="header-controls">
                    <button className="header-button close" onClick={handleClose}>
                        ×
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="sidebar-main">
                {/* Content Area */}
                <div className="content-area">
                </div>

                {/* Right Sidebar */}
                <div className="right-sidebar">
                    {['💬', '🌐', '📖', '➕'].map((icon, idx) => (
                        <button key={idx} className="sidebar-icon-button">
                            {icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
