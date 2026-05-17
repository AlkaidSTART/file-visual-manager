import React, { useMemo } from "react";
import { FileNodeData, FileCategory } from "../types";
import { CATEGORY_COLORS, formatSize } from "../utils/fileClassifier";
import { flattenTree } from "../utils/treeBuilder";
import {
  FileText,
  Image,
  Music,
  Video,
  Archive,
  Code,
  Settings,
  Database,
  Terminal,
  Type,
  Palette,
  File,
  FolderOpen,
  SearchX,
  FileX,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  document: FileText,
  image: Image,
  audio: Music,
  video: Video,
  archive: Archive,
  code: Code,
  config: Settings,
  data: Database,
  executable: Terminal,
  font: Type,
  design: Palette,
  other: File,
};

interface FileGridProps {
  tree: FileNodeData | null;
  searchQuery: string;
  loading: boolean;
}

export const FileGrid: React.FC<FileGridProps> = ({
  tree,
  searchQuery,
  loading,
}) => {
  const groupedFiles = useMemo(() => {
    if (!tree) return null;
    const allFiles = flattenTree(tree).filter((n) => !n.isDirectory);
    const groups: Record<string, FileNodeData[]> = {};
    for (const file of allFiles) {
      if (!groups[file.category]) groups[file.category] = [];
      groups[file.category].push(file);
    }
    return groups;
  }, [tree]);

  const highlightName = (name: string) => {
    if (!searchQuery) return name;
    const idx = name.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (idx === -1) return name;
    return (
      <>
        {name.slice(0, idx)}
        <span className="search-highlight">
          {name.slice(idx, idx + searchQuery.length)}
        </span>
        {name.slice(idx + searchQuery.length)}
      </>
    );
  };

  if (loading) {
    return (
      <div className="file-grid-empty">
        <div className="loading-spinner" />
        <p>正在扫描文件夹...</p>
      </div>
    );
  }

  if (!tree) {
    return (
      <div className="file-grid-empty">
        <FolderOpen size={48} className="empty-icon" />
        <h3>还未选择文件夹</h3>
        <p>点击上方「选择文件夹」按钮，或拖拽文件夹到此处</p>
      </div>
    );
  }

  if (
    !groupedFiles ||
    Object.values(groupedFiles).every((g) => g.length === 0)
  ) {
    if (searchQuery) {
      return (
        <div className="file-grid-empty">
          <SearchX size={48} className="empty-icon" />
          <h3>未找到匹配结果</h3>
          <p>没有包含「{searchQuery}」的文件或文件夹</p>
        </div>
      );
    }
    return (
      <div className="file-grid-empty">
        <FileX size={48} className="empty-icon" />
        <h3>此文件夹为空</h3>
        <p>该文件夹中没有文件</p>
      </div>
    );
  }

  const categoryOrder: FileCategory[] = [
    "document",
    "image",
    "audio",
    "video",
    "archive",
    "code",
    "config",
    "data",
    "executable",
    "font",
    "design",
    "other",
  ];

  return (
    <div className="file-grid">
      <div className="category-block-grid">
        {categoryOrder.map((category) => {
          const files = groupedFiles[category];
          if (!files || files.length === 0) return null;

          const colors = CATEGORY_COLORS[category];
          const Icon = categoryIcons[category] || File;
          const totalSize = formatSize(files.reduce((s, f) => s + f.size, 0));

          return (
            <section key={category} className="category-section">
              <div className="category-header">
                <div className="category-header-left">
                  <div
                    className="category-header-icon"
                    style={{ color: colors.iconColor }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="category-header-text">
                    <span className="category-title">{colors.label}</span>
                    <span className="category-total-size">{totalSize}</span>
                  </div>
                </div>
                <span className="category-count">{files.length}</span>
              </div>
              <div className="category-grid">
                {files
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((file, idx) => {
                    const FileIcon = categoryIcons[file.category] || File;
                    return (
                      <div key={`${file.path}-${idx}`} className="file-card">
                        <div
                          className="file-card-icon-box"
                          style={{ color: colors.iconColor }}
                        >
                          <FileIcon size={14} />
                        </div>
                        <div className="file-card-info">
                          <span className="file-card-name" title={file.name}>
                            {highlightName(file.name)}
                          </span>
                          <div className="file-card-meta">
                            {file.extension && (
                              <span className="file-card-ext">
                                .{file.extension}
                              </span>
                            )}
                            <span className="file-card-size">
                              {formatSize(file.size)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
