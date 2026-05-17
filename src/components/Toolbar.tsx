import React from "react";
import { FolderOpen, Search, RotateCcw } from "lucide-react";

interface ToolbarProps {
  onSelectFolder: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  loading: boolean;
  rootPath: string | null;
  onRefresh?: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSelectFolder,
  searchQuery,
  onSearchChange,
  loading,
  rootPath,
  onRefresh,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button
          className="toolbar-btn primary"
          onClick={onSelectFolder}
          disabled={loading}
        >
          <FolderOpen size={16} />
          <span>选择文件夹</span>
        </button>

        {rootPath && (
          <button
            className="toolbar-btn"
            onClick={onRefresh}
            disabled={loading}
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>

      <div className="toolbar-center">
        {rootPath && (
          <div className="toolbar-search">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="搜索文件或文件夹..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      <div className="toolbar-right" />
    </div>
  );
};
