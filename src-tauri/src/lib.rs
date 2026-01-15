// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use tauri_plugin_global_shortcut::GlobalShortcutExt;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {
            // Register global shortcut Alt+K to toggle sidebar
            let app_handle = app.handle().clone();

            app.global_shortcut()
                .on_shortcut("Alt+X", move |_app, _shortcut, event| {
                    // Only handle KeyDown event, not KeyUp or repeat
                    if !matches!(
                        event.state,
                        tauri_plugin_global_shortcut::ShortcutState::Pressed
                    ) {
                        return;
                    }

                    let handle = app_handle.clone();

                    // Try to get sidebar window
                    if let Some(sidebar) = handle.get_webview_window("main") {
                        // Toggle visibility
                        if sidebar.is_visible().unwrap_or(false) {
                            let _ = sidebar.hide();
                        } else {
                            let _ = sidebar.show();
                            let _ = sidebar.set_focus();
                        }
                    }
                })?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
