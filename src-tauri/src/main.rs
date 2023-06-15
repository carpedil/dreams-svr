// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// #[macro_use]
// extern crate objc;

// mod db;

// use tauri::Manager;

fn main() {
    tauri::Builder::default()
        // .setup(|app| {

        //     let window = tauri::Manager::get_window(app, "main").unwrap();
        //     window
        //         .set_size(tauri::Size::Physical(tauri::PhysicalSize { width: 1920, height: 1080 }))
        //         .unwrap();
        //     println!("scale:{:?}",window.scale_factor());
        //     let main_window = app.get_window("main").unwrap();
        //     let _ = main_window.with_webview(|webview| {
        //         #[cfg(target_os = "linux")]
        //         {
        //             use webkit2gtk::traits::WebViewExt;
        //             webview.inner().set_zoom_level(4.);
        //         }
        //         #[cfg(windows)]
        //         unsafe {
        //             webview.controller().SetZoomFactor(4.).unwrap();
        //         }
        //         #[cfg(target_os = "macos")]
        //         unsafe {
        //             let () = msg_send![webview.inner(), setPageZoom: 1.];
        //         }
        //     });
        //     println!("scale:{:?}",window.scale_factor());

        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
