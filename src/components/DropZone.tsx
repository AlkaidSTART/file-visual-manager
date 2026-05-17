import React, { useState, useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import { listen } from "@tauri-apps/api/event";

interface DropZoneProps {
  onFolderDrop: (path: string) => void;
  children: React.ReactNode;
  hasContent?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFolderDrop,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  // Tauri v2 drag-drop 监听
  useEffect(() => {
    const handleDragEnter = () => {
      dragCounter.current++;
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (event: { payload: { paths: string[] } }) => {
      setIsDragging(false);
      dragCounter.current = 0;
      const paths = event.payload?.paths || [];
      if (paths.length > 0) {
        onFolderDrop(paths[0]);
      }
    };

    // 使用 listen API 监听拖拽事件
    const unlistenEnter = listen<{ paths: string[] }>(
      "tauri://drag-enter",
      handleDragEnter,
    );
    const unlistenOver = listen("tauri://drag-over", () => {});
    const unlistenLeave = listen("tauri://drag-leave", handleDragLeave);
    const unlistenDrop = listen<{ paths: string[] }>(
      "tauri://drop",
      handleDrop,
    );

    return () => {
      unlistenEnter.then((fn) => fn());
      unlistenOver.then((fn) => fn());
      unlistenLeave.then((fn) => fn());
      unlistenDrop.then((fn) => fn());
    };
  }, [onFolderDrop]);

  return (
    <div className={`dropzone-container ${isDragging ? "dragging" : ""}`}>
      {isDragging && (
        <div className="dropzone-overlay">
          <div className="dropzone-content">
            <Upload size={48} />
            <h3>拖放文件夹到此</h3>
            <p>释放以扫描该文件夹</p>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
